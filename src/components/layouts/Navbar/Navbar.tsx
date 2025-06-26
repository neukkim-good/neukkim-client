"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-white shadow">
      <Link href="/" className="text-xl font-bold text-black">
        로고 자리
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/notice" title="공지사항">
          <Bell className="w-6 h-6 text-gray-700 hover:text-black transition" />
        </Link>
        <Link href="/mypage" title="마이페이지">
          <User className="w-6 h-6 text-gray-700 hover:text-black transition" />
        </Link>
      </div>
    </nav>
  );
}
