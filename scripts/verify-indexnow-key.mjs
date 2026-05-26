#!/usr/bin/env node
/**
 * 校验 IndexNow 验证文件（本地 _site + 可选线上）
 *
 * 环境变量:
 *   INDEXNOW_KEY     必填（校验时）
 *   SITE_DOMAIN      线上校验时需要
 *   INDEXNOW_HOST    可选，覆盖 host
 *   CHECK_ONLINE=1   同时请求线上 URL
 *   SKIP_ONLINE=1    仅校验本地（默认 CI 构建步骤）
 */
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "_site");

const KEY = (process.env.INDEXNOW_KEY || "").trim();
const CHECK_ONLINE =
  process.env.CHECK_ONLINE === "1" || process.argv.includes("--online");
const SKIP_ONLINE = process.env.SKIP_ONLINE === "1";

function siteHost() {
  const override = (process.env.INDEXNOW_HOST || "").trim();
  if (override) return override.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const domain = (process.env.SITE_DOMAIN || "").trim();
  return domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function validateKeyContent(body, expectedKey) {
  const text = String(body).trim();
  if (text.length !== expectedKey.length) {
    return {
      ok: false,
      reason: `长度不符：得到 ${text.length}，期望 ${expectedKey.length}`
    };
  }
  if (text !== expectedKey) {
    return { ok: false, reason: "内容与 INDEXNOW_KEY 不一致" };
  }
  if (/^<!DOCTYPE|<html/i.test(text)) {
    return {
      ok: false,
      reason: "内容是 HTML 页面（常见原因：Cloudflare Pages 未配置 INDEXNOW_KEY 或 SPA 回退到首页）"
    };
  }
  if (!/^[a-zA-Z0-9]+$/.test(text)) {
    return { ok: false, reason: "密钥应仅含字母数字" };
  }
  return { ok: true };
}

function checkLocal() {
  if (!KEY) {
    console.error("未设置 INDEXNOW_KEY，无法校验验证文件");
    process.exit(1);
  }

  const file = path.join(OUT, `${KEY}.txt`);
  if (!fs.existsSync(file)) {
    console.error(`本地缺少验证文件: _site/${KEY}.txt`);
    console.error("请确认构建时设置了 INDEXNOW_KEY，且 npm run build 已执行 write-indexnow-key + eleventy.after");
    process.exit(1);
  }

  const body = fs.readFileSync(file, "utf8");
  const result = validateKeyContent(body, KEY);
  if (!result.ok) {
    console.error(`本地验证文件无效: ${result.reason}`);
    process.exit(1);
  }

  console.log(`本地验证通过: _site/${KEY}.txt (${body.length} 字符)`);
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ code: res.statusCode, data }));
      })
      .on("error", reject);
  });
}

async function checkOnline() {
  const host = siteHost();
  if (!host) {
    console.error("线上校验需要 SITE_DOMAIN 或 INDEXNOW_HOST");
    process.exit(1);
  }

  const url = `https://${host}/${KEY}.txt`;
  console.log(`线上校验: ${url}`);

  const { code, data } = await fetchUrl(url);
  if (code !== 200) {
    console.error(`线上验证文件 HTTP ${code}，请检查 Cloudflare Pages 是否已部署最新构建`);
    process.exit(1);
  }

  const result = validateKeyContent(data, KEY);
  if (!result.ok) {
    console.error(`线上验证文件无效: ${result.reason}`);
    console.error(`
请在 Cloudflare Pages → Settings → Environment variables（Production）添加：
  INDEXNOW_KEY = 你的32位密钥
  SITE_DOMAIN  = 你的域名（无 https）
然后 Retry deployment 重新部署。
`);
    process.exit(1);
  }

  console.log(`线上验证通过: ${url}`);
}

async function main() {
  checkLocal();

  if (CHECK_ONLINE && !SKIP_ONLINE) {
    await checkOnline();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
