// app/providers/AuthProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      // 토큰 없으면 스토어 비우고 로그인 페이지로
      clearUser();
      router.replace("/");
    } else {
      // 토큰 있으면 메인으로
      router.replace("/main");
    }
  }, [setUser, clearUser, router]);

  return <>{children}</>;
}
