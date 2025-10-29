'use client';

import { useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button/Button';

// 모달 데이터 타입 정의
export interface ModalData {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  imageAlt?: string;
  tags?: Array<{ text: string; color: string }>;
  sections?: Array<{
    title: string;
    type: 'list' | 'text' | 'grid' | 'table';
    items: string[] | Array<{ name: string; description: string }>;
    icon?: 'check' | 'star' | 'arrow';
    iconColor?: string;
    tableHeaders?: { first: string; second: string }; // 표 헤더 정보 추가
  }>;
  links?: Array<{
    text: string;
    url: string;
    icon?: string;
    variant?: 'primary' | 'secondary';
  }>;
}

// 기본 모달 props 타입 정의
interface BaseModalProps {
  data: ModalData | null; // 모달 데이터
  isOpen: boolean; // 모달 열림/닫힘 상태
  onClose: () => void; // 모달 닫기 함수
  maxWidth?: string; // 최대 너비 (기본값: max-w-4xl)
}

// 기본 모달 컴포넌트 (최적화)
const BaseModal = memo(function BaseModal({
  data,
  isOpen,
  onClose,
  maxWidth = 'max-w-4xl',
}: BaseModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null); // 오버레이 참조
  const scrollPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 }); // 스크롤 위치 저장

  // ESC 키 핸들러 최적화
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // 배경 클릭 시 모달 닫기 (최적화)
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  // 아이콘 렌더링 함수 (최적화)
  const renderIcon = useCallback((type: string, color: string = 'text-blue-500') => {
    switch (type) {
      case 'check':
        return (
          <svg className={`mr-3 h-5 w-5 ${color}`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'star':
        return (
          <svg className={`mr-3 h-5 w-5 ${color}`} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'arrow':
        return (
          <svg
            className={`mr-3 h-5 w-5 ${color}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
      default:
        return null;
    }
  }, []);

  // 모달 열기/닫기 효과 최적화
  useEffect(() => {
    // 모달이 열렸을 때 스크롤 방지 (모든 디바이스에서 작동)
    if (isOpen) {
      // 현재 스크롤 위치 저장
      scrollPositionRef.current = {
        x: window.scrollX,
        y: window.scrollY,
      };

      // 스크롤 방지 - 더 강력한 방식
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current.y}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';

      // ESC 키 이벤트 리스너 추가
      document.addEventListener('keydown', handleEscape);

      // 터치 스크롤 방지 (모바일)
      document.body.style.touchAction = 'none';
    }

    return () => {
      // 모달이 닫힐 때 스크롤 복원
      if (isOpen) {
        // 스크롤 복원
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.touchAction = '';

        // 저장된 스크롤 위치로 복원
        if (scrollPositionRef.current.y > 0) {
          window.scrollTo(0, scrollPositionRef.current.y);
        }
      }

      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  // 조건부 렌더링 - 모든 Hooks 호출 후에 배치
  if (!isOpen || !data) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      style={{
        zIndex: 999999,
        touchAction: 'none', // 터치 스크롤 방지
        overscrollBehavior: 'none', // 오버스크롤 방지
      }}
    >
      {/* 모달 컨테이너 */}
      <div
        className={`relative mx-4 max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700`}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 dark:bg-gray-800/80 p-2 text-gray-600 dark:text-gray-300 transition-colors hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          aria-label="모달 닫기"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 모달 내용 */}
        <div className="p-6">
          {/* 헤더 */}
          <div className="mb-6">
            <h2 id="modal-title" className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="mb-4 text-xl text-gray-600 dark:text-gray-300 italic">
                {data.subtitle}
              </p>
            )}
            {data.tags && (
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {data.tags.map((tag, index) => (
                  <span key={index} className={`rounded-full px-3 py-1 ${tag.color}`}>
                    {tag.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 이미지와 설명 */}
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 이미지 */}
            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={data.image}
                alt={data.imageAlt || `${data.title} 이미지`}
                fill
                priority={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.description}</p>
            </div>
          </div>

          {/* 섹션들 */}
          {data.sections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>

              {section.type === 'list' && (
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      {renderIcon(section.icon || 'check', section.iconColor)}
                      {typeof item === 'string' ? item : item.name}
                    </li>
                  ))}
                </ul>
              )}

              {section.type === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      {renderIcon(section.icon || 'check', section.iconColor)}
                      {typeof item === 'string' ? item : item.name}
                    </div>
                  ))}
                </div>
              )}

              {section.type === 'text' && (
                <p className="text-gray-700 dark:text-gray-300">
                  {typeof section.items[0] === 'string' ? section.items[0] : section.items[0].name}
                </p>
              )}

              {section.type === 'table' && section.items && section.items.length > 0 && (
                <div>
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                          {section.tableHeaders?.first || '기능명'}
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                          {section.tableHeaders?.second || '설명'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, itemIndex) => {
                        const featureName =
                          typeof item === 'string' ? `기능 ${itemIndex + 1}` : item.name;
                        const featureDescription =
                          typeof item === 'string' ? item : item.description;

                        // 설명에 \n이 포함되어 있는지 확인하고 리스트로 변환
                        const descriptionItems = featureDescription.includes('\n')
                          ? featureDescription.split('\n').filter((item) => item.trim() !== '')
                          : null;

                        return (
                          <tr key={itemIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
                              {featureName}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                              {descriptionItems ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {descriptionItems.map((desc, descIndex) => (
                                    <li key={descIndex} className="text-sm">
                                      {desc.trim()}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                featureDescription
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {/* 링크 버튼들 */}
          {data.links && data.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {data.links.map((link, index) => (
                <Button
                  key={index}
                  text={link.text}
                  url={link.url}
                  icon={link.icon as 'github' | 'external' | 'detail'}
                  variant={link.variant}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default BaseModal;
