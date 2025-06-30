"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";

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

  const [easterEgg, setEasterEgg] = useState(0);

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
    <div className="grid grid-rows-[2px_22em_2px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center"></header>
      <main>
        {easterEgg >= 10 ? (
          <div className="fixed text-center mb-8 animate-fade-in-up position-fixed left-0 right-0 z-50">
            <img
              src="/logo_3.png"
              alt="로고"
              className="w-10
           mx-auto mb-4"
            />
            <p className="font-extrabold mb-3 bg-gradient-to-r from-red-600 via-yellow-500 to-green-500 bg-clip-text text-transparent [background-size:200%_auto] animate-text-shimmer animate-fade-in-up">
              개발자: 김민규, 여은동, 정다영, 한정우, 황인찬
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {/* ✅ 이 부분에 items-end를 추가하여 자식 요소들을 아래 기준으로 정렬합니다. */}
        <div className="rounded-xl p-6 m-3 flex justify-around items-end">
          {/* 혼자하기 버튼 그룹 */}
          <div className="flex flex-col items-center">
            <img
              src="/sol_char2.png"
              alt="솔로 플레이 캐릭터"
              className="w-32 h-32 mr-40 cursor-pointer"
              onClick={() => setEasterEgg(easterEgg + 1)}
              data-tooltip-id="soloTooltip"
              data-tooltip-content="혼자서 사과를 모아보세요! 저를 여러번 클릭해봐요!"
            />

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
          </div>

          {/* 같이하기 버튼 (mt-80 제거) */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32"></div>
            <img
              src="/sol_char3.png"
              alt="멀티 플레이 캐릭터"
              className="w-40 mr-35 cursor-pointer"
              onClick={() => setEasterEgg(easterEgg + 1)}
              data-tooltip-id="soloTooltip"
              data-tooltip-content="상대와 사과게임을 겨뤄보세요! 저를 여러번 클릭해봐요!"
            />
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
          </div>

          {/* 랭킹 버튼 그룹 */}
          <div className="flex flex-col items-center">
            <img
              src="/sol_char1.png"
              alt="랭킹 캐릭터"
              className="w-32 h-32 mr-40 cursor-pointer"
              onClick={() => setEasterEgg(easterEgg + 1)}
              data-tooltip-id="soloTooltip"
              data-tooltip-content="사과게임 랭킹을 둘러봐요! 저를 여러번 클릭해봐요!"
            />

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
        </div>
        <Tooltip
          id="soloTooltip"
          className="bg-black text-white p-2 rounded-md"
          place="top"
        />
      </main>
    </div>
  );
}
