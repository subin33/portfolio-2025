'use client';
import { useEffect, useRef, useCallback } from 'react';

// 섹션 추적을 위한 인터페이스
interface SectionInfo {
  id: string;
  name: string;
  element: HTMLElement;
}

// 섹션 추적 커스텀 훅
export const useSectionTracker = () => {
  const sectionsRef = useRef<SectionInfo[]>([]);
  const currentSectionRef = useRef<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 섹션들을 등록하는 함수 (useCallback으로 메모이제이션)
  const registerSections = useCallback(() => {
    if (typeof window === 'undefined') return;

    // 추적할 섹션들의 선택자와 이름 정의
    const sectionSelectors = [
      { selector: '#main', name: 'home' },
      { selector: '#about-me', name: 'about' },
      { selector: '#features', name: 'features' },
      { selector: '#portfolios', name: 'portfolios' },
      { selector: '#projects', name: 'projects' },
      { selector: '#mini-game-project', name: 'mini-game-project' },
      { selector: '#parallax-gallery', name: 'parallax' },
      { selector: '#portfolio-marquee', name: 'services' },
      { selector: '#mini-project', name: 'mini-project' },
      { selector: '#contact', name: 'contact' },
    ];

    // 섹션 요소들을 찾아서 등록
    sectionsRef.current = sectionSelectors
      .map(({ selector, name }) => {
        const element = document.querySelector(selector) as HTMLElement;
        return element ? { id: selector, name, element } : null;
      })
      .filter((section): section is SectionInfo => section !== null);

    // Intersection Observer 설정
    if (sectionsRef.current.length > 0) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              const section = sectionsRef.current.find((s) => s.element.id === sectionId);

              if (section && currentSectionRef.current !== section.name) {
                currentSectionRef.current = section.name;
                updateURLHash(section.name);
                saveCurrentSection(section.name);
              }
            }
          });
        },
        {
          threshold: 0.3, // 30% 이상 보일 때 섹션으로 인식
          rootMargin: '-10% 0px -10% 0px', // 상하 여백 조정
        }
      );

      // 각 섹션을 관찰 시작
      sectionsRef.current.forEach((section) => {
        observerRef.current?.observe(section.element);
      });
    }
  }, []);

  // URL 해시 업데이트 함수
  const updateURLHash = (sectionName: string) => {
    if (typeof window !== 'undefined') {
      const newHash = `#${sectionName}`;
      if (window.location.hash !== newHash) {
        // 브라우저 히스토리에 추가하지 않고 해시만 변경
        window.history.replaceState(null, '', newHash);
      }
    }
  };

  // 현재 섹션을 sessionStorage에 저장 (브라우저 창 닫으면 삭제됨)
  const saveCurrentSection = (sectionName: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('currentSection', sectionName);
      sessionStorage.setItem('sectionTimestamp', Date.now().toString());
    }
  };

  // 저장된 섹션 정보 가져오기
  const getSavedSection = (): string => {
    if (typeof window !== 'undefined') {
      const savedSection = sessionStorage.getItem('currentSection');
      const savedTimestamp = sessionStorage.getItem('sectionTimestamp');

      if (savedSection && savedTimestamp) {
        const timestamp = parseInt(savedTimestamp);
        const now = Date.now();

        // 30분 이내의 저장된 섹션만 유효하다고 간주
        if (now - timestamp < 30 * 60 * 1000) {
          return savedSection;
        }
      }
    }
    return 'home';
  };

  // 특정 섹션으로 스크롤하는 함수
  const scrollToSection = (sectionName: string) => {
    const section = sectionsRef.current.find((s) => s.name === sectionName);
    if (section) {
      // 네비게이션 바 높이를 고려한 오프셋 계산
      const navHeight = 80; // 대략적인 네비게이션 바 높이
      const elementPosition = section.element.offsetTop;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // URL 해시 변경 감지 및 처리
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => {
        const hash = window.location.hash.slice(1); // '#' 제거
        if (hash && hash !== currentSectionRef.current) {
          scrollToSection(hash);
        }
      };

      // 초기 해시 처리
      const initialHash = window.location.hash.slice(1);
      if (initialHash) {
        // 페이지 로드 후 약간의 지연을 두고 스크롤
        setTimeout(() => {
          scrollToSection(initialHash);
        }, 100);
      }

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  // 섹션 등록 및 관찰 시작
  useEffect(() => {
    // DOM이 완전히 로드된 후 섹션 등록
    const initializeSections = () => {
      registerSections();
    };

    if (document.readyState === 'complete') {
      initializeSections();
    } else {
      window.addEventListener('load', initializeSections);
      return () => window.removeEventListener('load', initializeSections);
    }

    // 컴포넌트 언마운트 시 observer 정리
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [registerSections]);

  return {
    currentSection: currentSectionRef.current,
    scrollToSection,
    getSavedSection,
    registerSections,
  };
};
