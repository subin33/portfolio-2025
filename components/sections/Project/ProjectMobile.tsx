'use client';
import React from 'react';
import { fadeUp } from '@/lib/animations/scroll';
import Image from 'next/image';
import { ProjectData } from '@/lib/data/projectData';
import { handleMobileNavigation } from '@/lib/responsive/media';

interface MobilePortfolioProps {
  projectData: ProjectData[];
}

interface CardProps {
  name: string;
  srcSLider: string;
  description: string;
  demoLink?: string;
  onProjectClick: (project: ProjectData) => void; // 프로젝트 클릭 핸들러
}

const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ projectData }) => {
  // GSAP 애니메이션 초기화
  fadeUp();

  const handleProjectClick = (project: ProjectData) => {
    if (project.demoLink) {
      handleMobileNavigation(project.demoLink);
    }
  };

  return (
    <div className="grid grid-cols-2 items-center gap-x-[4vw] gap-y-[14vw] justify-between w-full">
      {projectData.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          srcSLider={item.srcSLider}
          description={item.description}
          demoLink={item.demoLink}
          onProjectClick={handleProjectClick}
        />
      ))}
    </div>
  );
};

export default MobilePortfolio;

const Card: React.FC<CardProps> = ({ name, srcSLider, description, demoLink, onProjectClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 링크 동작 방지

    // ProjectData 객체 생성 (demoLink는 선택적 속성)
    const projectData: ProjectData = {
      name,
      srcSLider,
      description,
      ...(demoLink && { demoLink }), // demoLink가 있을 때만 포함
    } as ProjectData;

    onProjectClick(projectData);
  };

  return (
    <>
      <div className="h-[100vw] col-span-2 overflow-hidden rounded-3xl md:h-[60vw] md:col-span-1 fadeup">
        <button
          onClick={handleClick}
          className="w-full h-full group block cursor-pointer"
          aria-label={`${name} 프로젝트 상세 보기`}
        >
          <div className="relative h-full">
            {/* 프로젝트 이미지 - 호버 시 스케일 애니메이션 */}
            <Image
              src={srcSLider}
              fill
              priority={false}
              alt={name}
              className="w-full h-full object-cover duration-500 scale-[1.1] group-hover:scale-100"
            />

            <div className="relative z-[1] w-full h-full flex flex-col items-start justify-end gap-[2vw] p-[4vw] md:gap-[1vw] md:p-[2vw]">
              <p className="text-sm bg-white1 px-[4vw] py-[1.4vw] rounded-full opacity-0 -translate-y-full duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:text-[1.8vw] md:px-[2vw] md:py-[0.8vw]">
                {description}
              </p>

              {/* 프로젝트 제목과 화살표 아이콘 - 항상 표시 */}
              <div className="flex gap-2 items-center">
                <h4 className="text-2xl bg-white1 py-[1vw] px-[3vw] rounded-full md:text-[3vw] relative dark:text-black">
                  <span className="relative z-10">{name}</span>
                  <div className="absolute inset-0 bg-white bg-opacity-90 rounded-full border-2 border-black"></div>
                </h4>
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};
