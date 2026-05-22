import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Pegamos o token do cookie
  const token = request.cookies.get("token")?.value;

  // 2. Definimos quais rotas queremos proteger
  const isProtectedPage = 
    request.nextUrl.pathname.startsWith("/produtos") || 
    request.nextUrl.pathname.startsWith("/change-password");

  // 3. Se o usuário tentar acessar uma página protegida sem token, mandamos para o login
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // 4. Se o usuário estiver logado e tentar ir para o login ou cadastro, mandamos para os produtos
  const isAuthPage = 
    request.nextUrl.pathname === "/sign-in" || 
    request.nextUrl.pathname === "/sign-up";

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/produtos", request.url));
  }

  return NextResponse.next();
}

// 5. Configuramos em quais caminhos o Middleware deve rodar
export const config = {
  matcher: ["/produtos/:path*", "/change-password/:path*", "/sign-in", "/sign-up"],
};
