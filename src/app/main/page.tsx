"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

export default function MainPage() {
  const hoverImages = [
    "/main1.png",
    "/main2.png",
    "/main3.png",
    "/main4.png",
    "/main5.png",
  ];
  const defaultImage = "/splash-apple.png";

  //각 버튼의 이미지 소스를 객체 형태로 관리
  const [imageSources, setImageSources] = useState({
    solo: defaultImage,
    team: defaultImage,
    ranking: defaultImage,
  });

  //각 버튼의 인터벌 ID와 이미지 인덱스를 객체 형태로 관리
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout | number }>({});
  const imageIndexRefs = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    hoverImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  //어떤 버튼에 대한 이벤트인지 식별하기 위해 'buttonId'를 인자로 받음
  const handleMouseEnter = (buttonId: string) => {
    // 이전에 실행되던 인터벌이 있다면 중지
    if (intervalRefs.current[buttonId]) {
      clearInterval(intervalRefs.current[buttonId]);
    }

    // 해당 버튼의 이미지 인덱스 초기화
    imageIndexRefs.current[buttonId] = 0;

    // 해당 버튼의 이미지를 첫 번째 호버 이미지로 즉시 변경
    setImageSources((prev) => ({
      ...prev,
      [buttonId]: hoverImages[0],
    }));

    // 해당 버튼에 대한 새 인터벌 시작
    intervalRefs.current[buttonId] = setInterval(() => {
      imageIndexRefs.current[buttonId]++;

      const currentIndex = imageIndexRefs.current[buttonId];

      setImageSources((prev) => ({
        ...prev,
        [buttonId]: hoverImages[currentIndex],
      }));

      // 마지막 이미지에 도달하면 해당 버튼의 인터벌만 중지
      if (currentIndex >= hoverImages.length - 1) {
        clearInterval(intervalRefs.current[buttonId]);
      }
    }, 500);
  };

  //어떤 버튼에 대한 이벤트인지 식별하기 위해 'buttonId'를 인자로 받음
  const handleMouseLeave = (buttonId: string) => {
    // 해당 버튼의 인터벌 중지
    if (intervalRefs.current[buttonId]) {
      clearInterval(intervalRefs.current[buttonId]);
    }
    // 해당 버튼의 이미지만 기본 이미지로 되돌림
    setImageSources((prev) => ({
      ...prev,
      [buttonId]: defaultImage,
    }));
  };

  return (
    <div className="grid grid-rows-[2px_32em_2px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center"></header>
      <main>
        <div className="rounded-xl p-6 m-3 flex justify-around">
          <Link href="/apple-game">
            <div
              className="group w-80 h-60 mx-8 flex flex-col items-center justify-center bg-green-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-red-500 transition duration-300 ease-in-out"
              onMouseEnter={() => handleMouseEnter("solo")}
              onMouseLeave={() => handleMouseLeave("solo")}
            >
              <img
                src={imageSources.solo}
                alt="혼자하기"
                className="w-24 h-24 mb-8 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <span className="text-3xl transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                혼자하기
              </span>
            </div>
          </Link>

          <Link href="/room">
            <div
              className="group w-80 h-60 mx-8 flex flex-col items-center justify-center bg-green-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-red-500 transition duration-300 ease-in-out"
              onMouseEnter={() => handleMouseEnter("team")}
              onMouseLeave={() => handleMouseLeave("team")}
            >
              <img
                src={imageSources.team}
                alt="같이하기"
                className="w-24 h-24 mb-8 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <span className="text-3xl transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                같이하기
              </span>
            </div>
          </Link>

          <Link href="/ranking">
            <div
              className="group w-80 h-60 mx-8 flex flex-col items-center justify-center bg-green-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-red-500 transition duration-300 ease-in-out"
              onMouseEnter={() => handleMouseEnter("ranking")}
              onMouseLeave={() => handleMouseLeave("ranking")}
            >
              <img
                src={imageSources.ranking}
                alt="랭킹보기"
                className="w-24 h-24 mb-8 transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <span className="text-3xl transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                랭킹
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
