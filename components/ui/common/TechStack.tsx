'use client';

import React from 'react';

// 기술 스택 태그 컴포넌트의 Props 타입 정의
interface TechStackProps {
  technologies: string[]; // 기술 스택 배열
  className?: string; // 추가 CSS 클래스
}

// 기술 스택 태그 컴포넌트
const TechStack: React.FC<TechStackProps> = ({ technologies, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
