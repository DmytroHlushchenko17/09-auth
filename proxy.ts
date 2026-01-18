import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/notes", "/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((path) =>
    pathname.startsWith(path)
  );
  const isPublicRoute = publicRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }
  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (refreshToken) {
      try {
        const res = await checkSession();

        const setCookies = res.headers["set-cookie"];

        const response = NextResponse.next();
        if (setCookies) {
          const cookieArr = Array.isArray(setCookies) ? setCookies : [setCookies];

          for (const cookie of cookieArr) {
            response.headers.append("Set-Cookie", cookie);
          }
        }
        return response;
      } catch (err) {
        console.error(`Error refreshing token: ${err}`);
      }
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/notes", "/profile", "/sign-in", "/sign-up"],
};
