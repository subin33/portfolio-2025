'use client';

import { useEffect, useRef, useState } from 'react';
import { m, domAnimation, LazyMotion } from 'framer-motion';
import { gsap } from 'gsap';

function shuffleArray(array: string[]): string[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const preloadCursorImages = async (): Promise<void> => {
  const cursorImages = [
    '/assets/cursor-animations/welcome.gif',
    '/assets/cursor-animations/to-my.gif',
    '/assets/cursor-animations/portfolio.gif',
    '/assets/cursor-animations/portfolio.gif',
  ];

  await Promise.all(
    cursorImages.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // 실패는 무시
          img.src = src;
        })
    )
  );
};

const words: string[] = [
  '안녕하세요! 🙏',
  'Hello!',
  '¡Hola!',
  'Bonjour!',
  'สวัสดีค่ะ',
  'こんにちは!',
  '你好',
];

export default function Loader() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const barsRef = useRef<HTMLSpanElement[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);

  // 초기 설정
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    preloadCursorImages();

    const firstWord = words[0];
    setShuffledWords([firstWord, ...shuffleArray(words.slice(1))]);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    };
  }, []);

  // 단어 순환 애니메이션
  useEffect(() => {
    if (shuffledWords.length === 0) return;

    if (index < shuffledWords.length - 1) {
      const delay = index === 0 ? 1000 : 500;
      const timer = setTimeout(() => setIndex((i) => i + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(finalTimer);
    }
  }, [index, shuffledWords]);

  // GSAP 애니메이션
  useEffect(() => {
    if (!barsRef.current.length || !loaderRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .to(barsRef.current, {
          height: 0,
          duration: 0.6,
          delay: 5.3,
          ease: 'power2.in',
          stagger: 0.1,
        })
        .to(loaderRef.current, {
          y: '-150vh',
          opacity: 0,
          ease: 'power2.inOut',
          onComplete: () => {
            document.body.style.overflow = 'auto';
            document.body.style.overflowX = 'hidden';
          },
        });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      id="loader"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out"
    >
      <LazyMotion features={domAnimation}>
        {loading && (
          <m.p
            key={index}
            className="absolute z-10 px-4 text-center font-heading text-white text-5xl md:text-6xl lg:text-7xl whitespace-nowrap"
            variants={{
              initial: { opacity: 0 },
              enter: { opacity: 1, transition: { duration: 0.2, delay: 0.2 } },
              exit: { opacity: 0, transition: { duration: 0.2 } },
            }}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {shuffledWords[index] ?? ''}
          </m.p>
        )}

        <div className="flex size-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) barsRef.current[i] = el;
              }}
              className="h-full w-1/5 bg-black"
            />
          ))}
        </div>
      </LazyMotion>
    </div>
  );
}
