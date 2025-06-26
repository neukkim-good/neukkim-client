"use client";
import { useState, useEffect } from "react"; // useEffect를 import 해야 합니다.
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types/api/User";
import { Record as MyRecord } from "@/types/api/Record"; // Record 타입을 정의한 파일을 import 합니다.

interface RecordList {
  records: MyRecord[];
}

export default function MyPage() {
  const [nickname, setNickname] = useState("");
  const [isRecordsVisible, setIsRecordsVisible] = useState(false);
  const [records, setRecords] = useState<MyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useUserStore((s) => s.user);
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
    }
  }, [user]);

  useEffect(() => {
    // 1. 토글이 열렸을 때 (isRecordsVisible === true)
    // 2. 아직 데이터를 불러온 적이 없을 때 (records.length === 0)
    // 이 두 조건을 만족할 때만 fetch를 실행하여 불필요한 API 호출을 방지합니다.
    if (isRecordsVisible && records.length === 0) {
      // 사용자 ID가 없으면 API를 호출하지 않습니다.
      if (!user?.user_id) {
        setError("사용자 정보가 없어 기록을 조회할 수 없습니다.");
        return;
      }

      const fetchRecords = async () => {
        setIsLoading(true); // 로딩 시작
        setError(""); // 이전 에러 초기화

        try {
          const response = await fetch(`${API}/mypage/record/${user.user_id}`);
          console.log("API 호출:", `${API}/mypage/record/${user.user_id}`);
          if (!response.ok) {
            throw new Error("기록을 불러오는 데 실패했습니다.");
          }

          const data = await response.json();
          setRecords(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false); // 로딩 종료 (성공/실패 여부와 관계없이)
        }
      };

      fetchRecords();
    }
  }, [isRecordsVisible, user?.user_id, records.length]); // 의존성 배열
  // 오늘 최고 기록 / 주간 최고 기록 / 주간 평균 기록

  // 개인 기록                    내기 기록
  // 2020.10.10.14:00 120점      2020. 10. 10. 14:00 방제목 멤버:() 등수:() 120점

  // "user_id": "685b939bf38ea3d4d95f8271",
  // "score": 70,
  // "time": "2025-06-25T14:42:00.000Z"

  const handleToggleRecordsClick = () => {
    setIsRecordsVisible((prev) => !prev);
  };

  return (
    // <div className="w-3/4 mx-auto m-16  bg-white p-5 rounded-xl shadow-md space-y-4">
    //   <div className="flex justify-between items-center"></div>
    //   <div className="border-t pt-4">
    //     <span className="text-gray-600 font-semibold">내 닉네임:</span>
    //     <span className="text-blue-600 font-bold text-lg">
    //       {nickname || "닉네임이 설정되지 않았습니다."}
    //     </span>
    //     <button className="text-right text-gray-700 text-2xl hover:bg-gray-100 p-3 rounded-md transition-colors">
    //       닉네임 변경
    //     </button>
    //     <button className="w-full text-left text-gray-700 text-2xl hover:bg-gray-100 p-3 rounded-md transition-colors">
    //       내 기록 보기
    //     </button>
    //   </div>
    // </div>
    <div className="w-3/4 mx-auto my-16 bg-white p-8 rounded-xl shadow-md space-y-4">
      {/* ===== 닉네임 섹션 (레이아웃 변경) ===== */}
      <div className="flex justify-between items-center">
        {/* 닉네임 텍스트와 값을 그룹으로 묶음 */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-semibold">내 닉네임:</span>
          <span className="text-blue-600 font-bold text-lg">
            {nickname || "닉네임이 설정되지 않았습니다."}
          </span>
        </div>
        {/* 닉네임 변경 버튼 */}
        <button className="text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 rounded-md transition-colors">
          닉네임 변경
        </button>
      </div>

      {/* ===== 내 기록 보기 섹션 (토글 기능 추가) ===== */}
      <div className="border-t pt-4">
        <button
          onClick={handleToggleRecordsClick}
          className="w-full text-left text-gray-700 text-2xl hover:bg-gray-100 p-3 rounded-md transition-colors"
        >
          {/* 토글 상태에 따라 텍스트 변경 */}
          {isRecordsVisible ? "내 기록 접기" : "내 기록 보기"}
        </button>

        {/* isRecordsVisible이 true일 때만 아래 내용이 렌더링됨 */}
        {isRecordsVisible && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-3">
            {/* 로딩 중일 때 */}
            {isLoading && <p>기록을 불러오는 중입니다...</p>}
            {/* 에러가 발생했을 때 */}
            {error && <p className="text-red-500">{error}</p>}
            {/* 로딩이 끝났고 에러가 없을 때 */}
            {!isLoading && !error && (
              <>
                {/* 기록 데이터가 있을 때 리스트를 렌더링 */}
                {records.length > 0 ? (
                  records.map((record) => (
                    <div
                      key={record.record_id}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <span>점수: {record.score}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(record.time).toLocaleString("ko-KR")}
                      </span>
                    </div>
                  ))
                ) : (
                  // 기록 데이터가 없을 때
                  <p>표시할 기록이 없습니다.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
