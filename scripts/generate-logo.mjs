#!/usr/bin/env node
/** 生成站点 Logo（蓝紫渐变 + 连接节点图形，与旧版琥珀 Logo 区分） */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../src/images/logo.png");

const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a"/>
      <stop offset="50%" style="stop-color:#4f46e5"/>
      <stop offset="100%" style="stop-color:#06b6d4"/>
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#a5f3fc"/>
      <stop offset="100%" style="stop-color:#e0e7ff"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <circle cx="256" cy="256" r="148" fill="none" stroke="url(#ring)" stroke-width="14" opacity="0.9"/>
  <circle cx="256" cy="120" r="36" fill="#fff" opacity="0.95"/>
  <circle cx="140" cy="300" r="32" fill="#fff" opacity="0.88"/>
  <circle cx="372" cy="300" r="32" fill="#fff" opacity="0.88"/>
  <path d="M256 156 L140 300 M256 156 L372 300 M140 300 L372 300" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.75"/>
  <text x="256" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="72" fill="#fff" opacity="0.95">连</text>
</svg>`;

async function main() {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("已生成", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
