'use client';
import React, { useState } from 'react';
import MiniProjectCard from './MiniProjectCard';
import MiniProjectModal from '@/components/ui/modal/MiniProjectModal';

import { fadeUp } from '@/lib/animations/scroll';
import SectionTitle from '@/components/ui/common/SectionTitle';
import { MiniProjectData, miniProjectData } from '@/lib/data/miniProjectData';
import { isMobileDevice } from '@/lib/responsive/media';

// MiniProjects 컴포넌트 props 타입 정의
interface MiniProjectsProps {
  miniProjects?: MiniProjectData[];
}

const MiniProjects = ({ miniProjects = miniProjectData }: MiniProjectsProps) => {
  // 모달 상태 관리
  const [selectedProject, setSelectedProject] = useState<MiniProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fadeUp 애니메이션 실행
  fadeUp();

  // 프로젝트 클릭 시 처리
  const handleProjectClick = (project: MiniProjectData) => {
    // 모바일에서는 demoLink로 이동, 데스크톱에서는 모달 열기
    if (isMobileDevice()) {
      // 모바일에서는 demoLink가 있으면 해당 링크로 이동
      if (project.demoLink && project.demoLink !== '#') {
        window.open(project.demoLink, '_blank');
      }
    } else {
      // 데스크톱에서는 모달 열기
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section id="mini-project" className="w-full h-full">
        <div className="py-[20%] w-[85%] mx-auto md:pt-[2%] md:pb-[7%]">
          <SectionTitle title="Mini Project" />
          <div className="grid grid-cols-1 gap-x-[3vw] gap-y-[8vw] mt-[10vw] md:grid-cols-2 md:mt-[8vw] lg:grid-cols-3 lg:mt-[4vw]">
            {miniProjects.map((project, index) => (
              <MiniProjectCard key={index} project={project} onOpenModal={handleProjectClick} />
            ))}
          </div>
        </div>
      </section>

      {/* 미니 프로젝트 모달 (데스크톱에서만 사용) */}
      {!isMobileDevice() && (
        <MiniProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default MiniProjects;
