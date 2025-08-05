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
    const internalDiv = document.createElement('div');
    internalDiv.className = 'line-internal';
    internalDiv.innerHTML = line.innerHTML;
    line.innerHTML = '';
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
