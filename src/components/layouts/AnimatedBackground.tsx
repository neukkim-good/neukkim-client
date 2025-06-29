// components/layouts/AnimatedBackground.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import { Apple } from "lucide-react";

// 파티클 데이터 타입을 정의합니다.
interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  animationName: string;
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
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
    const newParticles = [...Array(40)].map((_, i) => {
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
        size: Math.random() * 1.7 + 0.6,
        delay: `${Math.random() * 1}s`,
        duration: `${5 + Math.random() * 7}s`,
        animationName,
      };
    });
    setParticles(newParticles);
  }, [animations]);

  return (
    // 배경은 fixed와 z-0를 사용하여 뷰포트 전체를 덮고 최하단 레이어에 위치시킵니다.
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-red-50 via-green-50 to-yellow-50 overflow-hidden">
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
              filter: `blur(${Math.random() * 1.2}px)`,
            }}
          >
            <Apple
              className="w-full h-full"
              style={{
                color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 70%)`,
                opacity: 0.45 + Math.random() * 0.5,
                filter: `drop-shadow(0 0 6px hsl(${Math.floor(
                  Math.random() * 360
                )}, 90%, 80%))`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
