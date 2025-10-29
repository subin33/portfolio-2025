import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// 마우스 추적 애니메이션을 위한 커스텀 훅
export const useMouseTracking = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // DOM 요소가 존재하는지 확인
    if (!containerRef.current) return;

    // ref 값을 변수에 복사하여 클린업 함수에서 사용
    const container = containerRef.current;

    // shapes 요소들을 찾기 위한 함수
    const findShapes = () => {
      if (container) {
        const shapesContainer = container.querySelector('[data-shapes-container]');
        if (shapesContainer) {
          shapesRef.current = shapesContainer.querySelectorAll('.shape-10');
        }
      }
    };

    // 초기 shapes 찾기
    findShapes();

    // 마우스 이벤트 핸들러 함수 정의
    const handleMouseMove = (evt: MouseEvent) => {
      if (!shapesRef.current || shapesRef.current.length === 0) {
        // shapes가 없으면 다시 찾기
        findShapes();
        return;
      }

      const mouseX = evt.clientX;
      const mouseY = evt.clientY;

      // GSAP 애니메이션으로 shapes를 마우스 위치로 이동
      gsap.to(shapesRef.current, {
        x: mouseX,
        y: mouseY,
        stagger: -0.1, // 각 요소마다 약간의 지연을 두어 연속적인 움직임 효과
        duration: 0.5, // 애니메이션 지속 시간
        ease: 'power2.out', // 부드러운 감속 효과
      });
    };

    // 이벤트 리스너 추가
    container.addEventListener('mousemove', handleMouseMove);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return containerRef;
};

// 텍스트 스크롤 애니메이션을 위한 커스텀 훅
export const useTextScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // DOM 요소가 존재하는지 확인
    if (!containerRef.current || !textRef.current) return;

    // ref 값을 변수에 복사하여 클린업 함수에서 사용
    const container = containerRef.current;
    const text = textRef.current;

    // GSAP 컨텍스트 생성
    const ctx = gsap.context(() => {
      // 텍스트가 아래에서 위로 올라오는 애니메이션
      gsap.from(text, {
        scrollTrigger: {
          trigger: container,
          start: 'top 60%', // 화면의 60% 지점에서 시작
          end: 'bottom 20%', // 화면의 20% 지점에서 끝
          toggleActions: 'play none none reverse', // 스크롤 방향에 따라 재생/역재생
        },
        opacity: 0, // 투명도 0에서 시작
        yPercent: 320, // Y축으로 320% 아래에서 시작
        skewY: 30, // Y축으로 30도 기울어짐
        duration: 3, // 3초 동안 애니메이션
        ease: 'expo.out', // 지수 함수를 사용한 부드러운 감속
      });
    });

    // 클린업 함수에서 GSAP 컨텍스트 정리
    return () => ctx.revert();
  }, []);

  return { containerRef, textRef };
};
