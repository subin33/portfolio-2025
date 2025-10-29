'use client';
import { useEffect, useRef, useCallback } from 'react';

// 스크롤 위치를 저장하고 복원하는 커스텀 훅
export const useScrollPosition = () => {
  const scrollPositionRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);

  // 스크롤 위치를 sessionStorage에 저장하는 함수 (브라우저 창 닫으면 삭제됨)
  const saveScrollPosition = (position: number) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollPosition', position.toString());
      sessionStorage.setItem('scrollTimestamp', Date.now().toString());
    }
  };

  // sessionStorage에서 스크롤 위치를 가져오는 함수
  const getSavedScrollPosition = (): number => {
    if (typeof window !== 'undefined') {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      const savedTimestamp = sessionStorage.getItem('scrollTimestamp');

      if (savedPosition && savedTimestamp) {
        const timestamp = parseInt(savedTimestamp);
        const now = Date.now();

        // 30분 이내의 저장된 위치만 유효하다고 간주
        if (now - timestamp < 30 * 60 * 1000) {
          return parseInt(savedPosition);
        }
      }
    }
    return 0;
  };

  // 스크롤 위치를 복원하는 함수 (useCallback으로 메모이제이션)
  const restoreScrollPosition = useCallback(() => {
    if (typeof window !== 'undefined' && !isInitializedRef.current) {
      const savedPosition = getSavedScrollPosition();

      // 페이지가 완전히 로드된 후 스크롤 위치 복원
      const restoreScroll = () => {
        // 저장된 위치가 유효한 경우에만 복원
        if (savedPosition > 0 && savedPosition < document.body.scrollHeight) {
          window.scrollTo({
            top: savedPosition,
            behavior: 'instant', // 부드러운 스크롤 대신 즉시 이동
          });
        }
        isInitializedRef.current = true;
      };

      // DOM이 완전히 로드된 후 실행
      if (document.readyState === 'complete') {
        // 약간의 지연을 두고 실행하여 모든 컴포넌트가 렌더링된 후 복원
        setTimeout(restoreScroll, 100);
      } else {
        window.addEventListener('load', () => {
          setTimeout(restoreScroll, 100);
        });
      }
    }
  }, []);

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let scrollTimeout: NodeJS.Timeout;

      const handleScroll = () => {
        const currentPosition = window.scrollY;
        scrollPositionRef.current = currentPosition;

        // 디바운싱을 사용하여 스크롤 이벤트 최적화
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          saveScrollPosition(currentPosition);
        }, 100);
      };

      // 페이지를 떠날 때 현재 스크롤 위치 저장
      const handleBeforeUnload = () => {
        saveScrollPosition(scrollPositionRef.current);
      };

      // 페이지가 숨겨질 때 스크롤 위치 저장
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          saveScrollPosition(scrollPositionRef.current);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        clearTimeout(scrollTimeout);
      };
    }
  }, []);

  // 페이지 로드 시 스크롤 위치 복원
  useEffect(() => {
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  return {
    saveScrollPosition,
    getSavedScrollPosition,
    restoreScrollPosition,
  };
};
