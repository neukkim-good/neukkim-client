"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomListPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");
  const [roomArr, setRoomArr] = useState<
    {
      _id: string;
      title: string;
      maxUser: number;
      host_id: object;
      endTime: Date;
      currentUser: number;
    }[]
  >([]);
  const enterRoom = function (link: string) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/room/participate/${link}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        if (res.status === 202) {
          console.log("재입장 했습니다");
        }
        router.push(`/room/${link}`);
      }
    });
  };
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/room`)
      .then((res) => res.json())
      .then((data) => {
        setRoomArr(data);
        console.log(data);
      });
    // 세션 토큰 가져오기
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <main className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            내기 리스트
          </h1>
          <p className="text-gray-500">
            참여할 방을 선택하거나 새로운 방을 만들어보세요!
          </p>
        </div>

        {/* 방 리스트 */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[280px]">
          {roomArr.length > 0 ? (
            <ul className="flex-col gap-6">
              {roomArr.map((data, idx) => (
                <li
                  key={idx}
                  className="group bg-gray-50 rounded-xl p-6 m-3 flex justify-between shadow-sm hover:shadow-md border border-gray-100 hover:border-red-500 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800  transition">
                      {data.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      ({data.currentUser}/{data.maxUser})
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 font-medium mr-3">
                      {(() => {
                        // endTime이 문자열이면 Date 객체로 변환
                        const date =
                          typeof data.endTime === "string"
                            ? new Date(data.endTime)
                            : data.endTime;
                        const kst = new Date(date.getTime());

                        // HH:mm 형식으로 출력
                        return `~ ${kst.toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}`;
                      })()}
                    </p>
                    {data.currentUser === data.maxUser ? (
                      <button
                        className=" w-20 bg-gray-300 text-white py-2 rounded-lg font-medium transition"
                        disabled
                      >
                        Full
                      </button>
                    ) : (
                      <button
                        className=" w-20 bg-green-600 hover:bg-red-500 text-white py-2 rounded-lg font-medium transition"
                        onClick={() => enterRoom(data._id)}
                      >
                        참가하기
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-40">
              <div className="text-gray-300 text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                방 리스트
              </h3>
              <p className="text-gray-400">아직 생성된 방이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 방 만들기 버튼 */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              router.push("/createRoom");
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            방 만들기
          </button>
        </div>
      </main>
    </div>
  );
}
