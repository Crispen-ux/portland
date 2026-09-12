import { createNeonAuth } from "@neondatabase/auth/next/server";

let _neonAuth: ReturnType<typeof createNeonAuth> | null = null;
let _initFailed = false;

export function getNeonAuth() {
  if (_initFailed) return null;
  if (_neonAuth) return _neonAuth;

  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  if (!baseUrl || !baseUrl.startsWith("http")) {
    console.warn("NEON_AUTH_BASE_URL not configured — social login disabled");
    _initFailed = true;
    return null;
  }

  try {
    _neonAuth = createNeonAuth({
      baseUrl,
      cookies: {
        secret: process.env.NEON_AUTH_COOKIE_SECRET || "fallback-secret-change-in-production",
      },
    });
    return _neonAuth;
  } catch (e: any) {
    console.warn("Neon Auth init failed:", e.message);
    _initFailed = true;
    return null;
  }
}
