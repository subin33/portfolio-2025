'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { SplitInLineOnly } from '@/lib/utils/splitText';
import { fadeUp } from '@/lib/animations/scroll';
import SectionTitle from '@/components/ui/common/SectionTitle';
import { miniGameData, MiniGameData } from '@/lib/data/miniGameData';
import Button from '@/components/ui/button/Button';
import TechStack from '@/components/ui/common/TechStack';
import LazyGif from '@/components/ui/common/LazyGif';

interface CardProps {
  webpSrc: string;
  poster?: string;
  title: string;
  id: string;
  description: string;
  dataSpeed?: number;
  className?: string;
  project: MiniGameData;
}

gsap.registerPlugin(ScrollTrigger);

const GifSection: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  fadeUp();

  // Text Fill Animation on Scroll
  useEffect(() => {
    if (!textRef.current) return;

    SplitInLineOnly(textRef.current);
    const text = textRef.current.querySelectorAll('.line');
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(text, {
        scrollTrigger: {
          trigger: textRef.current,
          scrub: 0.9,
          start: 'top 70%',
          end: 'bottom 30%',
        },
        backgroundPositionX: '0%',
        stagger: 1,
        duration: 1,
      });
    });
    return () => ctx.revert();
  });

  return (
    <>
      <section className="h-full w-full" id="mini-game-project">
        <div className="w-[80%] py-[20%] mx-auto md:w-[90%] md:pt-[2%] md:pb-[15%]">
          <div className="text-center text-[6vw] font-medium font-heading w-[100%] mx-auto md:text-[5.5vw] md:w-[90%] lg:text-[3vw] min-h-[40vh] md:min-h-[30vh] lg:min-h-[25vh] flex flex-col justify-center">
            <SectionTitle title="Mini Game" />

            <p ref={textRef} className="text-fill kerning-none leading-tight">
              Good code is never finished. I iterate, test, and polish—{' '}
              <span className="hidden md:inline text-[5vw] text-white dark:text-black lg:text-[2.5vw] drop-shadow-lg dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
                💻{' '}
              </span>
              <br />
              striving for better with every version.{' '}
              <span className="hidden md:inline text-[5vw] text-white dark:text-black lg:text-[2.5vw] drop-shadow-lg dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]">
                🚀 ✨
              </span>
            </p>
          </div>
          <div className="block space-y-[10%] pt-[15%] md:grid md:grid-cols-2 md:justify-items-center md:gap-[10vw] md:pt-[10%] lg:gap-y-[5vw]">
            {miniGameData.map((item, index) => (
              <Card
                className={`${index === 2 ? 'col-span-2' : 'col-span-1'}`}
                key={index}
                id={item.id}
                title={item.title}
                description={item.description}
                webpSrc={item.videoSrc}
                poster={item.poster}
                dataSpeed={item.dataSpeed}
                project={item}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GifSection;

const Card: React.FC<CardProps> = ({
  webpSrc,
  poster,
  title,
  id,
  description,
  dataSpeed,
  className = '',
  project,
}) => {
  // 모바일에서 카드 클릭 시 demoLink로 이동하는 함수
  const handleCardClick = () => {
    // 모바일에서만 실행 (md 브레이크포인트 미만)
    if (window.innerWidth < 768 && project.demoLink && project.demoLink !== '#') {
      window.open(project.demoLink, '_blank');
    }
  };

  return (
    <>
      <div
        className={`w-full h-[90vw] relative group overflow-hidden md:w-[40vw] md:h-[40vw] lg:w-[24vw] lg:h-[24vw] fadeup ${className} cursor-pointer md:cursor-default`}
        data-speed={dataSpeed}
        onClick={handleCardClick}
      >
        {/* LazyGif 컴포넌트를 사용하여 GIF 애니메이션 표시 */}
        <LazyGif
          videoSrc={webpSrc}
          poster={poster}
          className="h-full w-full object-cover absolute top-0 left-0 brightness-90"
          style={{ aspectRatio: '1/1' }}
        />
        <div className="relative top-0 left-0 h-full w-full z-[1] p-[4vw] flex flex-col justify-between md:p-[2vw] lg:p-[1vw]">
          {/* 이미지에 명시적 크기 지정으로 CLS 방지 */}
          <Image
            className="ml-auto w-[30px] h-[30px] md:w-[2vw] md:h-[2vw] lg:w-[1.5vw] lg:h-[1.5vw]"
            src="/assets/about/gif/arrow.png"
            width={30}
            height={30}
            priority={false}
            alt="arrow icon"
            style={{ minWidth: '30px', minHeight: '30px' }}
          />
          {/* 제목은 중앙에, id는 아래쪽에 배치 */}
          <div className="flex-1 flex flex-col justify-center">
            <h3
              className="text-zinc-50 font-heading text-[10vw] mx-auto md:text-[5vw] lg:text-[3vw] font-bold leading-tight"
              style={{
                textShadow: '0px 0px 2px rgba(0,0,0,0.7), -1px 0px 2px rgba(0,0,0,0.7)',
                minHeight: '1.2em',
              }}
            >
              {title}
            </h3>
          </div>
          {/* id 텍스트를 아래쪽에 배치 */}
          <p className="stroke text-[8vw] text-white1 dark:text-black1 leading-[1] font-heading md:text-[8vw] lg:text-[3vw] mt-auto">
            {id}
          </p>
        </div>
        {/* 호버 오버레이에 고정 크기 설정으로 CLS 방지 */}
        <div className="absolute p-[1vw] bg-white z-[2] top-0 left-0 bottom-0 right-0 flex flex-col justify-between translate-x-full transition-transform duration-1000 ease-in-out group-hover:translate-x-0 w-full h-full">
          <div className="flex-1 flex flex-col justify-start">
            {/* 기술 스택 표시 */}
            <TechStack technologies={project.techStack} className="mb-3" />
            <p className="text-lg font-medium leading-[1.7] text-black md:text-[0.95vw] mb-4 flex-1">
              {description}
            </p>
          </div>

          <div className="flex flex-row gap-1 font-bold mt-auto">
            {/* GitHub 버튼 */}
            {project.githubLink && project.githubLink !== '#' && (
              <Button
                text="GitHub"
                url={project.githubLink}
                icon="github"
                variant="primary"
                className="text-xs md:text-[0.95vw] flex-1 py-3"
              />
            )}

            {project.demoLink && project.demoLink !== '#' && (
              <Button
                text="Live Site"
                url={project.demoLink}
                icon="external"
                variant="primary"
                className="text-xs md:text-[0.9vw] flex-1 py-3"
              />
            )}

            {project.detailLink && project.detailLink !== '#' && (
              <Button
                text="상세보기"
                url={project.detailLink}
                icon="detail"
                variant="primary"
                className="text-xs md:text-[0.9vw] flex-1 py-3"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
