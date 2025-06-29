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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${link}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      if (res.status === 202) {
        console.log("재입장 했습니다");
      }
      return link;
    } else {
      console.warn("참가 실패", res.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching participant data:", error);
    return null;
  }
}
