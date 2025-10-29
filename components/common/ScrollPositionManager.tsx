'use client';
import { useEffect } from 'react';
import { useScrollPosition } from '@/lib/hooks/useScrollPosition';
import { useSectionTracker } from '@/lib/hooks/useSectionTracker';

// 스크롤 위치와 섹션 추적을 관리하는 컴포넌트
const ScrollPositionManager: React.FC = () => {
  const { saveScrollPosition, getSavedScrollPosition } = useScrollPosition();
  const { scrollToSection, getSavedSection } = useSectionTracker();

  // 페이지 로드 시 저장된 위치와 섹션 복원
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 페이지가 완전히 로드된 후 실행
      const handleLoad = () => {
        // 저장된 섹션 정보 확인
        const savedSection = getSavedSection();
        const savedScrollPosition = getSavedScrollPosition();

        // 저장된 스크롤 위치가 있으면 해당 위치로 복원
        if (savedScrollPosition > 0 && savedScrollPosition < document.body.scrollHeight) {
          // 약간의 지연을 두고 스크롤 위치 복원
          setTimeout(() => {
            window.scrollTo({
              top: savedScrollPosition,
              behavior: 'instant',
            });
          }, 200);
        } else if (savedSection && savedSection !== 'home') {
          // 저장된 섹션이 있으면 해당 섹션으로 스크롤
          setTimeout(() => {
            scrollToSection(savedSection);
          }, 300);
        }
      };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [getSavedScrollPosition, getSavedSection, scrollToSection]);

  // 페이지를 떠날 때 현재 상태 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleBeforeUnload = () => {
        saveScrollPosition(window.scrollY);
      };

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          saveScrollPosition(window.scrollY);
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [saveScrollPosition]);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
};

export default ScrollPositionManager;
