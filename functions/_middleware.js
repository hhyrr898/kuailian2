/**
 * Cloudflare Pages：优先返回 IndexNow 验证 txt
 * 即使静态构建未带上 {KEY}.txt，只要环境变量 INDEXNOW_KEY 已配置即可通过验证。
 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const key = String(env.INDEXNOW_KEY || "").trim();
  if (!key) return next();

  const pathname = new URL(request.url).pathname;
  if (pathname === `/${key}.txt` || pathname === `/${key}.txt/`) {
    return new Response(key, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "X-Robots-Tag": "noindex"
      }
    });
  }

  return next();
}
