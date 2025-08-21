"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function CreateRoomPage() {
  const [title, setTitle] = useState("");
  const [maxUser, setMaxUser] = useState(0);
  const [token, setToken] = useState<string | null>("");
  const router = useRouter();

  // 시간 가공 함수
  function getToday() {
    // 현재 시각으로부터 10분 후로 설정
    const now = new Date();
    const localDate = new Date(now.getTime() + 10 * 60 * 1000);
    // UTC ISO 문자열로 변환
    return localDate.toISOString();
  }

  // 방 만들기
  const makeRoomButton = async () => {
    const isoEndTime = getToday();

    const payload = {
      title: title,
      maxUser: String(maxUser),
      endTime: isoEndTime,
    };

    console.log(payload);
    console.log(token);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).then(() => {
      router.replace("/room");
    });
  };
  useEffect(() => {
    // 세션 토큰 가져오기
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center  py-12 px-4">
      <main className="flex flex-col items-center bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[280px]">
        <p className="mb-2 text-lg font-bold text-gray-700">방 제목</p>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        <p className="mb-2 text-lg font-bold text-gray-700">최대 인원 수</p>
        <input
          type="number"
          onChange={(e) => setMaxUser(e.target.valueAsNumber)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />

        {title === "" || maxUser === 0 ? (
          <button
            className="flex items-center gap-2 bg-green-100 text-gray-500 px-6 py-3 rounded-lg font-semibold shadow-md transition"
            disabled
          >
            방 만들기
          </button>
        ) : (
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            onClick={makeRoomButton}
          >
            방 만들기
          </button>
        )}
      </main>
    </div>
  );
}
