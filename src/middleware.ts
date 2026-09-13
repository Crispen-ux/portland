import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/academics",
  "/admissions",
  "/contact",
  "/photos",
  "/school-fees",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/api/admissions",
];

const ADMIN_ROUTES = ["/admin"];
const TEACHER_ROUTES = ["/teacher"];
const PARENT_ROUTES = ["/parent"];
const STUDENT_ROUTES = ["/student"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // Allow static files and API auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check authentication
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https"),
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string;

  // Role-based route protection
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (TEACHER_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!["SUPER_ADMIN", "SCHOOL_ADMIN", "PRINCIPAL", "TEACHER"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (PARENT_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!["SUPER_ADMIN", "SCHOOL_ADMIN", "PARENT"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (STUDENT_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!["SUPER_ADMIN", "SCHOOL_ADMIN", "STUDENT"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|logo white.png|robots.txt|sitemap.xml).*)",
  ],
};
