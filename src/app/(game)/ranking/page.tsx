"use client";
import { fetchRankingData } from "@/services/ranking-service";
import { useEffect, useState } from "react";

export default function RankingPage() {
  const [dayRank, setDayRank] = useState([]);
  const [weekRank, setWeekRank] = useState([]);
  const [meanRank, setMeanRank] = useState([]);
  const [winRateRank, setWinRateRank] = useState([]);
  // ranking
  useEffect(() => {
    async function getData() {
      await fetchRankingData().then((data) => {
        console.log("Ranking data fetched:", data);
        setDayRank(data.dayRank);
        setWeekRank(data.weekRank);
        setMeanRank(data.meanRank);
        setWinRateRank(data.winRateRankArray);
      });
    }
    getData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">🍏랭킹🍎</h1>
      </header>
      <main className="flex flex-row justify-around w-full">
        <div className="basis-1/5">
          <RankingList
            title="📅 오늘의 순위"
            rankData={dayRank}
            field="score"
          />
        </div>

        <div className="basis-1/5">
          <RankingList
            title="🗓️ 이번 주 기록 순위"
            rankData={weekRank}
            field="score"
          />
        </div>

        <div className="basis-1/5">
          <RankingList
            title="📊 평균 점수 순위"
            rankData={meanRank}
            field="mean"
          />
        </div>

        <div className="basis-1/5">
          <RankingList
            title="📊 승률 순위"
            rankData={winRateRank}
            field="score"
          />
        </div>
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
  console.log("Rendering RankingList with data:", rankData);
  return (
    <section className="text-gray-800 bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <br></br>
      <ol>
        {rankData?.length === 0 && <li>데이터 없음</li>}
        {rankData?.map((item, index) => (
          <li key={item.user_id + "_" + index} className="flex justify-between">
            {/* index 0, 1, 2에는 금, 은, 동 색깔 부여, 나머지는 검은색 */}
            <style jsx>{`
              li {
                color: ${index === 0
                  ? "gold"
                  : index === 1
                  ? "silver"
                  : index === 2
                  ? "#cd7f32"
                  : "black"};
              }
            `}</style>

            <div>
              {index + 1}. {item.nickname}
            </div>
            <div>
              <span className="font-bold mr-2">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : ""}
              </span>
              {item[field]}{" "}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
