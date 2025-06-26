"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { useRoomStore } from "@/stores/roomStore";
import { useParticipantStore } from "@/stores/participantStore";
import { Room } from "@/types/api/Room";
import { Participant } from "@/types/api/Participant";

export default function WaitingRoomPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const { room, setRoom } = useRoomStore();
  const { participants, setParticipants } = useParticipantStore();

  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  const roomId = searchParams.get("roomId");

  // 방 정보 가져오기
  useEffect(() => {
    if (!roomId || !user) return;

    const fetchRoomInfo = async () => {
      try {
        // 방 정보 조회
        const roomResponse = await fetch(
          `http://localhost:3001/room/${roomId}`
        );
        const roomData: Room = await roomResponse.json();
        setRoom(roomData);

        // 참가자 목록 조회
        const participantsResponse = await fetch(
          `http://localhost:3001/room/${roomId}/participants`
        );
        const participantsData: Participant[] =
          await participantsResponse.json();
        setParticipants(participantsData);

        setIsLoading(false);
      } catch (error) {
        console.error("방 정보 로딩 실패:", error);
        router.push("/betting");
      }
    };

    fetchRoomInfo();
  }, [roomId, user, setRoom, setParticipants, router]);

  // 카운트다운 타이머
  useEffect(() => {
    if (!room) return;

    const interval = setInterval(() => {
      const now = new Date();
      const endTime = new Date(room.endTime);
      const difference = endTime.getTime() - now.getTime();

      if (difference > 0) {
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      } else {
        setTimeLeft("00:00");
        clearInterval(interval);
        // 게임 시작 처리
        router.push(`/game?roomId=${roomId}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [room, roomId, router]);

  // 방 나가기
  const handleLeaveRoom = async () => {
    if (!roomId || !user) return;

    try {
      await fetch(`http://localhost:3001/room/participate/${roomId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });

      router.push("/betting");
    } catch (error) {
      console.error("방 나가기 실패:", error);
    }
  };

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">
          방 정보를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  const isHost = user.user_id === room.host_id;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* 상단 뒤로가기 버튼 */}
      <button
        onClick={handleLeaveRoom}
        className="absolute top-8 left-8 w-10 h-10 flex items-center justify-center rounded border border-gray-400"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 상단 우측 알림/프로필 아이콘 */}
      <div className="absolute top-8 right-8 flex gap-2">
        <div className="relative">
          <button className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center bg-white">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
            </svg>
          </button>
          <span className="absolute -top-2 -right-2 bg-yellow-400 border-4 border-white text-blue-800 text-sm font-bold rounded-full px-2 py-0.5 shadow">
            여
          </span>
        </div>
        <button className="w-10 h-10 border border-gray-400 rounded flex items-center justify-center bg-white">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md shadow-lg">
        {/* 방 제목 */}
        <div className="bg-black text-white text-center py-3 rounded mb-4">
          <h2 className="font-semibold text-lg">{room.title}</h2>
        </div>

        {/* 최대 인원 수 */}
        <div className="bg-black text-white text-center py-3 rounded mb-4">
          <span className="font-medium">최대 인원 수: {room.maxUser}명</span>
        </div>

        {/* 게임 종료 시간 */}
        <div className="bg-black text-white text-center py-3 rounded mb-6">
          <div className="font-medium">게임 종료 시간</div>
          <div className="text-xl font-bold text-yellow-400 mt-1">
            {timeLeft || "계산 중..."}
          </div>
        </div>

        {/* 현재 참가자 표시 */}
        <div className="mb-6">
          <div className="text-center text-gray-700 font-medium mb-3">
            현재 참가자 ({participants.length}/{room.maxUser})
          </div>
          <div className="space-y-2">
            {participants.map((participant, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded ${
                  participant.user_id === room.host_id
                    ? "bg-yellow-100 border-2 border-yellow-400"
                    : "bg-white"
                }`}
              >
                <span className="font-medium">
                  {"participant.nickname" || `사용자${index + 1}`}
                  {participant.user_id === room.host_id && (
                    <span className="ml-2 text-yellow-600 font-bold">
                      (방장)
                    </span>
                  )}
                </span>
                <span className="text-sm text-gray-500">
                  {participant.user_id === user.user_id ? "나" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleLeaveRoom}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
          >
            방 나가기
          </button>

          {isHost && (
            <button
              disabled={participants.length < 2}
              className={`flex-1 py-3 rounded font-semibold transition ${
                participants.length >= 2
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              게임 시작
            </button>
          )}
        </div>

        {/* 대기 메시지 */}
        {!isHost && (
          <div className="text-center mt-4 text-gray-600">
            방장이 게임을 시작할 때까지 기다려주세요
          </div>
        )}
      </div>
    </div>
  );
}
