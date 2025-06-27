export async function sendGameResult(score: number) {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apple-game`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Bearer-token": `Bearer ${token}`,
      },
      body: JSON.stringify({
        score: score,
      }),
    });

    console.log("게임 결과 저장 성공:", score);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("게임 저장 실패, 오류 원인:", error);
    throw error;
  }
}

export async function sendBettingResult(score: number, room_id: string) {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/room/${room_id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Bearer-token": `Bearer ${token}`,
        },
        body: JSON.stringify({
          score,
          room_id,
        }),
      }
    );

    if (!res.ok) throw new Error("내기 결과 저장에 실패했습니다.");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("내기 저장 실패, 오류 원인:", error);
    throw error;
  }
}
