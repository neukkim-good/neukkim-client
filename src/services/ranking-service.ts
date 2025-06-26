// 랭킹 화면에 필요한 데이터 관련된 함수들
// ex. fetchTodayRankingData, fetchWeeklyRankingData, etc.

export async function fetchRankingData() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching ranking data:", error);
      return [];
    });

  return data;
}
