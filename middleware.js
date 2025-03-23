// middleware.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isDeveloper, isPremium, isUsuario } from "@/app/utils/role.utils";

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = cookies().get(process.env.COOKIE_NAME)?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // Ejemplo: solo los developers pueden entrar a /admin/*
  if (pathname.startsWith("/admin")) {
    const allowed = await isDeveloper(token);
    if (!allowed) {
      return NextResponse.redirect(new URL("/no-autorizado", request.url));
    }
  }

  return NextResponse.next();
}

// Indicar en qué rutas se ejecuta este middleware
export const config = {
  matcher: ["/admin/:path*"], // puedes agregar más rutas protegidas aquí
};