'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import ProjectModal from '@/components/ui/modal/ProjectModal';
import { ProjectData } from '@/lib/data/projectData';
import { isMobileDevice, handleMobileNavigation } from '@/lib/responsive/media';
import TechStack from '@/components/ui/common/TechStack';

interface DoubleProps {
  projects: [ProjectData, ProjectData];
  reversed?: boolean;
}

const Double = ({ projects }: DoubleProps): React.JSX.Element => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstImage = useRef<HTMLDivElement>(null);
  const secondImage = useRef<HTMLDivElement>(null);
  const firstBody = useRef<HTMLDivElement>(null);
  const secondBody = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: ProjectData) => {
    if (isMobileDevice()) {
      if (project.detailLink) {
        handleMobileNavigation(project.detailLink);
      }
    } else {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  let requestAnimationFrameId: number | null = null;

  const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { clientX } = e;
    const xPercent = clientX / window.innerWidth;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = window.requestAnimationFrame(() => animate(xPercent));
    }
  };

  const animate = (xPercent: number): void => {
    const firstImageScale = 1.3 - 0.6 * xPercent;
    const secondImageScale = 0.7 + 0.6 * xPercent;

    if (firstImage.current && secondImage.current && firstBody.current && secondBody.current) {
      firstImage.current.style.transform = `scale(${firstImageScale})`;
      secondImage.current.style.transform = `scale(${secondImageScale})`;

      const firstBodyTranslateY = 100 - 190 * xPercent;
      firstBody.current.style.transform = `translateX(0) translateY(${firstBodyTranslateY}%)`;

      const secondBodyTranslateX = 30 - 60 * xPercent;
      const secondBodyTranslateY = -90 + 190 * xPercent;
      secondBody.current.style.transform = `translateX(${secondBodyTranslateX}%) translateY(${secondBodyTranslateY}%)`;
    }

    requestAnimationFrameId = null;
  };

  return (
    <>
      <div
        onMouseMove={manageMouseMove}
        className="flex mt-[5vw] h-[45vw] relative overflow-hidden fadeup"
      >
        {/* First Image */}
        <div className="flex-1 mx-[15px] rounded-[18px] transform-gpu transition-transform ease-out ">
          <button
            onClick={() => handleProjectClick(projects[0])}
            className="w-full h-full cursor-pointer"
            aria-label={`${projects[0].name} 프로젝트 상세 보기`}
          >
            <div
              ref={firstImage}
              className="relative rounded-[24px] overflow-hidden h-[25vw] mb-[10px] transition-transform duration-500 ease-out"
              style={{ transformOrigin: 'left top', transform: 'scale(1.3)' }}
            >
              <Image
                data-cursor-size="100px"
                data-cursor-text="View Details"
                data-cursor-color="var(--brand-primary)"
                src={`/assets/portfolio/${projects[0].src}`}
                width={800}
                height={600}
                priority={false}
                quality={90}
                alt="project image"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              ref={firstBody}
              className="text-left text-[16px] p-[10px] w-full transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: 'translateY(100%)' }}
            >
              <p className="text-[1.7vw] mb-[5px] mt-0 font-medium font-['CLashDisplay'] text-black">
                {projects[0].name}
              </p>
              <div className="mt-2">
                <TechStack technologies={projects[0].techStack} />
              </div>
            </div>
          </button>
        </div>

        {/* Second Image */}
        <div className="flex-1 mx-[15px] rounded-[18px] transform-gpu transition-transform ease-out">
          <button
            onClick={() => handleProjectClick(projects[1])}
            className="w-full h-full cursor-pointer"
            aria-label={`${projects[1].name} 프로젝트 상세 보기`}
          >
            <div
              ref={secondImage}
              className="relative rounded-[24px] overflow-hidden h-[25vw] transition-transform duration-500 ease-out"
              style={{ transformOrigin: 'right top', transform: 'scale(0.7)' }}
            >
              <Image
                data-cursor-size="100px"
                data-cursor-text="View Details"
                data-cursor-color="var(--brand-primary)"
                src={`/assets/portfolio/${projects[1].src}`}
                width={800}
                height={600}
                priority={false}
                quality={90}
                alt="project image"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              ref={secondBody}
              className="text-left text-[16px] p-[10px] w-full transition-transform duration-500 ease-out will-change-transform"
              style={{ transform: 'translate(30%, -90%)' }}
            >
              <p className="text-[1.7vw] mb-[5px] mt-0 font-medium font-['CLashDisplay'] text-black">
                {projects[1].name}
              </p>
              <div className="mt-2">
                <TechStack technologies={projects[1].techStack} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 프로젝트 모달 (데스크톱에서만 사용) */}
      {!isMobileDevice() && (
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Double;
