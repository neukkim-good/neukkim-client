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
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <main className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800">
            🎮 멀티 플레이 결과 🎮
          </h1>
          <br></br>
          <p className="text-gray-500">멀티 플레이 결과를 확인해보세요!</p>
        </div>
        <div className=" mb-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[280px]">
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
                <h2 className="text-xl text-black font-bold mb-4">순위</h2>
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
                  className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-red-500 transition"
                  onClick={() => setModalOpen(false)}
                >
                  {/* {/* border border-gray-100 hover:border-red-500 transition */}
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
                className="mb-6 p-4 border rounded-2xl bg-gray-50 shadow hover:border-red-500 transition cursor-pointer"
              >
                <h3 className="text-black text-lg font-bold mb-1">
                  {room.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  종료 시간: {new Date(room.endTime).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
