'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SectionTitle from '@/components/ui/common/SectionTitle';
import { PortfolioData, PortfolioData as PortfolioDataType } from '@/lib/data/portfolioData';
import Image from 'next/image';

// Swiper CSS import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Portfolio Mobile 카드 컴포넌트
const PortfolioCard: React.FC<PortfolioDataType> = ({
  title,
  image,
  imageAlt,
  description,
  demoLink,
}) => {
  // 이미지 클릭 핸들러
  const handleImageClick = () => {
    if (demoLink) {
      window.open(demoLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6  sm:p-8 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-3xl">
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
      </div>

      <div className="mb-6 flex justify-center">
        <div
          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
          onClick={handleImageClick}
          title={demoLink ? 'Click to view demo' : ''}
        >
          <Image
            src={image}
            alt={imageAlt}
            width={160}
            height={160}
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
            priority
          />
        </div>
      </div>

      {/* 카드 콘텐츠 */}
      <div className="space-y-4 mb-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const PortfoliosMobile: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // portfolioData.ts에서 데이터 불러오기
  const portfolioData = PortfolioData;

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-[85%] mx-auto">
        {/* 섹션 헤더 */}
        <div className="mb-12">
          <SectionTitle title="Portfolio" />
        </div>

        {/* Swiper 컨테이너 */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: false,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            className="portfolio-swiper"
            speed={400}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }}
          >
            {portfolioData.map((portfolio) => (
              <SwiperSlide key={portfolio.id} className="pb-12">
                <PortfolioCard {...portfolio} />
              </SwiperSlide>
            ))}

            {/* 네비게이션 버튼 */}
            <div className="swiper-button-prev !text-gray-400 dark:!text-gray-500 hover:!text-gray-600 dark:hover:!text-gray-300 transition-colors duration-200"></div>
            <div className="swiper-button-next !text-gray-400 dark:!text-gray-500 hover:!text-gray-600 dark:hover:!text-gray-300 transition-colors duration-200"></div>
          </Swiper>
        </div>
      </div>

      {/* 다크모드용 Swiper 스타일 오버라이드 */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #9ca3af !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background: var(--brand-primary) !important;
          opacity: 1;
        }

        .dark .swiper-pagination-bullet {
          background: #6b7280 !important;
          opacity: 0.5;
        }

        .dark .swiper-pagination-bullet-active {
          background: #818cf8 !important;
          opacity: 1;
        }

        /* 네비게이션 버튼 스타일 - globals.css와 일치 */
        .swiper-button-prev,
        .swiper-button-next {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.8) !important;
        }

        .dark .swiper-button-prev,
        .dark .swiper-button-next {
          color: #f3f4f6 !important;
          background: rgba(55, 65, 81, 0.8) !important;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 0.9) !important;
          transform: scale(1.1);
        }

        .dark .swiper-button-prev:hover,
        .dark .swiper-button-next:hover {
          background: rgba(55, 65, 81, 0.9) !important;
          color: #ffffff !important;
        }
      `}</style>
    </section>
  );
};

export default PortfoliosMobile;
