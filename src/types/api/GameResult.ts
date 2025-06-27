// 내기 후 참가자들의 게임 결과를 나타내는 타입 정의

import { Participant } from "./Participant";

export interface GameResult {
  //[x: string]: Key | null | undefined;
  result_id: string; // 고유 식별자
  title: string; // 게임 제목
  endTime: Date; // 게임 종료 시간
  totalParticipants: number; // 총 참가자 수
  myRank: number; // 내 순위
  myScore: number; // 내 점수
  participants: Participant[]; // 참가자 목록
  room_id: string; // 게임 방 ID
  user_id: string; // 참가자 ID
  score: number; // 참가자의 점수
}
// {formatDateTime(result.endtime)}</span>
//                               <span>멤버: ({result.totalParticipants}명)</span>
//                             </div>
//                             <div className="flex justify-between items-baseline">
//                               <p className="font-bold text-gray-800 truncate pr-2">
//                                 {result.title}
//                               </p>
//                               <div className="flex items-baseline space-x-2 flex-shrink-0">
//                                 <span className="text-sm text-gray-600">
//                                   {result.myRank}등
//                                 </span>
//                                 <span className="text-md font-semibold text-blue-600">
//                                   {result.myScore}점
