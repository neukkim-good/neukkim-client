import { RoomDetail } from "@/types/api/RoomDetail";

export const fetchRoomDetail = async (room_id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/room/${room_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error("방 정보를 불러오는 데 실패했습니다.");

    const data = await res.json();
    return data as RoomDetail;
  } catch (error) {
    console.log("방 상세정보 요청 오류: ", error);
    throw error;
  }
};
