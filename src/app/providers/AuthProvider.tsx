// app/providers/AuthProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // 인증되지 않은 사용자가 로그인 페이지 외 다른 경로 접근 시 강제 리다이렉트
      if (pathname !== "/") {
        clearUser();
        router.replace("/");
      }
    } else {
      // 인증된 사용자가 로그인 페이지 접근 시 메인 페이지로 리다이렉트
      if (pathname === "/") {
        router.replace("/main");
      }
    }
  }, [pathname, setUser, clearUser, router]);

  return <>{children}</>;
}
