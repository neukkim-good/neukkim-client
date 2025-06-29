import Link from "next/link";

export default function MainPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">🍏사과사과🍎</h1>
      </header>
      <main>
        {/* bg-green-600 hover:bg-red-500 */}
        {/* flex justify-between items-center border-gray-200 pb-3 */}
        <div className="rounded-xl p-6 m-3 flex justify-between ">
          <Link href="/apple-game">
            <div className="w-400 p-14 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:shadow-md border-black transition  ">
              게임 시작하기
            </div>
          </Link>
          <Link href="/ranking">
            <button className="w-400 p-14 m-4 bg-green-600 text-white font-semibold rounded-md hover:bg-red-500 transition">
              순위보기
            </button>
          </Link>
          <Link href="/room">
            <button className="w-400 p-14 m-4 bg-green-600 text-white font-semibold rounded-md hover:bg-red-500 transition">
              내기
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
