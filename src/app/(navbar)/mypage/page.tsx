"use client";
import { useState, useEffect } from "react"; // useEffect를 import 해야 합니다.
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types/api/User";
import { Record as MyRecord } from "@/types/api/Record"; // Record 타입을 정의한 파일을 import 합니다.
import { GameResult as MyGameResult } from "@/types/api/GameResult";

interface RecordList {
  records: MyRecord[];
}

interface GameResultList {
  gameResults: MyGameResult[];
}

export default function MyPage() {
  const [nickname, setNickname] = useState("");
  const [isNicknameLoading, setIsNicknameLoading] = useState(true);
  const [isRecordsVisible, setIsRecordsVisible] = useState(false);
  const [isGameResultVisible, setIsGameResultVisible] = useState(true);
  const [records, setRecords] = useState<MyRecord[]>([]);
  const [gameResult, setGameResult] = useState<MyGameResult[]>([]);
  const [isGameResultLoading, setIsGameResultLoading] = useState(false);
  const [isRecordsLoading, setIsRecordsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const user = useUserStore((s) => s.user);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const fetchUserNickname = async () => {
        setIsNicknameLoading(true);
        setError("");

        try {
          const response = await fetch(`${API}/mypage/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("사용자 정보를 불러오는 데 실패했습니다.");
          }

          const data = await response.json();
          setNickname(data.nickname || "");
        } catch (err: any) {
          setError(err.message);
          setNickname("정보 없음");
        } finally {
          setIsNicknameLoading(false);
        }
      };

      fetchUserNickname();
    } else {
      setIsNicknameLoading(false);
      setNickname("로그인이 필요합니다.");
    }
  }, []);

  // --- 개인 기록 데이터 Fetch 로직 ---
  useEffect(() => {
    if (isRecordsVisible && records.length === 0) {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setError("로그인이 필요합니다. 기록을 조회할 수 없습니다.");
        return;
      }

      const fetchRecords = async () => {
        setIsRecordsLoading(true);
        setError("");

        try {
          const response = await fetch(`${API}/mypage/record`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "기록을 불러오는 데 실패했습니다."
            );
          }

          const data = await response.json();
          setRecords(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsRecordsLoading(false);
        }
      };

      fetchRecords();
    }
  }, [isRecordsVisible, records.length]);

  // 오늘 최고 기록 / 주간 최고 기록 / 주간 평균 기록

  // 개인 기록                    내기 기록
  // 2020.10.10.14:00 120점      2020. 10. 10. 14:00 방제목 멤버:() 등수:() 120점

  // "user_id": "685b939bf38ea3d4d95f8271",
  // "score": 70,
  // "time": "2025-06-25T14:42:00.000Z"

  // --- 내기 기록(GameResult) 로직 ---
  useEffect(() => {
    if (isRecordsVisible && gameResult.length === 0) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다. 게임 결과를 조회할 수 없습니다.");
        return;
      }
      const fetchGameResults = async () => {
        setIsGameResultLoading(true);
        try {
          const response = await fetch(`${API}/mypage/gameresult`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "게임 결과를 불러오는 데 실패했습니다."
            );
          }
          console.log(response);
          const data: MyGameResult[] = await response.json();
          setGameResult(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsGameResultLoading(false);
        }
      };
      fetchGameResults();
    }
  }, [isRecordsVisible, gameResult.length, API]);

  const handleToggleRecordsClick = () => {
    setIsRecordsVisible((prev) => !prev);
  };

  const handleNicknameButtonClick = () => {
    if (isEditing) {
      handleNicknameUpdate();
    } else {
      setNewNickname(nickname);
      setIsEditing(true);
    }
  };

  const handleNicknameUpdate = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }
    if (!newNickname.trim()) {
      setError("닉네임은 공백일 수 없습니다.");
      return;
    }

    setIsNicknameLoading(true);
    try {
      const response = await fetch(`${API}/mypage/nickname`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nickname: newNickname }),
      });

      if (!response.ok) {
        throw new Error("닉네임 변경에 실패했습니다.");
      }

      const data = await response.json();
      setNickname(data.nickname || ""); // 성공 시, 화면에 표시되는 닉네임 업데이트
      setIsEditing(false); // 수정 모드 종료
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsNicknameLoading(false); // 로딩 표시 종료
    }
  };

  const formatDateTime = (dateString: string | number | Date) => {
    if (!dateString) {
      return "날짜 정보 없음";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "유효하지 않은 날짜";
    }

    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="w-3/4 mx-auto my-16 bg-white p-8 rounded-xl shadow-md space-y-4">
      {/* ===== 닉네임 섹션 ===== */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-semibold">내 닉네임:</span>
          {isEditing ? (
            <input
              className="text-gray-600 font-bold text-lg"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            ></input>
          ) : (
            <span className="text-blue-600 font-bold text-lg">
              {isNicknameLoading ? "" : nickname}
            </span>
          )}
        </div>

        <button
          onClick={handleNicknameButtonClick}
          className="ml-4 text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md transition-colors"
        >
          {isEditing ? "저장" : "닉네임 변경"}
        </button>
      </div>

      {/* ===== 내 기록 보기 섹션 ===== */}
      <div className="border-t pt-4">
        <button
          onClick={handleToggleRecordsClick}
          className="w-full text-left text-gray-700 text-2xl hover:bg-gray-100 p-3 rounded-md transition-colors"
        >
          {isRecordsVisible ? "내 기록 접기" : "내 기록 보기"}
        </button>
        {isRecordsVisible && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 min-h-[200px]">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="flex flex-col md:flex-row justify-between md:space-x-6">
              {/* ===== 왼쪽 컬럼: 개인 기록 ===== */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
                  개인 기록
                </h3>
                <div className="space-y-2">
                  {isRecordsLoading ? (
                    <p>개인 기록을 불러오는 중입니다...</p>
                  ) : records.length > 0 ? (
                    records.map((record) => (
                      <div
                        key={record.record_id}
                        className="flex justify-between items-center p-2"
                      >
                        <span className="text-sm text-gray-500">
                          {formatDateTime(record.time)}
                        </span>
                        <span className="text-md font-semibold text-gray-800">
                          {record.score}점
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      표시할 개인 기록이 없습니다.
                    </p>
                  )}
                </div>
              </div>

              {/* ===== 오른쪽 컬럼: 내기 기록 ===== */}
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold mb-3 pb-2 border-b">
                  내기 기록
                </h3>
                <div className="space-y-3">
                  {isGameResultLoading ? (
                    <p>내기 기록을 불러오는 중입니다...</p>
                  ) : gameResult.length > 0 ? (
                    [...gameResult]
                      .sort(
                        (a, b) =>
                          new Date(b.endTime).getTime() -
                          new Date(a.endTime).getTime()
                      )
                      .map((result) => (
                        <div
                          key={result.room_id}
                          className="p-2 border-b last:border-b-0"
                        >
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                            <span>{formatDateTime(result.endTime)}</span>
                            <span>멤버: ({result.totalParticipants}명)</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <p className="font-bold text-gray-800 truncate pr-2">
                              {result.title}
                            </p>
                            <div className="flex items-baseline space-x-2 flex-shrink-0">
                              <span className="text-sm text-gray-600">
                                {result.myRank}등
                              </span>
                              <span className="text-md font-semibold text-blue-600">
                                {result.myScore}점
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500">
                      표시할 내기 기록이 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
