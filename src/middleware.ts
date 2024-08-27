// https://authjs.dev/guides/edge-compatibility
import NextAuth from "next-auth";
import authConfig from "./auth.config";

// export const { auth: middleware } = NextAuth(authConfig);

// https://authjs.dev/getting-started/session-management/protecting?framework=express#api-routes
// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/login") {
//     const newUrl = new URL("/login", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });

// Forces non autenticated users back to home page
// https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
