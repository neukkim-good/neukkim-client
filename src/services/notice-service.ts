// 공지사항 관련된 정보 불러오는 함수들
// ex. fetchNoticeList, fetchNoticeDetail, etc.

export async function fetchNoticeData() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ranking/notify`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching ranking data:", error);
      return [];
    });

  return data;
}
