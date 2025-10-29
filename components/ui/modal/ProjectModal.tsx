'use client';

import { ProjectData } from '@/lib/data/projectData';
import BaseModal, { ModalData } from './BaseModal';

// 프로젝트 모달 props 타입 정의
interface ProjectModalProps {
  project: ProjectData | null; // 선택된 프로젝트 데이터
  isOpen: boolean; // 모달 열림/닫힘 상태
  onClose: () => void; // 모달 닫기 함수
}

// 프로젝트 데이터를 BaseModal 데이터로 변환하는 함수
const convertProjectToModalData = (project: ProjectData): ModalData => {
  // displayType에 따라 표시할 데이터와 헤더 정보 결정
  const displayType = project.displayType || 'features';
  const tableData =
    displayType === 'implementationPages' ? project.implementationPages : project.features;

  const tableHeaders =
    displayType === 'implementationPages'
      ? { first: '페이지', second: '설명' }
      : { first: '기능명', second: '설명' };

  return {
    id: project.name,
    title: project.name,
    description: project.detailedDescription,
    image: `/assets/portfolio/${project.src}`,
    imageAlt: `${project.name} 프로젝트 이미지`,
    tags: [
      ...project.techStack.map((tech) => ({
        text: tech,
        color: 'bg-blue-100 text-blue-800',
      })),
    ],
    sections: [
      {
        title: displayType === 'implementationPages' ? '구현 페이지' : '주요 기능',
        type: 'table',
        items: tableData as Array<{ name: string; description: string }>,
        icon: 'check',
        iconColor: 'text-green-500',
        tableHeaders, // 표 헤더 정보 추가
      },
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
              text: 'Live Site',
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

// 프로젝트 모달 컴포넌트
export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalData = project ? convertProjectToModalData(project) : null;

  return <BaseModal data={modalData} isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl" />;
}
