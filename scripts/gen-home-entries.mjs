import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../src/_data/homeEntries.json");

const posts = [
  ["Windows 版快连下载安装全流程", "从获取安装包到首次启动的完整说明", "/posts/windows-kuailian-download/", "使用教程", "快连下载 Windows"],
  ["macOS 版快连下载与权限配置", "Apple 芯片与 Intel 机型通用指引", "/posts/macos-kuailian-download/", "使用教程", "快连下载 macOS"],
  ["Android 版快连下载与安装", "移动端获取与存储权限说明", "/posts/android-kuailian-download/", "使用教程", "快连下载 Android"],
  ["iOS 版快连下载与描述文件", "iPhone 与 iPad 端配置要点", "/posts/ios-kuailian-download/", "使用教程", "快连下载 iOS"],
  ["快连下载后首次连接检查清单", "网络、账号与节点三步自检", "/posts/first-connect-checklist/", "使用教程", "快连下载 连接"],
  ["快连下载常见报错代码说明", "无法启动、超时、认证失败处理", "/posts/error-codes-guide/", "常见问题", "快连下载 报错"],
  ["家庭宽带下的快连下载体验", "路由器与 DNS 设置建议", "/posts/home-network-tips/", "资源百科", "快连下载 家庭网络"],
  ["办公网络快连下载部署建议", "公司防火墙与白名单说明", "/posts/office-network-deploy/", "资源百科", "快连下载 办公"],
  ["快连下载后多设备同时在线", "账号与终端数量管理说明", "/posts/multi-device-login/", "使用教程", "快连下载 多设备"],
  ["快连下载流量与电量消耗", "移动端后台运行设置", "/posts/battery-data-usage/", "资源百科", "快连下载 电量"],
  ["快连下载无法打开解决方案", "权限、杀软与缓存清理", "/posts/cannot-open-fix/", "常见问题", "快连下载 无法打开"],
  ["快连下载更新后配置迁移", "升级保留节点与规则", "/posts/upgrade-migration/", "版本动态", "快连下载 更新"],
  ["平板设备快连下载横屏体验", "Android 平板与 iPad 适配", "/posts/tablet-experience/", "使用教程", "快连下载 平板"],
  ["快连下载节点选择入门", "延迟、丢包与稳定性判断", "/posts/node-selection/", "使用教程", "快连下载 节点"],
  ["快连下载日志导出与分析", "故障反馈所需信息准备", "/posts/log-export/", "常见问题", "快连下载 日志"],
  ["快连下载隐私与本地数据", "缓存目录与退出清理", "/posts/privacy-local-data/", "资源百科", "快连下载 隐私"],
  ["游戏场景快连下载延迟", "UDP 与线路选择建议", "/posts/gaming-latency/", "资源百科", "快连下载 游戏"],
  ["视频流媒体快连下载体验", "带宽波动与清晰度", "/posts/streaming-tips/", "资源百科", "快连下载 视频"],
  ["快连下载卸载与残留清理", "Windows 与 macOS 完整卸载", "/posts/uninstall-clean/", "常见问题", "快连下载 卸载"],
  ["快连下载账号安全建议", "密码、二次验证与设备管理", "/posts/account-security/", "常见问题", "快连下载 账号"],
  ["快连下载夜间自动重连", "休眠唤醒后的连接恢复", "/posts/auto-reconnect/", "使用教程", "快连下载 重连"],
  ["快连下载分应用规则简介", "按需分流的基础概念", "/posts/split-rules-intro/", "资源百科", "快连下载 分流"],
  ["快连下载企业批量部署思路", "IT 管理员分发与策略", "/posts/enterprise-deploy/", "资源百科", "快连下载 企业"]
];

const anchors = [
  ["快连官方版本号如何查看", "各平台版本信息入口汇总", "#section-version", "版本动态", "快连下载 版本"],
  ["快连下载与系统兼容性列表", "Windows 10/11 与 macOS 版本对照", "#section-compat", "版本动态", "快连下载 兼容"],
  ["快连下载安装包完整性校验", "文件大小与签名核对方法", "#section-verify", "使用教程", "快连下载 校验"],
  ["快连下载典型使用场景", "办公、家庭与出行连接说明", "#section-scenarios", "资源百科", "快连下载 场景"],
  ["快连下载常见问题速览", "安装与连接类问题索引", "#section-faq", "常见问题", "快连下载 问答"],
  ["快连官方 Windows 下载入口", "桌面端 64 位安装包", "/download.html#windows", "官方", "快连官方 Windows"],
  ["快连官方 macOS 下载入口", "arm64 与 Intel 安装包", "/download.html#macos", "官方", "快连官方 macOS"],
  ["快连官方 Android 下载入口", "手机平板通用包", "/download.html#android", "官方", "快连官方 Android"],
  ["快连官方 iOS 下载入口", "iPhone 与 iPad", "/download.html#ios", "官方", "快连官方 iOS"]
];

const cats = [
  ["使用教程目录", "Windows macOS 安卓苹果安装与配置", "/categories/guide/", "目录", "快连下载 教程"],
  ["版本动态目录", "更新日志与迁移说明", "/categories/release/", "目录", "快连下载 版本"],
  ["常见问题目录", "报错排错与账号安全", "/categories/faq/", "目录", "快连下载 问题"],
  ["资源百科目录", "网络场景与进阶技巧", "/categories/resource/", "目录", "快连下载 百科"]
];

const tags = [
  ["Windows 标签文章", "电脑版安装与排错", "/tags/windows/", "标签", "快连下载 Windows"],
  ["macOS 标签文章", "苹果电脑配置", "/tags/macos/", "标签", "快连下载 macOS"],
  ["Android 标签文章", "安卓端教程", "/tags/android/", "标签", "快连下载 Android"],
  ["iOS 标签文章", "苹果移动端教程", "/tags/ios/", "标签", "快连下载 iOS"],
  ["安装教程标签", "分步安装指引合集", "/tags/安装教程/", "标签", "快连下载 安装"],
  ["连接标签", "首次连接与节点", "/tags/连接/", "标签", "快连下载 连接"],
  ["排错标签", "故障诊断文章", "/tags/排错/", "标签", "快连下载 排错"],
  ["快连下载标签", "核心主题文章聚合", "/tags/快连下载/", "标签", "快连下载"]
];

const extras = [
  ["快连下载教程大全", "全平台文章列表", "/blog/", "教程", "快连下载 博客"],
  ["快连官方下载中心", "四宫格平台下载页", "/download.html", "官方", "快连官方 下载中心"],
  ["快连下载首页各平台区块", "站内锚点直达", "#section-download", "导航", "快连下载 平台"],
  ["快连下载精选内容库", "五十余篇索引卡片", "#section-resources", "导航", "快连下载 内容"],
  ["快连官方客户端总览", "品牌介绍与获取指引", "/", "官方", "快连官方"],
  ["Win10 环境快连下载注意", "系统位数与权限", "/posts/windows-kuailian-download/", "使用教程", "快连下载 Win10"],
  ["Win11 环境快连下载注意", "新系统兼容说明", "/posts/windows-kuailian-download/", "使用教程", "快连下载 Win11"],
  ["M 系列 Mac 快连下载", "Apple 芯片安装要点", "/posts/macos-kuailian-download/", "使用教程", "快连下载 M芯片"],
  ["Intel Mac 快连下载", "x64 包选择说明", "/posts/macos-kuailian-download/", "使用教程", "快连下载 Intel"],
  ["安卓 12 快连下载", "新版本权限模型", "/posts/android-kuailian-download/", "使用教程", "快连下载 安卓12"],
  ["iPad 快连下载配置", "平板横屏与分屏", "/posts/tablet-experience/", "使用教程", "快连下载 iPad"],
  ["路由器下快连下载", "家庭网关设置", "/posts/home-network-tips/", "资源百科", "快连下载 路由器"],
  ["公司网络快连下载", "防火墙放行建议", "/posts/office-network-deploy/", "资源百科", "快连下载 公司网"],
  ["快连下载节点延迟对比", "选线实用技巧", "/posts/node-selection/", "使用教程", "快连下载 延迟"],
  ["快连下载游戏加速", "UDP 场景建议", "/posts/gaming-latency/", "资源百科", "快连下载 游戏加速"],
  ["快连下载看视频卡顿", "带宽与节点", "/posts/streaming-tips/", "资源百科", "快连下载 流媒体"],
  ["快连下载后台耗电", "安卓 iOS 设置", "/posts/battery-data-usage/", "资源百科", "快连下载 省电"],
  ["快连下载升级保留配置", "迁移不丢规则", "/posts/upgrade-migration/", "版本动态", "快连下载 升级"],
  ["快连下载彻底卸载", "无残留清理", "/posts/uninstall-clean/", "常见问题", "快连下载 清理"],
  ["快连下载账号被盗排查", "安全加固步骤", "/posts/account-security/", "常见问题", "快连下载 安全"],
  ["快连下载睡眠后断线", "自动重连设置", "/posts/auto-reconnect/", "使用教程", "快连下载 休眠"],
  ["快连下载分流规则入门", "应用级路由", "/posts/split-rules-intro/", "资源百科", "快连下载 规则"],
  ["快连下载企业 IT 部署", "批量安装思路", "/posts/enterprise-deploy/", "资源百科", "快连下载 批量"],
  ["快连下载日志怎么导出", "反馈必备信息", "/posts/log-export/", "常见问题", "快连下载 日志导出"],
  ["快连下载隐私数据目录", "本地缓存说明", "/posts/privacy-local-data/", "资源百科", "快连下载 数据"],
  ["快连下载打不开怎么办", "权限与杀软", "/posts/cannot-open-fix/", "常见问题", "快连下载 修复"],
  ["快连下载错误码对照", "常见代码含义", "/posts/error-codes-guide/", "常见问题", "快连下载 错误码"],
  ["快连下载首次连接清单", "三步自检流程", "/posts/first-connect-checklist/", "使用教程", "快连下载 自检"]
];

const all = [...posts, ...anchors, ...cats, ...tags, ...extras];
const items = all.map(([title, desc, href, tag, img]) => ({ title, desc, href, tag, img }));
fs.writeFileSync(out, JSON.stringify(items, null, 2), "utf8");
console.log("homeEntries:", items.length);
