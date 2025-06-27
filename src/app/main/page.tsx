import Link from "next/link";

export default function MainPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">🍏사과사과🍎</h1>
      </header>
      <main>
        <Link href="/apple-game">
          <button className="w-full p-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            게임 시작하기
          </button>
        </Link>
        <Link href="/ranking">
          <button className="w-full p-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            순위보기
          </button>
        </Link>
        <Link href="/room">
          <button className="w-full p-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
            내기
          </button>
        </Link>
      </main>
    </div>
  );
}
