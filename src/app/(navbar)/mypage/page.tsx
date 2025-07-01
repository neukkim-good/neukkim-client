"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types/api/User";
import { Record as MyRecord } from "@/types/api/Record";
import { GameResult as MyGameResult } from "@/types/api/GameResult";
import Image from "next/image";
import { Apple } from "lucide-react";
interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  animationName: string;
}

interface RecordList {
  records: MyRecord[];
}

interface GameResultList {
  gameResults: MyGameResult[];
}

export default function MyPage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  // 애니메이션 조합
  const animations = useMemo(
    () => [
      "animate-fly-1",
      "animate-fly-2",
      "animate-fly-3",
      "animate-fly-4",
      "animate-spin-slow",
      "animate-scale-bounce",
      "animate-hue-rotate",
      "animate-opacity-pulse",
      "animate-float",
      "animate-wiggle",
    ],
    []
  );

  useEffect(() => {
    // 사과 개수를 40개
    const newParticles = [...Array(40)].map((_, i) => {
      // 2~3개의 애니메이션 랜덤 조합
      const animCount = 2 + Math.floor(Math.random() * 2);
      const randomAnimations = Array.from(
        { length: animCount },
        () => animations[Math.floor(Math.random() * animations.length)]
      );
      const animationName = randomAnimations.join(" ");
      return {
        id: i,
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        size: Math.random() * 1.7 + 0.6,
        delay: `${Math.random() * 1}s`,
        duration: `${5 + Math.random() * 7}s`,
        animationName,
      };
    });
    setParticles(newParticles);
  }, [animations]);

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

  const [todayMaxScoreLoading, setTodayMaxScoreLoading] = useState(false);
  const [todayHighScore, setTodayHighScore] = useState("");

  const [weeklyScoreLoading, setWeeklyScoreLoading] = useState(false);
  const [weeklyHighScore, setWeeklyHighScore] = useState("");
  const [weeklyAverScore, setWeeklyAverScore] = useState("");

  const user = useUserStore((s) => s.user);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const fetchTodayHighScore = async () => {
        setTodayMaxScoreLoading(true);
        setError("");

        try {
          const response = await fetch(`${API}/mypage/record/today`, {
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
          setTodayHighScore(data.todayMaxScore);
        } catch (err: any) {
          setError(err.message);
          setTodayHighScore("0");
        } finally {
          setTodayMaxScoreLoading(false);
        }
      };
      fetchTodayHighScore();
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const fetchWeeklyScore = async () => {
        setWeeklyScoreLoading(true);
        setError("");

        try {
          const response = await fetch(`${API}/mypage/record/weekly`, {
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
          setWeeklyHighScore(data.weeklyMaxScore);
          setWeeklyAverScore(data.weeklyAverageScore);
        } catch (err: any) {
          setError(err.message);
          setTodayHighScore("정보 없음");
        } finally {
          setWeeklyScoreLoading(false);
        }
      };
      fetchWeeklyScore();
    }
  }, []);

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

    // 이 함수가 항상 한국 시간을 반환하도록 timeZone 옵션을 추가합니다.
    return date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul", // <<< 이 옵션을 추가하는 것이 핵심입니다.
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  function toKST(utcDate: Date) {
    const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
    return kstDate;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-50 via-green-50 to-yellow-50">
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute ${p.animationName}`}
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}rem`,
                height: `${p.size}rem`,
                animationDelay: p.delay,
                animationDuration: p.duration,
                filter: `blur(${Math.random() * 1.2}px)`,
              }}
            >
              <Apple
                className="w-full h-full"
                style={{
                  color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 70%)`,
                  opacity: 0.35 + Math.random() * 0.5,
                  filter: `drop-shadow(0 0 6px hsl(${Math.floor(
                    Math.random() * 360
                  )}, 90%, 80%))`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center py-12 px-4">
        <main className="w-full max-w-4xl">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              🍏마이 페이지🍎
            </h1>
            <br></br>
            <p className="text-gray-500">기록을 확인해보세요!</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* ===== 기록 섹션 ===== */}
            <div className="flex justify-between items-center border-gray-200 pb-3">
              <span className="text-black text-xl font-semibold">
                💯 오늘 최고 기록: {todayMaxScoreLoading ? "" : todayHighScore}
              </span>
              <span className="text-black text-xl font-semibold">
                📋️ 최근 7일 최고 기록:{" "}
                {weeklyScoreLoading ? "" : weeklyHighScore}
              </span>
              <span className="text-black text-xl font-semibold">
                🗓️ 최근 7일 평균 기록:{" "}
                {weeklyScoreLoading ? "" : weeklyAverScore}
              </span>
            </div>

            {/* ===== 닉네임 섹션 ===== */}
            <div className="flex justify-between items-center p-3 border-t pt-3">
              <div className="flex items-center space-x-4 border-gray-200">
                <span className="text-gray-600 font-semibold">내 닉네임:</span>
                {isEditing ? (
                  <input
                    className="text-gray-600 font-bold text-lg"
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                  ></input>
                ) : (
                  <span className="text-green-600 font-bold text-lg">
                    {isNicknameLoading ? "" : nickname}
                  </span>
                )}
              </div>
              <button
                onClick={handleNicknameButtonClick}
                className="ml-4 text-white bg-green-500 hover:bg-red-500 transition font-semibold py-2 px-4 rounded-md transition-colors"
              >
                {isEditing ? "저장" : "닉네임 변경"}
              </button>
            </div>

            {/* ===== 내 기록 보기 섹션 ===== */}
            <div className="border-t pt-4">
              <button
                onClick={handleToggleRecordsClick}
                className="w-full text-center text-white text-2xl hover:bg-red-500 p-3 bg-green-500 rounded-md transition-colors"
              >
                {isRecordsVisible ? "기록 접기" : "기록 보기"}
              </button>
              {isRecordsVisible && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50/80 min-h-[200px]">
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <div className="flex flex-col md:flex-row justify-between md:space-x-6">
                    {/* ===== 왼쪽 컬럼: 개인 기록 ===== */}
                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                      <h3 className="text-2xl text-black text-center font-semibold mb-3 pb-2 border-b">
                        🕹️ 혼자하기
                      </h3>
                      <div className="space-y-2">
                        {isRecordsLoading ? (
                          <p>...</p>
                        ) : records.length > 0 ? (
                          records.map((record, index) => (
                            <div
                              key={record.record_id + "_" + index}
                              className="flex justify-between items-center p-2 border-b last:border-b-0"
                            >
                              <span className="text-sm text-gray-500">
                                {new Date(record.time).toLocaleString()}
                                {/* {new Date(result.endTime).toLocaleString()} */}
                              </span>
                              <span className="text-md font-semibold text-gray-800">
                                {record.score}점
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500"></p>
                        )}
                      </div>
                    </div>

                    {/* ===== 오른쪽 컬럼: 내기 기록 ===== */}
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl text-red-500 text-center font-semibold mb-3 pb-2 border-b">
                        🎮 같이하기
                      </h3>
                      <div className="space-y-3">
                        {isGameResultLoading ? (
                          <p>...</p>
                        ) : gameResult.length > 0 ? (
                          [...gameResult]
                            .sort(
                              (a, b) =>
                                new Date(b.endTime).getTime() -
                                new Date(a.endTime).getTime()
                            )
                            .map((result, index) => (
                              <div
                                key={result.result_id + "_" + index}
                                className="p-1 border-b last:border-b-0"
                              >
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                                  <span>{formatDateTime(result.endTime)}</span>
                                  <span>
                                    멤버: {result.totalParticipants}명
                                  </span>
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
                          <p className="text-gray-500"></p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
