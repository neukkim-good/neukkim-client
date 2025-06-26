// apple-game/page.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "./style.css"; // Import your CSS styles
import { sendGameResult } from "@/services/applegame-service";

export default function AppleGame() {
  const GRID_COLS = 17;
  const GRID_ROWS = 10;
  // const TOTAL_TIME = 120;
  const TOTAL_TIME = 10; // 디버깅을 위해 10초로 설정

  const [score, setScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
  const [isDragging, setIsDragging] = useState(false);

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
  const dragCurrentRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  }); // 드래그 중 좌표 저장

  // 게임이 시작하면 사과들을 랜덤하게 생성
  const createGrid = () => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.innerHTML = ""; // 이전 grid 내용 제거

    for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
      const apple = document.createElement("div"); // 사과 하나 생성
      apple.className = "apple"; //  나중에 css에서 사과 스타일링을 위해 apple 클래스 추가
      const value = Math.floor(Math.random() * 9) + 1; // 1부터 9까지의 랜덤 값 생성
      apple.textContent = value.toString(); // 사과 텍스트
      apple.dataset.value = value.toString(); // 사과 값
      grid.appendChild(apple); // grid에 사과 추가
    }
  };

  // 타이머 시작 함수
  const startTimer = () => {
    setRemainingTime(TOTAL_TIME);
    if (timerBarRef.current) timerBarRef.current.style.width = "100%"; // 타이머 바 초기화
    if (timeRef.current) timeRef.current.textContent = TOTAL_TIME.toString();

    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        const next = prev - 1; // 남은 시간 감소
        if (timeRef.current) timeRef.current.textContent = next.toString(); // 남은 시간 업데이트
        if (timerBarRef.current)
          timerBarRef.current.style.width = `${(next / TOTAL_TIME) * 100}%`; // 타이머 바 업데이트
        if (next <= 0 && timerRef.current) {
          // 시간이 다 되면
          clearInterval(timerRef.current); // 타이머 정지하고
          endGame(); // 게임 종료 함수 호출
        }
        return next;
      });
    }, 1000); // 1초마다 업데이트
  };

  // 게임 시작 함수
  const startGame = () => {
    setScore(0);
    setIsGameRunning(true);
    createGrid();
    splashRef.current?.classList.add("hidden"); // 스플래쉬 화면 숨기기
    timerContainerRef.current?.classList.remove("hidden"); // 타이머 컨테이너 보이기
    startTimer();
  };

  // 게임 종료 함수
  const endGame = useCallback(() => {
    setIsGameRunning(false);
    resultModalRef.current?.classList.remove("hidden"); // 결과 띄우기
    console.log("서버에 보낼 점수: ", scoreRef.current);
    sendGameResult(scoreRef.current); // 게임 결과 서버에 전송
  }, []);

  // 게임 다시 시작 함수
  const restartGame = () => {
    setScore(0);
    setIsGameRunning(true);
    createGrid();
    resultModalRef.current?.classList.add("hidden"); // 결과 모달 숨기기
    timerContainerRef.current?.classList.remove("hidden"); // 타이머 컨테이너 보이기
    startTimer();
  };

  // 드래그했을 때 드래그 박스의 좌표 반환
  const getSelectionBox = () => {
    const { x: startX, y: startY } = dragStartRef.current;
    const { x: currentX, y: currentY } = dragCurrentRef.current;

    const left = Math.min(startX, currentX);
    const right = Math.max(startX, currentX);
    const top = Math.min(startY, currentY);
    const bottom = Math.max(startY, currentY);

    return { left, right, top, bottom };
  };

  // 선택된 사과들 찾기 & 합계 반환
  const getSelectedApples = () => {
    const grid = gridRef.current;
    if (!grid) return { sum: 0, selectedApples: [] };

    const gridRect = grid.getBoundingClientRect();
    const apples = Array.from(grid.querySelectorAll<HTMLDivElement>(".apple")); // 사과 요소들 가져오기
    const selectionBox = getSelectionBox(); // 드래그 박스 좌표 가져오기
    const adjustedSelection = {
      left: selectionBox.left - gridRect.left,
      right: selectionBox.right - gridRect.left,
      top: selectionBox.top - gridRect.top,
      bottom: selectionBox.bottom - gridRect.top,
    };

    let sum = 0; // 선택된 사과들의 값 합계 초기화
    const selectedApples: HTMLDivElement[] = []; // 선택된 사과들 DOM 모으는 배열 초기화

    apples.forEach((apple) => {
      const appleRect = apple.getBoundingClientRect();
      const centerX = appleRect.left - gridRect.left + appleRect.width / 2; // 사과의 중앙 X 좌표
      const centerY = appleRect.top - gridRect.top + appleRect.height / 2; // 사과의 중앙 Y 좌표

      // 사과의 중앙 좌표가 드래그 박스 안에 있는지 확인
      const isSelected =
        centerX >= adjustedSelection.left &&
        centerX <= adjustedSelection.right &&
        centerY >= adjustedSelection.top &&
        centerY <= adjustedSelection.bottom;

      if (isSelected) {
        sum += parseInt(apple.dataset.value || "0"); // 사과의 값을 합산
        selectedApples.push(apple);
      }
    });

    return { sum, selectedApples };
  };

  // 드래그 박스 CSS 스타일 업데이트
  const updateSelectionBoxStyle = () => {
    const box = selectionBoxRef.current; // 드래그 박스 DOM 요소 가져오기

    const grid = gridRef.current; // 사과판 DOM 요소 가져오기
    if (!box || !grid) return; // 드래그박스나 사과판이 없으면 아무것도 하지 않음

    // grid(사과판)의 위치, 크기, 화면 좌표 등의 정보 가져옴
    // 드래그 박스 위치를 사과판에 맞춰서 설정하기 위해 필요
    const gridRect = grid.getBoundingClientRect();
    const sel = getSelectionBox(); // 현재 드래그한 박스 좌표 가져오기

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
      dragCurrentRef.current = { x: e.clientX, y: e.clientY }; // 드래그 중 좌표 저장(이제 바뀔거임, 초기값은 드래그 시작 좌표)

      // 화면을 그릴 타이밍에 박스 위치 정보 업데이트해서 프레임 드랍 없이 자연스럽게 드래그 박스 보이게 함.
      requestAnimationFrame(() => {
        selectionBoxRef.current?.classList.remove("hidden"); // 드래그 박스 보이기
        updateSelectionBoxStyle(); // 드래그 박스 스타일 업데이트
      });
    },
    // isGameRunning이 바뀔 때마다 handleMouseDown 함수가 새로 생성됨.
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

      const apples = Array.from(
        grid.querySelectorAll<HTMLDivElement>(".apple")
      ); // 사과 요소들 가져오기
      const { sum, selectedApples } = getSelectedApples(); // 선택된 사과들의 합과 DOM 요소들 가져오기

      apples.forEach((apple) => {
        apple.classList.remove("selected-apple"); // 전체 스타일 제거 후
      });
      selectedApples.forEach((apple) => {
        apple.classList.add("selected-apple"); // 선택된 사과만 스타일 적용
      });

      // 선택된 사과의 합이 10이면 초록색 테두리, 아니면 빨간색 테두리
      if (selectionBoxRef.current)
        selectionBoxRef.current.style.borderColor =
          sum === 10 ? "green" : "red";
    },
    // isDragging이 바뀔 때마다 handleMouseMove 함수가 새로 생성됨.
    [isDragging]
  );

  // 드래그 종료
  const handleMouseUp = useCallback(() => {
    setIsDragging(false); // 드래그 중이 아님을 업데이트
    selectionBoxRef.current?.classList.add("hidden"); // 드래그 박스 없애기

    const { sum, selectedApples } = getSelectedApples(); // 선택된 사과들의 합과 DOM 요소들 가져오기

    if (sum === 10 && selectedApples.length > 0) {
      // 선택된 사과들의 합이 10이면
      selectedApples.forEach((apple) => {
        const randomX = Math.floor(Math.random() * 200 - 100); // -100px ~ +100px
        apple.style.setProperty("--random-x", `${randomX}px`);
        apple.classList.add("pop"); // pop 클래스 추가 -> 터지는 애니메이션 효과

        apple.addEventListener(
          "animationend", // 오타 수정 완료
          () => {
            apple.classList.remove("apple", "pop"); // 애니메이션 끝나면 pop 클래스 제거
            apple.classList.add("empty"); // 빈 사과 표시
            apple.textContent = ""; // 사과 내용 비우기
            apple.dataset.value = "0"; // 사과 값 0으로 초기화
          },
          { once: true } // 이벤트 한 번만 실행
        );
      });
      setScore((prev) => prev + selectedApples.length); // 점수 업데이트
    }

    const grid = gridRef.current;
    if (!grid) return;
    const apples = Array.from(grid.querySelectorAll<HTMLDivElement>(".apple"));
    apples.forEach((apple) => apple.classList.remove("selected-apple"));
  }, []);

  // 마운트 시 이벤트 리스너 등록
  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return; // grid가 없으면(아직 렌더링되지 않았으면) 아무것도 하지 않음
    grid.addEventListener("mousedown", handleMouseDown); // 마우스를 누르면 handleMouseDown 함수 호출
    grid.addEventListener("mousemove", handleMouseMove); // 마우스를 움직이면 handleMouseMove 함수 호출
    grid.addEventListener("mouseup", handleMouseUp); // 마우스를 떼면 handleMouseUp 함수 호출
    grid.addEventListener("mouseLeave", handleMouseUp); // 마우스가 grid를 벗어나면 handleMouseUp 함수 호출

    // cleanup 함수: 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      grid.removeEventListener("mousedown", handleMouseDown);
      grid.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseup", handleMouseUp);
      grid.removeEventListener("mouseLeave", handleMouseUp);
    };
    // 이 함수들은 useCallback으로 감싸져 있는 상태 -> 함수가 변하지 않는 한 마운트 시에 한 번만 리스너 등록
    // useCallback을 사용하지 않으면 새로 그릴 때마다 함수가 매번 새로 생성되어 리스너가 계속 추가되는 문제가 발생할 수 있음
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

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
            <h1>사과 게임</h1>
            <p>시작하려면 Play 버튼을 누르세요</p>
          </div>

          <div className="splash-content">
            <button id="start-button" onClick={startGame}>
              Play
            </button>
          </div>
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
              <button
                onClick={() => resultModalRef.current?.classList.add("hidden")}
              >
                닫기
              </button>
              <button onClick={restartGame}>다시하기</button>
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
