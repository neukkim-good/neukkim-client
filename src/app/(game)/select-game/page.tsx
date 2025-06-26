"use client";
import Link from "next/link";

export default function RankingPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">게임 선택</h1>
        <p className="text-gray-500 mt-2">이 부분 코드 잘 작성해주세요~</p>
      </header>
      <main>
        <Link
          href="/apple-game"
          className="block mb-4 text-blue-600 hover:underline"
        >
          개인 플레이
        </Link>
        <button
          className="block mb-4 text-blue-600 hover:underline"
          onClick={() => alert("준비 중입니다!")}
        >
          1:1 플레이
        </button>
      </main>
    </div>
  );
}
