'use client';
import { useRef } from 'react';
import Double from '@/components/sections/home/Double';
import { Media } from '@/lib/responsive/media';
import { projectData } from '@/lib/data/projectData';
import MobilePortfolio from './ProjectMobile';
import SectionTitle from '@/components/ui/common/SectionTitle';

const Projects: React.FC = () => {
  // DOM 요소에 대한 ref 타입 정의
  const container = useRef<HTMLElement>(null);

  // 모바일용 프로젝트 데이터 (처음 6개만 사용)
  const mobileProject = projectData.slice(0, 6);

  return (
    <section ref={container} id="projects" className="w-full h-full">
      <div className="w-[85%] mx-auto md:w-[80%] md:pt-[2%] md:pb-[15%]">
        <SectionTitle title="Project" />
        <Media greaterThan="tablet">
          <div>
            <Double projects={[projectData[0], projectData[1]]} />
            <Double projects={[projectData[2], projectData[3]]} reversed={true} />
            <Double projects={[projectData[4], projectData[5]]} />
          </div>
        </Media>

        <Media lessThan="desktop">
          <div className="pt-[10%] pb-[8vw]">
            <MobilePortfolio projectData={mobileProject} />
          </div>
        </Media>
      </div>
    </section>
  );
};

export default Projects;
