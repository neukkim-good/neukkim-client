export async function sendGameResult(score: number) {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch("http://3.34.95.59:3001/apple-game", {
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
