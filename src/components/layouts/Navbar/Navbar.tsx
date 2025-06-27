"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-white shadow">
      <Link
        href="/"
        className="text-xl font-bold text-black flex items-center gap-3"
      >
        <Image src="/logo_3.png" alt="사과 게임 로고" width={40} height={40} />
        <div>사과게임</div>
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
