"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  href: string;
  title: string;
  defaultImage: string;
  hoverImages: string[];
}

export default function AnimatedButton({
  href,
  title,
  defaultImage,
  hoverImages,
}: AnimatedButtonProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setActiveIndex(0);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex ?? -1) + 1;
        if (nextIndex >= hoverImages.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prevIndex;
        }
        return nextIndex;
      });
    }, 500);
  };

  const handleMouseLeave = () => {
    // 마우스가 떠나면 인터벌을 즉시 중지
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setActiveIndex(null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Link href={href}>
      <div
        className="group w-80 h-60 mx-8 flex flex-col items-center justify-center bg-green-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-red-500 transition duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-24 h-24 mb-8">
          {/* 기본 이미지: activeIndex가 null일 때만 보임 */}
          <img
            src={defaultImage}
            alt={title}
            className={`absolute inset-0 w-full h-full transform transition-all duration-300 ease-in-out group-hover:scale-110 ${
              activeIndex === null ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.2s, transform 0.3s" }}
          />
          {/* 호버 이미지들: 미리 겹쳐놓고 activeIndex에 따라 투명도 조절 */}
          {hoverImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${title}-hover-${index}`}
              className={`absolute inset-0 w-full h-full transform transition-opacity duration-200 ease-in-out group-hover:scale-110 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <span className="text-3xl transform transition-transform duration-300 ease-in-out group-hover:scale-110">
          {title}
        </span>
      </div>
    </Link>
  );
}
