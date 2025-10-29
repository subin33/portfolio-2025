import { useLenis } from 'lenis/react';

/**
 * Lenis 스크롤 관련 함수들을 제공하는 커스텀 훅
 * @returns Lenis 시작/정지 함수들을 포함한 객체
 */
export function useLenisFunctions() {
  const lenis = useLenis();

  /**
   * Lenis 스크롤 애니메이션 시작
   */
  function startLenis(): void {
    if (lenis) {
      lenis.start();
    }
  }

  /**
   * Lenis 스크롤 애니메이션 정지
   */
  function stopLenis(): void {
    if (lenis) {
      lenis.stop();
    }
  }

  return { startLenis, stopLenis };
}
