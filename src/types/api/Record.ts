// 1인 플레이 게임 결과

export interface Record {
  record_id: string; // 고유 식별자
  user_id: string; // 사과게임을 끝낸 유저의 ID
  score: number; // 유저의 점수
  time: Date; // 게임을 끝낸 시간
}
