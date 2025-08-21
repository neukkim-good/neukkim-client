// apple-game-betting/ClientBetting.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "../style.css"; // Import your CSS styles
import { sendBettingResult } from "@/services/applegame-service";
import {
  createGridWithValues,
  getSelectionBoxCoords,
  getSelectedApples,
} from "../appleGameLogic";

export default function ClientBetting() {
  const TOTAL_TIME = 120; // 디버깅을 위해 10초로 설정

  const router = useRouter();
  const searchParams = useSearchParams();
  const boardStr = searchParams.get("board");
  const room_id = searchParams.get("room_id");

  const board = boardStr ? JSON.parse(boardStr) : null;

  const [score, setScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const boardRef = useRef<number[]>([]); // 사과게임 판
  const splashRef = useRef<HTMLDivElement>(null); // 사과게임 시작 전 화면
  const gridRef = useRef<HTMLDivElement>(null); // 사과게임 판
  const scoreRef = useRef<number>(0); // 현재 점수, 서버에 정확한 값을 전달하기 위함
  const timerBarRef = useRef<HTMLDivElement>(null); // 타이머 바
  const timeRef = useRef<HTMLDivElement>(null); // 남은 시간 표시
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머
  const timerContainerRef = useRef<HTMLDivElement>(null); // 타이머 컨테이너, 게임 시작 후에 보이게 하기 위해 사용
  const selectionBoxRef = useRef<HTMLDivElement>(null); // 드래그 박스
  const resultModalRef = useRef<HTMLDivElement>(null); // 결과 모달
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); // 드래그 시작 좌표 저장
  const dragCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); // 드래그 중 좌표 저장

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  // 페이지 진입 즉시 게임 자동 시작
  useEffect(() => {
    if (!boardRef.current) {
      alert("게임을 시작할 수 없습니다.");
      return;
    }
    startGame();
  }, []);

  // 게임 종료 함수
  const endGame = useCallback(() => {
    setIsGameRunning(false);
    resultModalRef.current?.classList.remove("hidden"); // 결과 띄우기
    console.log("서버에 보낼 점수: ", scoreRef.current);
    if (!room_id) {
      console.error("room_id가 없습니다.");
      return;
    }
    sendBettingResult(scoreRef.current, room_id); // 게임 결과 서버에 전송
  }, [room_id]);

  // 타이머 시작 함수
  const startTimer = useCallback(() => {
    if (timerBarRef.current) timerBarRef.current.style.width = "100%"; // 타이머 바 초기화
    if (timeRef.current) timeRef.current.textContent = TOTAL_TIME.toString();

    let remainingTime = TOTAL_TIME;

    timerRef.current = setInterval(() => {
      remainingTime -= 1; // 남은 시간 감소
      if (timeRef.current)
        timeRef.current.textContent = remainingTime.toString(); // 남은 시간 업데이트
      if (timerBarRef.current)
        timerBarRef.current.style.width = `${
          (remainingTime / TOTAL_TIME) * 100
        }%`; // 타이머 바 업데이트

      if (remainingTime <= 0 && timerRef.current) {
        clearInterval(timerRef.current); // 타이머 정지
        endGame(); // 게임 종료 함수 호출
      }
    }, 1000); // 1초마다 실행
  }, [TOTAL_TIME, endGame]);

  // 게임 시작 함수
  const startGame = useCallback(() => {
    setScore(0);
    setIsGameRunning(true);
    if (gridRef.current && board) {
      createGridWithValues(gridRef.current, board); // 배열을 전달해서 grid 생성
    } else {
      alert("게임을 시작할 수 없습니다.");
      return;
    }
    splashRef.current?.classList.add("hidden"); // 스플래쉬 화면 숨기기
    timerContainerRef.current?.classList.remove("hidden"); // 타이머 컨테이너 보이기
    startTimer();
  }, [board, startTimer]);

  // 드래그 박스 CSS 스타일 업데이트
  const updateSelectionBoxStyle = () => {
    const box = selectionBoxRef.current; // 드래그 박스 DOM 요소 가져오기
    const grid = gridRef.current; // 사과판 DOM 요소 가져오기
    if (!box || !grid) return; // 드래그박스나 사과판이 없으면 아무것도 하지 않음

    const sel = getSelectionBoxCoords(
      dragStartRef.current.x,
      dragStartRef.current.y,
      dragCurrentRef.current.x,
      dragCurrentRef.current.y
    );

    const gridRect = grid.getBoundingClientRect();
    box.style.left = `${sel.left - gridRect.left}px`;
    box.style.top = `${sel.top - gridRect.top}px`;
    box.style.width = `${sel.right - sel.left}px`;
    box.style.height = `${sel.bottom - sel.top}px`;
  };

  // 드래그 시작
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isGameRunning) return; // 게임 중이 아니라면 드래그 못하게 막음.
      setIsDragging(true); // 지금 드래그 중임을 표시

      dragStartRef.current = { x: e.clientX, y: e.clientY }; // 드래그 시작 좌표 저장
      dragCurrentRef.current = { x: e.clientX, y: e.clientY }; // 드래그 중 좌표 저장

      requestAnimationFrame(() => {
        selectionBoxRef.current?.classList.remove("hidden"); // 드래그 박스 보이기
        updateSelectionBoxStyle(); // 드래그 박스 스타일 업데이트
      });
    },
    [isGameRunning]
  );

  // 드래그 중
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return; // 드래그 중이 아니라면 함수 호출 안 함.
      dragCurrentRef.current = { x: e.clientX, y: e.clientY }; // 드래그 중에 좌표 업데이트
      updateSelectionBoxStyle(); // 드래그 박스 스타일 업데이트

      const grid = gridRef.current;
      if (!grid) return;

      const selection = getSelectionBoxCoords(
        dragStartRef.current.x,
        dragStartRef.current.y,
        dragCurrentRef.current.x,
        dragCurrentRef.current.y
      );

      const { sum, selectedApples } = getSelectedApples(grid, selection);

      const apples = Array.from(
        grid.querySelectorAll<HTMLDivElement>(".apple")
      ); // 사과 요소들 가져오기
      apples.forEach((apple) => apple.classList.remove("selected-apple")); // 전체 스타일 제거 후
      selectedApples.forEach((apple) => apple.classList.add("selected-apple")); // 선택된 사과만 스타일 적용

      if (selectionBoxRef.current)
        selectionBoxRef.current.style.borderColor =
          sum === 10 ? "green" : "red"; // 선택된 사과의 합에 따라 테두리 색상 변경
    },
    [isDragging]
  );

  // 드래그 종료
  const handleMouseUp = useCallback(() => {
    setIsDragging(false); // 드래그 중이 아님을 업데이트
    selectionBoxRef.current?.classList.add("hidden"); // 드래그 박스 없애기

    const grid = gridRef.current;
    if (!grid) return;

    const selection = getSelectionBoxCoords(
      dragStartRef.current.x,
      dragStartRef.current.y,
      dragCurrentRef.current.x,
      dragCurrentRef.current.y
    );

    const { sum, selectedApples } = getSelectedApples(grid, selection);

    if (sum === 10 && selectedApples.length > 0) {
      // 선택된 사과들의 합이 10이면
      selectedApples.forEach((apple) => {
        const randomX = Math.floor(Math.random() * 200 - 100); // -100px ~ +100px
        apple.style.setProperty("--random-x", `${randomX}px`);
        apple.classList.add("pop"); // pop 클래스 추가 -> 터지는 애니메이션 효과

        apple.addEventListener(
          "animationend", // 애니메이션 종료 이벤트
          () => {
            apple.classList.remove("apple", "pop"); // 애니메이션 끝나면 pop 클래스 제거
            apple.classList.add("empty"); // 빈 사과 표시
            apple.textContent = ""; // 사과 내용 비우기
            apple.dataset.value = "0"; // 사과 값 0으로 초기화
          },
          { once: true }
        );
      });
      setScore((prev) => prev + selectedApples.length); // 점수 업데이트
    }

    const apples = Array.from(grid.querySelectorAll<HTMLDivElement>(".apple"));
    apples.forEach((apple) => apple.classList.remove("selected-apple"));
  }, []);

  // 마운트 시 이벤트 리스너 등록
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.addEventListener("mousedown", handleMouseDown); // 마우스를 누르면 handleMouseDown 함수 호출
    grid.addEventListener("mousemove", handleMouseMove); // 마우스를 움직이면 handleMouseMove 함수 호출
    grid.addEventListener("mouseup", handleMouseUp); // 마우스를 떼면 handleMouseUp 함수 호출
    grid.addEventListener("mouseleave", handleMouseUp); // 마우스가 grid를 벗어나면 handleMouseUp 함수 호출

    return () => {
      grid.removeEventListener("mousedown", handleMouseDown);
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseup", handleMouseUp);
      grid.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    scoreRef.current = score; // 점수 최신값을 ref에 저장
  }, [score]);

  // 창 닫기 또는 새로고침 시 경고창 및 0점 처리
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isGameRunning) {
        e.preventDefault();
        e.returnValue =
          "정말 게임을 종료하시겠습니까? 점수는 0점으로 처리됩니다.";
        return "";
      }
    };

    const handleUnload = () => {
      if (isGameRunning && room_id) {
        console.log("게임이 종료되어 점수는 0점으로 처리됩니다.");
        sendBettingResult(0, room_id); // 게임 종료 시 0점으로 처리
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [isGameRunning, room_id]);

  // 뒤로가기 감지 추가
  useEffect(() => {
    if (!isGameRunning) return;

    // 현재 상태를 푸시해버림 → 뒤로가기 누르면 popstate 발생
    history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (isGameRunning) {
        const confirmLeave = confirm(
          "뒤로가기를 누르면 게임이 0점 처리됩니다. 정말 나가시겠습니까?"
        );
        if (!confirmLeave) {
          history.pushState(null, "", window.location.href); // 다시 푸시해서 계속 현재 페이지 유지
          return;
        } else {
          if (room_id) sendBettingResult(0, room_id); // 게임 종료 시 0점으로 처리
          window.history.back(); // 진짜 뒤로가기
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isGameRunning, room_id]);

  return (
    <div id="game-container">
      <div id="score-container">
        <h2>
          점수: <span>{score}</span>
        </h2>
      </div>
      <div id="grid-container">
        <div id="grid" ref={gridRef}></div>
        <div id="selection-box" className="hidden" ref={selectionBoxRef}></div>
        <div id="splash-screen" ref={splashRef}>
          <div className="splash-header">
            <h1 className="text-3xl font-bold text-gray-800">사과 게임</h1>
            <p className="mt-4 text-gray-600">
              시작하려면 Play 버튼을 누르세요
            </p>
          </div>
          {/* <div className="splash-content hidden">
            <button id="start-button" onClick={startGame}>
              Play
            </button>
          </div> */}
        </div>
        <div id="result-modal" className="hidden" ref={resultModalRef}>
          <div className="modal-content">
            <h1>게임 종료</h1>
            <p>
              최종 점수:{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                {score}
              </span>
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button onClick={() => router.replace("/main")}>닫기</button>
            </div>
          </div>
        </div>
      </div>
      <div id="timer-container" className="hidden" ref={timerContainerRef}>
        <div id="timer-bar-container">
          <div id="timer-bar" ref={timerBarRef}></div>
          <span id="time-remaining" ref={timeRef}></span>
        </div>
      </div>
    </div>
  );
}
