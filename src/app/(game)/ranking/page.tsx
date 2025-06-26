"use client";
import { fetchRankingData } from "@/services/ranking-service";
import { useEffect, useState } from "react";

export default function RankingPage() {
  const [dayRank, setDayRank] = useState([]);
  const [weekRank, setWeekRank] = useState([]);
  const [meanRank, setMeanRank] = useState([]);

  // ranking
  useEffect(() => {
    async function getData() {
      await fetchRankingData().then((data) => {
        console.log("Ranking data fetched:", data);
        setDayRank(data.dayRank);
        setWeekRank(data.weekRank);
        setMeanRank(data.meanRank);
      });
    }
    getData();
    console.log(dayRank, weekRank, meanRank);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">순위 페이지</h1>
        <p className="text-gray-500 mt-2">이 부분 코드 잘 작성해주세요~</p>
      </header>
      <main className="flex flex-row justify-between w-full max-w-4xl">
        <RankingList title="📅 오늘의 순위" rankData={dayRank} field="score" />
        <RankingList
          title="🗓️ 이번 주 기록 순위"
          rankData={weekRank}
          field="score"
        />
        <RankingList
          title="📊 평균 점수 순위"
          rankData={meanRank}
          field="mean"
        />
      </main>
    </div>
  );
}

type RankingItem = {
  user_id: string;
  nickname: string;
  score?: number;
  mean?: number;
};

type RankingListProps = {
  title: string;
  rankData: RankingItem[];
  field: "score" | "mean";
};

function RankingList({ title, rankData, field }: RankingListProps) {
  return (
    <section className="text-gray-800 bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <h2>{title}</h2>
      <ol>
        {rankData.length === 0 && <li>데이터 없음</li>}
        {rankData.map((item, index) => (
          <li key={item.user_id + "_" + index}>
            <span>
              {index + 1}. {item.nickname}
            </span>
            <span>{item[field]}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
