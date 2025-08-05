import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLenis } from 'lenis/react';

/**
 * CSS 클래스명을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 클래스명 충돌을 방지
 * @param inputs - 병합할 클래스명들
 * @returns 병합된 클래스명 문자열
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
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
