'use client';

import { createMedia } from '@artsy/fresnel';

// 미디어 설정 객체 생성
const AppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },
});

// 미디어 스타일 생성
const mediaStyles = AppMedia.createMediaStyle();

// 미디어 컴포넌트와 컨텍스트 프로바이더 추출
const { Media, MediaContextProvider } = AppMedia;

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // 화면 너비가 768px 이하이거나 터치 지원 기기인 경우 모바일로 간주
  return window.innerWidth <= 768 || 'ontouchstart' in window;
}

/**
 * 모바일에서 모달 대신 URL로 이동하는 함수
 * @param url - 이동할 URL
 */
export function handleMobileNavigation(url: string): void {
  if (isMobileDevice()) {
    // 모바일에서는 새 탭에서 열기
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// 타입 안전성을 위한 export
export { Media, MediaContextProvider, mediaStyles };
