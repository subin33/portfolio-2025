import SplitType, { TargetElement } from 'split-type';

// SplitType 인스턴스의 타입 정의 - 실제 라이브러리 타입과 일치하도록 수정
interface SplitTypeInstance {
  lines?: HTMLElement[] | null;
  words?: HTMLElement[] | null;
  chars?: HTMLElement[] | null;
}

// ... existing code ...
export function SplitInLineOnly(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;
  return new SplitType(element, {
    types: 'lines',
  });
}

export function SplitInLine(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;

  // 텍스트를 라인으로 분할
  const splitInstance = new SplitType(element, {
    types: 'lines',
  });

  // 각 라인 내부에 'line-internal' 클래스명을 가진 추가 div 생성
  splitInstance.lines?.forEach((line) => {
    // 기존 자식 노드를 안전하게 새 div로 옮겨 담는다
    const internalDiv = document.createElement('div');
    internalDiv.className = 'line-internal';

    // innerHTML 복사 대신 실제 노드를 이동하여 XSS 및 이벤트 손실 위험 최소화
    const existingChildren = Array.from(line.childNodes);
    existingChildren.forEach((child) => {
      // 노드가 존재할 때만 이동
      if (child) {
        internalDiv.appendChild(child);
      }
    });

    // 라인을 비우고 안전하게 내부 div를 추가
    while (line.firstChild) {
      line.removeChild(line.firstChild);
    }
    line.appendChild(internalDiv);
  });

  return splitInstance;
}

export function SplitInLineWordChar(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;
  return new SplitType(element, {
    types: 'lines,words,chars',
  });
}

export function SplitInLineWord(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;
  return new SplitType(element, {
    types: 'lines,words',
  });
}

export function SplitInChar(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;
  return new SplitType(element, {
    types: 'chars',
  });
}

export function SplitInWordChar(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;
  return new SplitType(element, {
    types: 'words,chars',
  });
}

export function SplitInWord(element: TargetElement): SplitTypeInstance | null {
  if (!element) return null;
  return new SplitType(element, {
    types: 'words',
  });
}
