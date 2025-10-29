'use client';

import { MiniProjectData } from '@/lib/data/miniProjectData';
import BaseModal, { ModalData } from './BaseModal';

// 미니 프로젝트 모달 props 타입 정의
interface MiniProjectModalProps {
  project: MiniProjectData | null; // 선택된 미니 프로젝트 데이터
  isOpen: boolean; // 모달 열림/닫힘 상태
  onClose: () => void; // 모달 닫기 함수
}

// 미니 프로젝트 데이터를 BaseModal 데이터로 변환하는 함수
const convertMiniProjectToModalData = (project: MiniProjectData): ModalData => {
  return {
    id: project.slug,
    title: project.title,
    description: project.description,
    image: project.img,
    imageAlt: `${project.title} 프로젝트 이미지`,
    tags: [
      ...(project.techStack || []).map((tech) => ({
        text: tech,
        color: 'bg-blue-100 text-blue-800',
      })),
    ],
    sections: [
      ...(project.features && project.features.length > 0
        ? [
            {
              title: '주요 기능',
              type: 'table' as const,
              items: project.features,
              icon: 'check' as const,
              iconColor: 'text-green-500',
              tableHeaders: { first: '기능명', second: '설명' },
            },
          ]
        : []),
    ],
    links: [
      ...(project.githubLink && project.githubLink !== '#'
        ? [
            {
              text: 'GitHub',
              url: project.githubLink,
              icon: 'github',
              variant: 'primary' as const,
            },
          ]
        : []),
      ...(project.demoLink && project.demoLink !== '#'
        ? [
            {
              text: 'Live Demo',
              url: project.demoLink,
              icon: 'external',
              variant: 'primary' as const,
            },
          ]
        : []),
      ...(project.detailLink && project.detailLink !== '#'
        ? [
            {
              text: '상세보기',
              url: project.detailLink,
              icon: 'detail',
              variant: 'primary' as const,
            },
          ]
        : []),
    ],
  };
};

// 미니 프로젝트 모달 컴포넌트
export default function MiniProjectModal({ project, isOpen, onClose }: MiniProjectModalProps) {
  const modalData = project ? convertMiniProjectToModalData(project) : null;

  return <BaseModal data={modalData} isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl" />;
}
