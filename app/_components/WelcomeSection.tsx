'use client';

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import dayjs from 'dayjs';
import Image from 'next/image';

// 타입 정의
interface HeroProps {
  className?: string;
  onAnimationComplete?: () => void;
}

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

interface CursorAttributes {
  size: string;
  magnetic: boolean;
  color: string;
}

interface AnimationConfig {
  delay: number;
  duration: number;
  stagger: number;
  ease: string;
}

const ANIMATION_CONFIG: AnimationConfig = {
  delay: 0.5,
  duration: 1.3,
  stagger: 0.1,
  ease: 'power3.out',
} as const;

const CURSOR_CONFIG: CursorAttributes = {
  size: 'var(--cursor-size)',
  magnetic: true,
  color: 'var(--cursor-color)',
} as const;

const WelcomeSection: React.FC<HeroProps> = ({ className = '', onAnimationComplete }) => {
  const containerRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = React.useState(false);

  const timeElementRef = useRef<HTMLParagraphElement>(null);

  // 위치 정보 상태 관리
  const [locationData, setLocationData] = React.useState<LocationData>({
    city: 'Seoul',
    country: 'Korea',
    timezone: '+9:00 KST',
  });

  // 시간 데이터 - 고정값으로 설정
  const timeData: TimeData = useMemo(
    () => ({
      timezone: locationData.timezone,
      location: `${locationData.city} - ${locationData.country}`,
      currentTime: dayjs().format('HH:mm:ss'),
    }),
    [locationData]
  );

  // 위치 정보 가져오기
  const fetchUserLocation = useCallback(async () => {
    try {
      // 로컬 스토리지에서 캐시된 위치 정보 확인
      const cachedLocation = localStorage.getItem('userLocation');
      const cachedTimestamp = localStorage.getItem('userLocationTimestamp');

      if (cachedLocation && cachedTimestamp) {
        const now = Date.now();
        const cacheAge = now - parseInt(cachedTimestamp);
        const oneHour = 60 * 60 * 1000; // 1시간 (밀리초)

        // 1시간 이내라면 캐시된 데이터 사용
        if (cacheAge < oneHour) {
          const locationData = JSON.parse(cachedLocation);
          setLocationData(locationData);
          console.log('캐시된 위치 정보를 사용합니다.');
          return;
        }
      }
      // 캐시가 없거나 1시간이 지났다면 새로운 요청
      // IP 기반 위치 추정 (무료 API 사용)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.city && data.country_name) {
        const newLocationData = {
          city: data.city,
          country: data.country_name,
          timezone: data.timezone || '+9:00 KST',
        };

        // 새로운 위치 정보를 로컬 스토리지에 저장
        localStorage.setItem('userLocation', JSON.stringify(newLocationData));
        localStorage.setItem('userLocationTimestamp', Date.now().toString());

        setLocationData(newLocationData);
      }
    } catch (error) {
      console.log('위치 정보를 가져올 수 없습니다. 기본값을 사용합니다.');
      // 에러 발생 시 기본값 유지
    }
  }, []);

  // 시간 업데이트 함수 - DOM 직접 조작으로 리렌더링 방지
  const updateTime = useCallback(() => {
    if (timeElementRef.current) {
      timeElementRef.current.textContent = dayjs().format('HH:mm:ss');
    }
  }, []);

  // 애니메이션 초기화 함수
  const initializeAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const heroTextElements = containerRef.current.querySelectorAll('.hero-anim');
    const heroBottomElements = containerRef.current.querySelectorAll('.hero-bottom');

    animationRef.current = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          setIsAnimationComplete(true);
          onAnimationComplete?.();
        },
      });

      // 메인 텍스트 애니메이션
      timeline.fromTo(
        heroTextElements,
        {
          rotationX: -80,
          opacity: 0,
          translateY: 300,
          transformPerspective: '1000',
          transformOrigin: 'top center',
        },
        {
          delay: ANIMATION_CONFIG.delay,
          duration: ANIMATION_CONFIG.duration,
          rotationX: 0,
          opacity: 1,
          translateY: 0,
          stagger: ANIMATION_CONFIG.stagger,
          ease: ANIMATION_CONFIG.ease,
        }
      );

      // 하단 요소 애니메이션
      timeline.fromTo(
        heroBottomElements,
        {
          y: -50,
          opacity: 0,
        },
        {
          delay: -1,
          duration: ANIMATION_CONFIG.duration,
          opacity: 1,
          y: 0,
          stagger: ANIMATION_CONFIG.stagger,
          ease: ANIMATION_CONFIG.ease,
        },
        '<'
      );
    }, containerRef);
  }, [onAnimationComplete]);

  // 컴포넌트 마운트 시 애니메이션 초기화 및 위치 정보 가져오기
  useEffect(() => {
    initializeAnimation();

    // 사용자 위치 정보 가져오기
    fetchUserLocation();

    // 시간 업데이트 인터벌 설정
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      animationRef.current?.revert();
      clearInterval(timeInterval);
    };
  }, [initializeAnimation, updateTime, fetchUserLocation]);

  // 스크롤 다운 핸들러
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
      className={`h-screen w-full relative overflow-hidden tablet:h-full pb-[5vw] tablet:pb-[10vw] ${className}`}
      role="banner"
      aria-label="포트폴리오 메인 섹션"
    >
      {/* 메인 콘텐츠 영역 */}
      <div className="w-full flex items-center justify-start relative h-full tablet:flex-col tablet:pt-[20vw] tablet:px-[6%]">
        {/* 메인 제목 */}
        <h1 className="flex flex-col font-medium font-clash text-[9vw] leading-[1] w-[80%] mx-auto tablet:w-full tablet:text-[15vw] tablet:mt-[6vw]">
          {/* Welcome 텍스트 */}
          <span
            className="text-black2 w-fit ml-[11vw] hero-anim tablet:ml-0 block"
            data-cursor-size={CURSOR_CONFIG.size}
            data-cursor-magnetic={CURSOR_CONFIG.magnetic}
            data-cursor-background-image="/assets/gif/welcome-cursor-3.gif"
            data-cursor-color={CURSOR_CONFIG.color}
            role="text"
            aria-label="환영 메시지"
          >
            Welcome
          </span>

          {/* to my 텍스트 */}
          <span
            className="text-[#6366F1] text-[10vw] w-fit hero-anim tablet:text-[15vw] block"
            data-cursor-size={CURSOR_CONFIG.size}
            data-cursor-magnetic={CURSOR_CONFIG.magnetic}
            data-cursor-background-image="/assets/gif/welcome-cursor-1.gif"
            data-cursor-color={CURSOR_CONFIG.color}
            role="text"
            aria-label="포트폴리오 소개"
          >
            to my
          </span>

          {/* Portfolio + 이름 영역 */}
          <div className="flex gap-[2vw] ml-[11vw] mt-[1vw] tablet:block tablet:ml-0 tablet:mt-0">
            <span
              data-cursor-size={CURSOR_CONFIG.size}
              data-cursor-magnetic={CURSOR_CONFIG.magnetic}
              data-cursor-background-image="/assets/gif/welcome-cursor-2.gif"
              data-cursor-color={CURSOR_CONFIG.color}
              className="text-black2 block w-fit hero-anim"
              role="text"
              aria-label="포트폴리오"
            >
              Portfolio
            </span>
            <span
              data-cursor-size={CURSOR_CONFIG.size}
              data-cursor-magnetic={CURSOR_CONFIG.magnetic}
              data-cursor-background-image="/assets/gif/welcome-cursor-4.gif"
              data-cursor-color={CURSOR_CONFIG.color}
              className="relative text-transparent block w-fit hero-anim text-[6.7vw] top-[1.5vw] dark:text-white"
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

        <p
          className="text-[1.2vw] text-black2 text-justify tracking-[0.4px] leading-[1.7] absolute w-[32vw] top-[42%] right-[19%] hero-anim tablet:static tablet:w-full tablet:text-[3.7vw] tablet:leading-[1.4] tablet:mt-[8vw] mobile:text-[6vw]"
          role="text"
          aria-label="개발자 소개"
        >
          Frontend Developer with 1.8+ years of practical experience and a strong interest in
          continuous learning. I approach problems with curiosity and aim to build thoughtful user
          experiences.
        </p>
      </div>

      <div className="absolute w-full bottom-0 left-0 hero-bottom tablet:static tablet:hidden">
        <button
          onClick={handleScrollDown}
          className="ml-[1vw] mb-[-4vw] dark:invert transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          aria-label="다음 섹션으로 스크롤"
          title="다음 섹션으로 이동"
        >
          <Image
            src="/assets/icons/ui/scroll-down.svg"
            alt="스크롤 다운 아이콘"
            width={18}
            height={240}
            priority={false}
            className="ml-[1vw] mb-[-4vw] dark:invert"
          />
        </button>

        {/* 시간 및 위치 정보 */}
        <div className="w-[92%] mx-auto pb-[1vw] flex items-center justify-between font-clash text-[1.2vw] ">
          <div>
            <p className="text-gray-400 font-sans">timezone</p>
            <p
              ref={timeElementRef}
              aria-label="현재 시간"
              aria-live="polite"
              className="tracking-wider"
            >
              {timeData.currentTime}
            </p>
          </div>
          <div>
            <p className="text-gray-400 font-sans">location</p>
            <p aria-label={`현재 위치: ${timeData.location}`}>{timeData.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
