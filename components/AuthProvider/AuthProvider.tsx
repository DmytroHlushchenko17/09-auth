"use client";
import { checkSession, getMe } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUserInfo = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthorized = await checkSession();
      if (isAuthorized) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearUserInfo();
      }
    };

    fetchUser();
  });

  return children;
};

export default AuthProvider;
