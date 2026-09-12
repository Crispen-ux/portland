import { createNeonAuth } from "@neondatabase/auth/next/server";

let _neonAuth: ReturnType<typeof createNeonAuth> | null = null;

export function getNeonAuth() {
  if (!_neonAuth) {
    _neonAuth = createNeonAuth({
      baseUrl: process.env.NEON_AUTH_BASE_URL!,
      cookies: {
        secret: process.env.NEON_AUTH_COOKIE_SECRET || "fallback-secret-change-in-production",
      },
    });
  }
  return _neonAuth;
}
