// 게임 시작 전 방 참가자 정보

export interface Room {
  room_id: string; // 방의 고유 식별자
  title: string; // 방 이름
  maxUser: number; // 최대 참가자 수
  board: number[]; // 사과게임 보드판 (배열)
  host_id: string; // 방장 ID
  endTime: Date; // 방 종료 시간
}
