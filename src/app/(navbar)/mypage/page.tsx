export default function MyPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">마이 페이지</h1>
        <p className="text-gray-500 mt-2">이 부분 코드 잘 작성해주세요~</p>
      </header>
      <main>
        <p className="text-gray-700">내 정보</p>
        <p className="text-gray-700">내 게임 기록</p>
        <p className="text-gray-700">설정</p>
      </main>
    </div>
  );
}
