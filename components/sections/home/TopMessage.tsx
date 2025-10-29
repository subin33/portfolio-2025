'use client';
import React from 'react';
import ParticlesContainer from '@/components/common/ParticlesContainer';
import { topParticlesData } from '@/lib/data/particlesData';
import { useMouseTracking, useTextScrollAnimation } from '@/lib/hooks/useMouseTracking';
import styles from '@/styles/particles.module.css';

// 컴포넌트 props 타입 정의
interface TopMessageProps {
  text: string;
}

export default function TopMessage({ text }: TopMessageProps) {
  // 커스텀 훅 사용
  const mouseTrackingRef = useMouseTracking();
  const { containerRef: scrollContainerRef, textRef } = useTextScrollAnimation();

  return (
    <>
      <section ref={mouseTrackingRef} data-cusrsor-color="#000" data-cursor-size="0px">
        <div className="flex flex-col relative w-screen h-screen z-[-99] md:h-[70vh] md:mb-[20vh]">
          <div className={`${styles.textContainer} dark:!mix-blend-darken`}>
            <p ref={textRef} className="w-[70%] md:w-[90%] font-heading">
              {text}
            </p>
            <ParticlesContainer particles={topParticlesData} />
          </div>
          <div ref={scrollContainerRef} className={styles.aerosolMain} data-shapes-container>
            <div className={styles.shapes}>
              <div className={`${styles.shape10} ${styles.shape1} shape-10`}></div>
              <div className={`${styles.shape10} ${styles.shape2} shape-10`}></div>
              <div className={`${styles.shape10} ${styles.shape3} shape-10`}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
