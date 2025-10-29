import React from 'react';
import Image from 'next/image';
import { MiniProjectData } from '@/lib/data/miniProjectData';

// 미니 프로젝트 카드 props 타입 정의
interface MiniProjectCardProps {
  project: MiniProjectData; // 미니 프로젝트 데이터
  onOpenModal: (project: MiniProjectData) => void; // 모달 열기 함수
}

const MiniProjectCard: React.FC<MiniProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <div className="h-full block w-full relative group fadeup">
      <div
        className="relative h-[100vw] w-full overflow-hidden md:h-[55vw] lg:h-[60vh] cursor-pointer md:cursor-default"
        onClick={() => onOpenModal(project)}
      >
        <Image
          priority={false}
          quality={90}
          src={project.img}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-105 duration-500"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지
              onOpenModal(project);
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer"
            aria-label={`${project.title} 프로젝트 상세보기`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
              />
            </svg>
          </button>
        </div>
      </div>

      <h5 className="text-[4.5vw] font-heading mt-[1vw] font-medium px-2 md:text-[2.5vw] lg:text-[1.4vw]">
        {project.title}
      </h5>
    </div>
  );
};

export default MiniProjectCard;
