#!/usr/bin/env node
/** 构建前写入 IndexNow 验证 txt（内容仅一行密钥） */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const key = process.env.INDEXNOW_KEY;

if (!key) {
  const requireKey =
    process.env.CI === "true" ||
    process.env.GITHUB_ACTIONS === "true" ||
    process.env.REQUIRE_INDEXNOW_KEY === "1";
  if (requireKey) {
    console.error(
      "构建失败：未设置 INDEXNOW_KEY。\n" +
        "GitHub Actions / Cloudflare Pages 请在环境变量中配置 INDEXNOW_KEY（32位字母数字）。"
    );
    process.exit(1);
  }
  console.log("未设置 INDEXNOW_KEY，跳过验证文件生成");
  process.exit(0);
}

if (!/^[a-zA-Z0-9]{8,128}$/.test(key)) {
  console.error("INDEXNOW_KEY 格式无效，应为 8-128 位字母数字");
  process.exit(1);
}

const srcFile = path.join(root, "src", `${key}.txt`);
fs.writeFileSync(srcFile, key, "utf8");
console.log(`已写入验证文件: src/${key}.txt`);
