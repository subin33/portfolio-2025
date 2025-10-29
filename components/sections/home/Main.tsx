'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { fadeUp } from '@/lib/animations/scroll';
import dayjs from 'dayjs';
import Image from 'next/image';

interface TimeData {
  timezone: string;
  location: string;
  currentTime: string;
}

interface LocationData {
  city: string;
  country: string;
  timezone: string;
}

const Main: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const timeElementRef = useRef<HTMLParagraphElement>(null);

  const [isClient, setIsClient] = useState(false);

  // 위치 정보 상태 관리
  const [locationData, setLocationData] = useState<LocationData>({
    city: 'Seoul',
    country: 'Korea',
    timezone: '+9:00 KST',
  });

  // 시간 데이터 - 실시간 업데이트
  const timeData: TimeData = {
    timezone: locationData.timezone,
    location: `${locationData.city} - ${locationData.country}`,
    currentTime: isClient ? dayjs().format('HH:mm:ss') : '--:--:--',
  };
  console.log(timeData);

  // 위치 정보 가져오기
  const fetchUserLocation = useCallback(async () => {
    try {
      // 로컬 스토리지에서 캐시된 위치 정보 확인
      const cachedLocation = localStorage.getItem('userLocation');
      const cachedTimestamp = localStorage.getItem('userLocationTimestamp');

      if (cachedLocation && cachedTimestamp) {
        const now = Date.now();
        const cacheAge = now - parseInt(cachedTimestamp);
        const oneHour = 60 * 60 * 1000;

        // 1시간 이내라면 캐시된 데이터 사용
        if (cacheAge < oneHour) {
          const locationData = JSON.parse(cachedLocation);
          setLocationData(locationData);
          return;
        }
      }

      // 캐시가 없거나 1시간이 지났다면 새로운 요청
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.city && data.country_name) {
        const newLocationData = {
          city: data.city,
          country: data.country_name,
          timezone: data.utc_offset ? `UTC${data.utc_offset}` : data.timezone || '+9:00 KST',
        };

        // 새로운 위치 정보를 로컬 스토리지에 저장
        localStorage.setItem('userLocation', JSON.stringify(newLocationData));
        localStorage.setItem('userLocationTimestamp', Date.now().toString());

        setLocationData(newLocationData);
      }
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.log('위치 정보를 가져올 수 없습니다. 기본값을 사용합니다.');
      }
    }
  }, []);

  // 시간 업데이트 함수 - DOM 직접 조작으로 리렌더링 방지
  const updateTime = useCallback(() => {
    if (timeElementRef.current && isClient) {
      timeElementRef.current.textContent = dayjs().format('HH:mm:ss');
    }
  }, [isClient]);

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP 애니메이션 효과
  useEffect(() => {
    if (!containerRef.current) return;

    const mainTextElements = containerRef.current.querySelectorAll('.main-anim');
    const mainBottomElements = containerRef.current.querySelectorAll('.main-bottom');

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      // 텍스트 애니메이션
      timeline.fromTo(
        mainTextElements,
        {
          rotationX: -80,
          opacity: 0,
          translateY: 300,
          transformPerspective: '1000',
          transformOrigin: 'top center',
        },
        {
          delay: 5.8,
          duration: 1.3,
          rotationX: 0,
          opacity: 1,
          translateY: 0,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      // 하단 요소 애니메이션
      timeline.fromTo(
        mainBottomElements,
        {
          y: -50,
          opacity: 0,
        },
        {
          delay: 0.7,
          duration: 1.3,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '<' // 이전 애니메이션과 동시 시작
      );
    }, containerRef);

    // 사용자 위치 정보 가져오기
    fetchUserLocation();

    // 시간 업데이트 인터벌 설정 (클라이언트에서만)
    let timeInterval: NodeJS.Timeout;
    if (isClient) {
      timeInterval = setInterval(updateTime, 1000);
    }

    return () => {
      ctx.revert();
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    };
  }, [fetchUserLocation, updateTime, isClient]);

  fadeUp();

  const cursorAttributes = {
    size: '15vw',
    magnetic: true,
    color: '#000',
  };

  const handleScrollDown = useCallback(() => {
    const nextSection = containerRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden"
      data-cursor-size="10"
      role="banner"
      aria-label="포트폴리오 메인 섹션"
    >
      <div className="w-full flex flex-col items-center justify-center relative h-full pt-[20vw] px-[6%] md:flex-row md:pt-0 md:px-0">
        <h1 className="flex flex-col font-medium font-heading text-[15vw] leading-[1] w-full mx-auto md:text-[9vw] md:w-[90%] md:mt-0 md:mr-1">
          <span
            className="w-fit main-anim font-clash block"
            data-cursor-size={cursorAttributes.size}
            data-cursor-magnetic={cursorAttributes.magnetic}
            data-cursor-background-image="/assets/cursor-animations/welcome.gif"
            data-cursor-color={cursorAttributes.color}
            role="text"
            aria-label="환영 메시지"
          >
            Welcome
          </span>
          <span
            className="text-gradient-brand text-[15vw] w-fit main-anim md:text-[10vw] font-clash block"
            data-cursor-size={cursorAttributes.size}
            data-cursor-magnetic={cursorAttributes.magnetic}
            data-cursor-background-image="/assets/cursor-animations/to-my.gif"
            data-cursor-color={cursorAttributes.color}
            role="text"
            aria-label="포트폴리오 소개"
          >
            to my
          </span>
          <div className="flex flex-col gap-[2vw] mt-[1vw] md:flex-row md:gap-[2vw] md:ml-[11vw] md:mt-[1vw]">
            <span
              data-cursor-size={cursorAttributes.size}
              data-cursor-magnetic={cursorAttributes.magnetic}
              data-cursor-background-image="/assets/cursor-animations/portfolio.gif"
              data-cursor-color={cursorAttributes.color}
              className="block w-fit main-anim font-clash"
              role="text"
              aria-label="포트폴리오"
            >
              Portfolio
            </span>
            <span
              data-cursor-size={cursorAttributes.size}
              data-cursor-magnetic={cursorAttributes.magnetic}
              data-cursor-background-image="/assets/cursor-animations/portfolio.gif"
              data-cursor-color={cursorAttributes.color}
              className="relative text-transparent block w-fit main-anim font-clash top-[1.5vw] dark:text-white md:text-[7vw]"
              style={{
                WebkitTextStroke: '1px rgb(19 18 18)',
              }}
              data-dark-stroke="1px rgb(255 255 255)"
              role="text"
              aria-label="개발자 이름"
            >
              I&apos;m Subin
            </span>
          </div>
        </h1>

        {/* 설명 텍스트 */}
        <p
          className="text-[4.5vw] tracking-[0.4px] leading-[1.4] w-full mt-[5vw] main-anim md:absolute md:w-[32vw] md:top-[25%] md:right-[19%] md:text-[1.2vw] md:leading-[1.7] lg:top-[32%] lg:text-[1.3vw]"
          role="text"
          aria-label="개발자 소개"
        >
          Frontend Developer with 1.8+ years of practical experience and a strong interest in
          continuous learning. I approach problems with curiosity and aim to build thoughtful user
          experiences.
        </p>
      </div>

      <div className="absolute w-full bottom-0 left-0 main-bottom hidden md:block">
        <button
          onClick={handleScrollDown}
          className="ml-[1vw] mb-[-4vw] dark:invert transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          aria-label="다음 섹션으로 스크롤"
          title="다음 섹션으로 이동"
        >
          <Image
            className="ml-[1vw] mb-[-4vw] dark:invert w-11 h-55"
            src="/assets/icons/ui/scroll-down.svg"
            alt="스크롤 다운 아이콘"
            width={16}
            height={80}
            priority
          />
        </button>

        <div className="w-[92%] mx-auto pb-[1vw] flex items-center justify-between font-heading text-[1vw]">
          <div>
            <p className="text-[0.9vw]">timezone</p>
            <p ref={timeElementRef} aria-label="현재 시간" aria-live="polite">
              {timeData.currentTime}
            </p>
          </div>
          <div>
            <p className="text-[0.9vw]">location</p>
            <p aria-label={`현재 위치: ${timeData.location}`}>{timeData.location}</p>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <p>프론트엔드 개발자 포트폴리오입니다.</p>
        <p>1.8년 이상의 실무 경험을 바탕으로 사용자 경험을 중시한 웹 개발을 하고 있습니다.</p>
        <p>위치: {timeData.location}</p>
      </div>
    </section>
  );
};

export default Main;
