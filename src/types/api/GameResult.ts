// 내기 후 참가자들의 게임 결과를 나타내는 타입 정의

export interface GameResult {
  result_id: string; // 고유 식별자
  room_id: string; // 게임 방 ID
  user_id: string; // 참가자 ID
  score: number; // 참가자의 점수
}
