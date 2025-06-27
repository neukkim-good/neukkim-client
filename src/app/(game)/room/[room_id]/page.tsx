"use client";
// import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RoomDetail } from "@/types/api/RoomDetail";
import { fetchRoomDetail } from "@/services/room-service";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function RoomDetailPage() {
  const router = useRouter();
  const { room_id } = useParams<{ room_id: string }>();
  // const [room, setRoom] = useState<Room | null>(null);

  //   useEffect(() => {
  //     if (!room_id) return;
  //     fetch(`http://localhost:3000/betting/${room_id}`)
  //       .then((res) => res.json())
  //       .then((data: Room) => setRoom(data));
  //   }, [room_id]);

  //   if (!room) return <p>로딩 중…</p>;

  const [room, setRoom] = useState<RoomDetail | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!room_id) return;

    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetchRoomDetail(room_id, token)
      .then((data) => {
        setRoom(data);
        // console.log("방 정보:", data);
      })
      .catch((err) =>
        alert("방 정보를 불러오는 데 실패했습니다: " + err.message)
      );
  }, [room_id]);

  // 소켓 연결을 한 번만 설정
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!room_id || !token) return;

    const socket = io(`ws://${process.env.NEXT_PUBLIC_WS_URL}`, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // 방에 join 요청 등 초기 작업 가능

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [room_id]);

  const sendMessage = (message: string) => {
    const token = sessionStorage.getItem("token");
    if (!token || !socketRef.current) return;

    socketRef.current.emit("message", {
      room_id,
      message,
      token,
      socket_id: socketRef.current.id,
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          방 제목: {room?.title}
        </h1>
        {room && (
          <div className="mt-2 text-gray-700 text-sm">
            {room.is_host && (
              <span className="ml-2 text-green-600 font-bold">(방장)</span>
            )}
          </div>
        )}
      </header>
      <main className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          실시간 참가자 리스트
        </h2>
        <button
          className="w-full p-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          onClick={() => sendMessage("소켓 통신 테스트")}
        >
          소켓 통신 테스트 버튼입니둥
        </button>
        <button
          className="w-full p-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          onClick={() => {
            const board = room?.board;
            if (!board || !room_id) return alert("게임을 시작할 수 없습니다.");

            const query = new URLSearchParams({
              room_id,
              board: JSON.stringify(board),
            }).toString();

            router.replace(`/apple-game-betting?${query}`);
          }}
        >
          게임 시작하기
        </button>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-[300px] table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  닉네임
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  레디 상태
                </th>
              </tr>
            </thead>
            <tbody>
              {room &&
                room.user_list.map((nickname, idx) => (
                  <tr
                    key={nickname}
                    className={`border-t ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 text-gray-800">{nickname}</td>
                    <td
                      className={`px-4 py-3 ${
                        idx % 2 === 0
                          ? "text-green-600 font-bold"
                          : "text-red-600"
                      }`}
                    >
                      {idx % 2 === 0 ? "Ready" : "Not Ready"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
