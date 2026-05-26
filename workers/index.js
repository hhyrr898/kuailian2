export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const indexNowKey = String(env.INDEXNOW_KEY || "").trim();

    if (
      indexNowKey &&
      (url.pathname === `/${indexNowKey}.txt` ||
        url.pathname === `/${indexNowKey}.txt/`)
    ) {
      return new Response(indexNowKey, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=300"
        }
      });
    }

    if (url.pathname === "/api/health") {
      return Response.json({ ok: true, service: "kuailian-worker" });
    }

    if (url.pathname.startsWith("/api/redirect/download")) {
      const platform = url.searchParams.get("p") || "windows";
      const map = {
        windows: "/download.html#windows",
        macos: "/download.html#macos",
        android: "/download.html#android",
        ios: "/download.html#ios"
      };
      const target = map[platform] || "/download.html";
      return Response.redirect(new URL(target, url.origin), 302);
    }

    return new Response("Worker OK", { status: 200 });
  }
};
