"use client";
import { fetchNoticeData } from "@/services/notice-service";
import React, { useEffect, useRef, useState } from "react";

interface UserInfo {
  nickname: string;
  score: number;
}

interface NoticeInfo {
  title: string;
  endTime: Date;
  user_list: UserInfo[];
}

export default function NotifyPage() {
  const [resultArr, setResultArr] = useState<NoticeInfo[]>([]);
  const [modalData, setModalData] = useState<UserInfo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef<HTMLDivElement>(null); //HTMLDivElement -> div요소를 나타내는 DOM 인터페이스

  function modalControl(list: UserInfo[]) {
    setModalData(list);
    setModalOpen(true);
  }

  useEffect(() => {
    fetchNoticeData().then((data) => setResultArr(data));
  }, []);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <main className="w-full max-w-4xl">
        <div className=" mb-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[280px]">
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-10">
            🎮 게임 플레이 결과 🎮
          </h1>
          {modalOpen && (
            // 모달 뒤 회색 영역
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
              }}
            >
              {/* 그 안에 모달 */}
              <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                <h2 className="text-xl font-bold mb-4">랭킹</h2>
                <ol className="list-disc list-inside space-y-1">
                  {modalData.map((user, idx) => (
                    <li key={idx} className="flex justify-between">
                      {/* index 0, 1, 2에는 금, 은, 동 색깔 부여, 나머지는 검은색 */}
                      <style jsx>{`
                        li {
                          color: ${idx === 0
                            ? "gold"
                            : idx === 1
                            ? "silver"
                            : idx === 2
                            ? "#cd7f32"
                            : "black"};
                        }
                      `}</style>

                      <div>
                        {idx + 1}.{" "}
                        {user.nickname ? user.nickname : "익명의 유저"}{" "}
                        {user.score}점
                      </div>
                      <div>
                        <span className="font-bold mr-2">
                          {idx === 0
                            ? "🥇"
                            : idx === 1
                            ? "🥈"
                            : idx === 2
                            ? "🥉"
                            : ""}
                        </span>
                        {/* {user[field]}{" "} */}
                      </div>
                    </li>
                  ))}
                </ol>
                <button
                  className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => setModalOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
          {resultArr.length === 0 ? (
            <p>결과가 없습니다.</p>
          ) : (
            resultArr.map((room, idx) => (
              <div
                onClick={() => modalControl(room.user_list)}
                key={idx}
                className="mb-6 p-4 border rounded bg-white shadow hover:border-green-500"
              >
                <h3 className="text-lg font-bold mb-1">{room.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  종료 시간: {new Date(room.endTime).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
=======
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">공지사항</h1>
        <p className="text-gray-500 mt-2">이 부분 코드 잘 작성해주세요~</p>
      </header>
      <main>
        <p className="text-gray-700">공지사항 내용</p>
>>>>>>> main
      </main>
    </div>
  );
}
