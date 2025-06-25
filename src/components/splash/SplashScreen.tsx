// import React, { useEffect, useState } from "react";
// import { Apple, Sparkles, Leaf } from "lucide-react";

// const SplashScreen = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-50 via-pink-50 to-green-50 overflow-hidden">
//       {/* Floating particles */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 2}s`,
//               animationDuration: `${3 + Math.random() * 2}s`,
//             }}
//           >
//             <Sparkles className="w-4 h-4 text-yellow-400 opacity-60" />
//           </div>
//         ))}
//       </div>

//       {/* Main content */}
//       <div className="text-center relative z-10">
//         {/* Apple logo with animations */}
//         <div className="relative mb-8 animate-bounce-slow">
//           {/* Apple shadow */}
//           <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/10 rounded-full blur-md animate-pulse"></div>

//           {/* Main apple */}
//           <div className="relative">
//             {/* Apple body */}
//             <div className="w-24 h-28 mx-auto bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-full relative transform rotate-12 animate-wiggle">
//               {/* Apple highlight */}
//               <div className="absolute top-4 left-4 w-8 h-12 bg-gradient-to-br from-red-300 to-transparent rounded-full opacity-60"></div>

//               {/* Apple bite */}
//               <div className="absolute top-6 -right-2 w-8 h-8 bg-gradient-to-br from-red-50 via-pink-50 to-green-50 rounded-full"></div>
//             </div>

//             {/* Apple stem */}
//             <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-amber-700 rounded-full"></div>

//             {/* Apple leaf */}
//             <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 translate-x-2">
//               <Leaf className="w-4 h-4 text-green-500 transform rotate-45 animate-sway" />
//             </div>
//           </div>
//         </div>

//         {/* Game title */}
//         <div className="mb-6 animate-fade-in-up">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent mb-2 animate-text-shimmer">
//             사과 게임
//           </h1>
//           <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
//             <Apple className="w-5 h-5 text-red-500 animate-spin-slow" />
//             <span className="animate-typing">맛있는 모험이 시작됩니다</span>
//             <Apple className="w-5 h-5 text-red-500 animate-spin-slow" />
//           </div>
//         </div>

//         {/* Loading animation */}
//         <div className="flex justify-center items-center gap-2 animate-fade-in-up-delay">
//           <div className="flex gap-1">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
//                 style={{ animationDelay: `${i * 0.2}s` }}
//               ></div>
//             ))}
//           </div>
//           <span className="ml-3 text-gray-500 font-medium">로딩중...</span>
//         </div>

//         {/* Decorative apples */}
//         <div className="absolute -top-20 -left-20 opacity-20">
//           <Apple className="w-16 h-16 text-red-400 animate-float" />
//         </div>
//         <div className="absolute -bottom-20 -right-20 opacity-20">
//           <Apple
//             className="w-20 h-20 text-green-400 animate-float"
//             style={{ animationDelay: "1s" }}
//           />
//         </div>
//       </div>

//       {/* Progress bar */}
//       <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64">
//         <div className="h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
//           <div className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-progress"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SplashScreen;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Apple } from "lucide-react";
// 파티클 데이터 타입을 정의합니다.
interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  animationName: string; // 애니메이션 클래스 이름을 저장할 속성
}

const SplashScreen = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animations = [
    "animate-fly-1",
    "animate-fly-2",
    "animate-fly-3",
    "animate-fly-4",
  ];

  useEffect(() => {
    // === START: 수정된 부분 ===
    // 배경 요소를 사과 15개로 변경하고, 무작위 애니메이션을 적용
    const newParticles = [...Array(15)].map((_, i) => {
      const randomAnimation =
        animations[Math.floor(Math.random() * animations.length)];
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        size: Math.random() * 1.5 + 0.5, // 0.5rem ~ 2rem
        delay: `${Math.random() * 10}s`,
        duration: `${15 + Math.random() * 10}s`,
        animationName: randomAnimation,
      };
    });
    // === END: 수정된 부분 ===
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-green-50 to-yellow-50 overflow-hidden">
      {/* 백그라운드 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            // === START: 수정된 부분 ===
            // 각 파티클에 무작위 애니메이션 클래스 적용
            className={`absolute ${p.animationName}`}
            // === END: 수정된 부분 ===
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}rem`,
              height: `${p.size}rem`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          >
            {/* === START: 수정된 부분 === */}
            {/* 배경 요소를 모두 사과 아이콘으로 변경 */}
            <Apple className="w-full h-full text-red-300 opacity-50" />
            {/* === END: 수정된 부분 === */}
          </div>
        ))}
      </div>

      <main className="flex flex-col items-center justify-center text-center relative z-10 p-4">
        {/* 메인 사과 로고 */}
        <div className="relative mb-12 animate-float">
          <div className="absolute -inset-4 animate-pulse-glow rounded-full"></div>
          <div className="relative w-40 h-40 animate-wiggle">
            <Image
              src="/splash-apple.png"
              alt="사과 게임 로고"
              width={160}
              height={160}
              priority
            />
          </div>
        </div>

        {/* 타이틀과 서브타이틀 */}
        <div className="mb-12">
          <h1 className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-red-600 via-pink-500 to-orange-500 bg-clip-text text-transparent [background-size:200%_auto] animate-text-shimmer animate-fade-in-up">
            사과 게임
          </h1>
          <div className="flex justify-center items-center">
            <p className="text-gray-600 overflow-hidden whitespace-nowrap border-r-2 animate-typing">
              맛있는 모험이 시작됩니다...
            </p>
          </div>
        </div>
      </main>

      {/* 진행 바 */}
      <div className="absolute bottom-16 w-full max-w-xs px-4">
        <div className="h-2.5 bg-white/50 rounded-full overflow-hidden shadow-inner backdrop-blur-sm">
          <div className="h-full bg-gradient-to-r from-red-400 to-orange-500 rounded-full animate-progress"></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2 font-medium animate-fade-in-up-delay">
          로딩중...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
