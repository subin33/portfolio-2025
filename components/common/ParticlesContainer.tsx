'use client';
import React from 'react';
import { useParticles } from '@/lib/hooks/useParticles';
import { ParticleItem } from '@/lib/data/particlesData';
import styles from '@/styles/particles.module.css';

// 파티클 컨테이너 컴포넌트 props 타입 정의
interface ParticlesContainerProps {
  particles: ParticleItem[];
  itemsSelector?: string;
  className?: string;
}

/**
 * 재사용 가능한 파티클 컨테이너 컴포넌트
 * @param particles - 파티클 데이터 배열
 * @param itemsSelector - 파티클 아이템 선택자 (기본값: '.cb-particles-item')
 * @param className - 추가 CSS 클래스
 */

export default function ParticlesContainer({
  particles,
  itemsSelector = '.cb-particles-item',
  className = '',
}: ParticlesContainerProps): React.JSX.Element {
  const containerRef = useParticles({
    itemsSelector,
  });

  return (
    <section className={className}>
      <div ref={containerRef}>
        {particles.map((particle, index) => (
          <span
            key={`${particle.content}-${index}`}
            className={`${styles.cbParticlesItem} ${styles._s4} ${
              styles[particle.variant]
            } cb-particles-item`}
          >
            {particle.content}
          </span>
        ))}
      </div>
    </section>
  );
}
