// (game)/apple-game/appleGameLogic.ts

export const GRID_COLS = 17;
export const GRID_ROWS = 10;

// 사과 생성 함수(랜덤)
export function createGrid(
  gridElement: HTMLElement,
  gridData?: number[],
  appleClass: "apple" | "apple-green" = "apple"
) {
  if (!gridElement) return;
  gridElement.innerHTML = "";

  const totalItems = GRID_COLS * GRID_ROWS;

  const data =
    gridData ??
    Array.from({ length: totalItems }, () => Math.floor(Math.random() * 9) + 1);

  for (let i = 0; i < totalItems; i++) {
    const apple = document.createElement("div"); // 사과 하나 생성
    apple.className = appleClass; // 테마에 따른 사과 클래스 적용
    const value = data[i]; // 사과의 값 설정
    apple.textContent = value.toString(); // 사과 텍스트
    apple.dataset.value = value.toString(); // 사과 값 저장
    gridElement.appendChild(apple); // grid에 사과 추가
  }
}

// 외부에서 170개 값을 받아서 사과를 생성하는 함수
export function createGridWithValues(
  gridElement: HTMLElement,
  values: number[],
  appleClass: "apple" | "apple-green" = "apple"
) {
  if (!gridElement) return;

  const totalItems = 17 * 10; // GRID_COLS * GRID_ROWS

  if (values.length !== totalItems) {
    console.error(
      `값의 개수가 ${totalItems}개여야 합니다. 현재 ${values.length}개 입력됨`
    );
    return;
  }

  gridElement.innerHTML = ""; // 기존 내용 비우기

  for (let i = 0; i < totalItems; i++) {
    const apple = document.createElement("div"); // 사과 하나 생성
    apple.className = appleClass; // 테마에 따라 클래스 부여
    const value = values[i];
    apple.textContent = value.toString(); // 사과 텍스트
    apple.dataset.value = value.toString(); // 데이터 값 저장
    gridElement.appendChild(apple); // grid에 사과 추가
  }
}

// 드래그 박스 좌표 반환 함수
export function getSelectionBoxCoords(
  startX: number,
  startY: number,
  currentX: number,
  currentY: number
) {
  const left = Math.min(startX, currentX);
  const right = Math.max(startX, currentX);
  const top = Math.min(startY, currentY);
  const bottom = Math.max(startY, currentY);

  return { left, right, top, bottom };
}

// 선택된 사과들 찾는 함수 & 합계 반환
export function getSelectedApples(
  gridElement: HTMLElement,
  selection: { left: number; right: number; top: number; bottom: number }
) {
  const gridRect = gridElement.getBoundingClientRect();
  const apples = Array.from(
    gridElement.querySelectorAll<HTMLDivElement>(".apple, .apple-green")
  ); // 사과 요소들 가져오기 (테마별 클래스 모두)

  const adjustedSelection = {
    left: selection.left - gridRect.left,
    right: selection.right - gridRect.left,
    top: selection.top - gridRect.top,
    bottom: selection.bottom - gridRect.top,
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
}
