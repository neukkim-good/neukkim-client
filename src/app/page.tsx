// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
//       <header className="text-center">
//         <h1 className="text-4xl font-bold text-gray-800">
//           {isLogin ? "로그인 화면" : "회원가입 화면"}
//         </h1>
//         <p className="text-gray-500 mt-2">
//           {isLogin
//             ? "이 부분 코드 잘 작성해주세요~"
//             : "회원가입 코드 작성해주세요~"}
//         </p>
//       </header>

//       <main className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
//         <form className="flex flex-col gap-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               이메일
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="example@email.com"
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               비밀번호
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="비밀번호를 입력하세요"
//               className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {!isLogin && (
//             <div>
//               <label
//                 htmlFor="confirm-password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 비밀번호 확인
//               </label>
//               <input
//                 type="password"
//                 id="confirm-password"
//                 placeholder="비밀번호를 다시 입력하세요"
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
//           >
//             {isLogin ? "로그인" : "회원가입"}
//           </button>

//           <div className="text-sm text-center text-gray-600 mt-4">
//             {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
//             <button
//               type="button"
//               className="text-blue-500 hover:underline"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? "회원가입 하기" : "로그인 하기"}
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }
// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../components/splash//SplashScreen"; // 1. SplashScreen 컴포넌트 임포트

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true); // 2. 로딩 상태 추가

  useEffect(() => {
    // 3. 2초 후에 로딩 상태를 false로 변경
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000ms = 2초

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  // 4. 로딩 상태가 true이면 SplashScreen을 보여줍니다.
  if (loading) {
    return <SplashScreen />;
  }

  // 5. 로딩이 끝나면 기존 로그인/회원가입 UI를 보여줍니다.
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          {isLogin ? "로그인 화면" : "회원가입 화면"}
        </h1>
        <p className="text-gray-500 mt-2">
          {isLogin
            ? "이 부분 코드 잘 작성해주세요~"
            : "회원가입 코드 작성해주세요~"}
        </p>
      </header>

      <main className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            {isLogin ? "로그인" : "회원가입"}
          </button>

          <div className="text-sm text-center text-gray-600 mt-4">
            {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "회원가입 하기" : "로그인 하기"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
