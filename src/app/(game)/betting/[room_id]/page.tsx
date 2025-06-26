"use client";
// import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// import { Room } from "@/types/api/Room";

export default function RoomDetailPage() {
  const { room_id } = useParams<{ room_id: string }>();
  // const [room, setRoom] = useState<Room | null>(null);

  //   useEffect(() => {
  //     if (!room_id) return;
  //     fetch(`http://localhost:3000/betting/${room_id}`)
  //       .then((res) => res.json())
  //       .then((data: Room) => setRoom(data));
  //   }, [room_id]);

  //   if (!room) return <p>로딩 중…</p>;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">내기 상세 페이지</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          실시간 참가자 리스트
        </h2>
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
              {[
                { name: "유저A", status: "Ready" },
                { name: "유저B", status: "Not Ready" },
              ].map((user, idx) => (
                <tr
                  key={user.name}
                  className={`border-t ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 text-gray-800">{user.name}</td>
                  <td
                    className={`px-4 py-3 ${
                      user.status === "Ready"
                        ? "text-green-600 font-bold"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
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
