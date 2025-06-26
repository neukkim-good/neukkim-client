"use client";

import { useEffect, useState, useMemo } from "react";
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
  // 다양한 애니메이션 클래스 조합
  const animations = useMemo(
    () => [
      "animate-fly-1",
      "animate-fly-2",
      "animate-fly-3",
      "animate-fly-4",
      "animate-spin-slow",
      "animate-scale-bounce",
      "animate-hue-rotate",
      "animate-opacity-pulse",
      "animate-float",
      "animate-wiggle",
    ],
    []
  );

  useEffect(() => {
    // 사과 개수를 40개로 증가, 애니메이션 조합 적용
    const newParticles = [...Array(40)].map((_, i) => {
      // 2~3개의 애니메이션을 랜덤 조합
      const animCount = 2 + Math.floor(Math.random() * 2);
      const randomAnimations = Array.from(
        { length: animCount },
        () => animations[Math.floor(Math.random() * animations.length)]
      );
      const animationName = randomAnimations.join(" ");
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        size: Math.random() * 1.7 + 0.6, // 0.6rem ~ 2.3rem
        delay: `${Math.random() * 10}s`,
        duration: `${12 + Math.random() * 13}s`,
        animationName,
      };
    });
    setParticles(newParticles);
  }, [animations]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-green-50 to-yellow-50 overflow-hidden">
      {/* 백그라운드 파티클 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute ${p.animationName}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}rem`,
              height: `${p.size}rem`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              filter: `blur(${Math.random() * 1.2}px)`, // 약간의 블러 효과로 더 화려하게
              zIndex: 1,
            }}
          >
            {/* 랜덤 색상과 투명도, 그림자 효과 */}
            <Apple
              className="w-full h-full"
              style={{
                color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 70%)`,
                opacity: 0.35 + Math.random() * 0.5,
                filter: `drop-shadow(0 0 6px hsl(${Math.floor(
                  Math.random() * 360
                )}, 90%, 80%))`,
              }}
            />
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
