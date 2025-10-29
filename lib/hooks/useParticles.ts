import { useEffect, useRef } from 'react';
import { Particles, ParticlesOptions } from '@/lib/animations/particles';

/**
 * 파티클 애니메이션을 쉽게 사용할 수 있는 커스텀 훅
 * @param options - 파티클 옵션
 * @returns 컨테이너 ref
 */
export const useParticles = (options: Omit<ParticlesOptions, 'container'>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 파티클 인스턴스 생성
    const particles = new Particles({
      ...options,
      container: containerRef.current,
    });

    // 컴포넌트 언마운트 시 파티클 정리
    return () => {
      particles.destroy();
    };
  }, [options]);

  return containerRef;
};
