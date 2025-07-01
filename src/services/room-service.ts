import { RoomDetail } from "@/types/api/RoomDetail";

export async function fetchRoomData() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/room`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching ranking data:", error);
      return [];
    });

  return data;
}

export async function fetchParticipantData(link: string) {
  const token = sessionStorage.getItem("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/room/participate/${link}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      if (res.status === 202) {
        return 2;
      }
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching participant data:", error);
    return 0;
  }
}

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

export const checkAlreadyPlayed = async (room_id: string, token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/room/${room_id}/check`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("조회 실패");

  const data = await res.json();
  return data.already_played as boolean;
};
