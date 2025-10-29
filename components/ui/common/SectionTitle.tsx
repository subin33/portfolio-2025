'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { SectionFlower } from '@/components/icons';
import { cn } from '@/lib/utils/cn';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface Props {
  icon?: ReactNode;
  className?: string;
  classNames?: {
    container?: string;
    title?: string;
    icon?: string;
  };
  title: string;
}

const SectionTitle = ({ icon, title, className, classNames }: Props) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const titleElement = titleRef.current;
    const iconElement = iconRef.current;

    if (!container || !titleElement || !iconElement) return;

    // 초기 상태 설정
    gsap.set(container, { opacity: 0, y: 50 });
    gsap.set(titleElement, { opacity: 0, scale: 0.8 });
    gsap.set(iconElement, { opacity: 0, rotation: -180, scale: 0 });

    // 애니메이션 시퀀스
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(container, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(
        iconElement,
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .to(
        titleElement,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );

    // 텍스트 애니메이션
    const words = titleElement.querySelectorAll('span');
    words.forEach((word, index) => {
      gsap.fromTo(
        word,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.8 + index * 0.1,
          ease: 'power3.out',
        }
      );
    });

    return () => {
      tl.kill();
    };
  }, [title]);

  return (
    <div
      ref={containerRef}
      className={cn('flex items-center gap-6 mb-16 relative', className, classNames?.container)}
    >
      {/* 배경 장식 요소 - 다크모드 대응 */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-16 bg-gradient-to-b from-[var(--brand-primary)] to-transparent rounded-full opacity-30 dark:opacity-50"></div>

      {icon ? (
        <div ref={iconRef} className="relative z-10">
          {icon}
        </div>
      ) : (
        <div ref={iconRef} className="relative z-10">
          <SectionFlower
            width={35}
            className={cn(
              'animate-spin duration-7000 drop-shadow-lg dark:drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]',
              classNames?.icon
            )}
          />
        </div>
      )}

      <h3
        ref={titleRef}
        className={cn(
          'text-[6vw] font-medium uppercase leading-[1] relative z-10',
          classNames?.title
        )}
      >
        {title.split(' ').map((word, index) => (
          <span
            key={index}
            className={`inline-block relative ${
              index === 0
                ? 'text-black dark:text-white'
                : 'text-[var(--brand-primary)] dark:text-[var(--brand-primary-light)]'
            }`}
            style={{
              textShadow:
                index === 0
                  ? '2px 2px 4px rgba(0,0,0,0.1) dark:2px 2px 4px rgba(255,255,255,0.1)'
                  : '2px 2px 4px rgba(99,102,241,0.2) dark:2px 2px 4px rgba(129,140,248,0.3)',
            }}
          >
            {word}
            {index < title.split(' ').length - 1 && '\u00A0'}
          </span>
        ))}
      </h3>

      {/* 추가 장식 요소 - 다크모드 대응 */}
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-black to-transparent rounded-full opacity-20 dark:from-white dark:opacity-30"></div>
    </div>
  );
};

export default SectionTitle;
