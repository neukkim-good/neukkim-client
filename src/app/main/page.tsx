"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import AnimatedButton from "@/components/layouts/AnimatedButton";

export default function MainPage() {
  const hoverImages = [
    "/main1.png",
    "/main2.png",
    "/main3.png",
    "/main4.png",
    "/main5.png",
  ];
  const defaultImage = "/splash-apple.png";

  const [easterEgg, setEasterEgg] = useState(0);

  useEffect(() => {
    hoverImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [hoverImages]);

  return (
    <div className="grid grid-rows-[2px_22em_2px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center"></header>
      <main>
        {easterEgg >= 10 ? (
          <div className="fixed text-center mb-8 animate-fade-in-up position-fixed left-0 right-0 z-50">
            <img src="/logo_3.png" alt="로고" className="w-10 mx-auto mb-4" />
            <p className="font-extrabold mb-3 bg-gradient-to-r from-red-600 via-yellow-500 to-green-500 bg-clip-text text-transparent [background-size:200%_auto] animate-text-shimmer animate-fade-in-up">
              개발자: 김민규, 여은동, 정다영, 한정우, 황인찬
            </p>
          </div>
        ) : null}
        <div className="rounded-xl p-6 m-10 flex justify-around items-end">
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
            <AnimatedButton
              href="/apple-game"
              title="혼자하기"
              defaultImage={defaultImage}
              hoverImages={hoverImages}
            />
          </div>

          {/* 같이하기 버튼 그룹 */}
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
            <AnimatedButton
              href="/room"
              title="같이하기"
              defaultImage={defaultImage}
              hoverImages={hoverImages}
            />
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
            <AnimatedButton
              href="/ranking"
              title="랭킹"
              defaultImage={defaultImage}
              hoverImages={hoverImages}
            />
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
