'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';

// horizontalLoop 함수의 설정 타입 정의
interface HorizontalLoopConfig {
  repeat?: number;
  speed?: number;
  reversed?: boolean;
  paddingRight?: number;
  paused?: boolean;
  snap?: number | false;
}

// GSAP 타임라인 확장 타입 정의
interface ExtendedTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
}

const PortfolioMarquee: React.FC = () => {
  useEffect(() => {
    // 각 서비스 카탈로그 행에 대해 수평 루프 애니메이션 적용
    const catalogRows = gsap.utils.toArray('.services-catalog-row') as Element[];
    catalogRows.forEach((line: Element, i: number) => {
      const links = line.querySelectorAll('.services-catalog-row-item');
      const linksArray = Array.from(links);
      // 타임라인을 생성하여 애니메이션 시작 (반환값은 사용하지 않음)
      horizontalLoop(linksArray, {
        repeat: -1,
        speed: 0.7 + i * 0.1,
        reversed: true,
        paddingRight: parseFloat(gsap.getProperty(links[0], 'marginRight', 'px') as string),
      });
    });

    // 중복 실행 방지를 위한 두 번째 루프 제거 (원본 코드에서 중복이 있었음)
  }, []);

  // 수평 무한 루프 애니메이션 함수
  function horizontalLoop(items: Element[], config: HorizontalLoopConfig = {}): ExtendedTimeline {
    items = gsap.utils.toArray(items);

    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: 'none' },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    });

    const length = items.length;
    const startX = (items[0] as HTMLElement).offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    const pixelsPerSecond = (config.speed || 1) * 100;

    // 스냅 함수 정의 (브라우저별 픽셀 차이를 보정)
    const snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);

    let curX: number;
    let distanceToStart: number;
    let distanceToLoop: number;
    let item: HTMLElement;
    let i: number;

    // 각 아이템의 초기 위치와 크기 설정
    gsap.set(items, {
      xPercent: (i: number, el: Element) => {
        const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px') as string));
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100 +
            (gsap.getProperty(el, 'xPercent') as number)
        );
        return xPercents[i];
      },
    });

    gsap.set(items, { x: 0 });

    // 전체 너비 계산
    const totalWidth =
      (items[length - 1] as HTMLElement).offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      (items[length - 1] as HTMLElement).offsetWidth *
        (gsap.getProperty(items[length - 1], 'scaleX') as number) +
      parseFloat(config.paddingRight?.toString() || '0');

    // 각 아이템에 대한 애니메이션 설정
    for (i = 0; i < length; i++) {
      item = items[i] as HTMLElement;
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, 'scaleX') as number);

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
          },
          {
            xPercent: xPercents[i],
            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add('label' + i, distanceToStart / pixelsPerSecond);

      times[i] = distanceToStart / pixelsPerSecond;
    }

    // 인덱스 이동 함수
    function toIndex(index: number, vars: gsap.TweenVars = {}): gsap.core.Tween {
      // 항상 가장 짧은 방향으로 이동
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }

      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];

      if (time > tl.time() !== index > curIndex) {
        // 타임라인의 플레이헤드를 래핑하는 경우 적절한 조정
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }

      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }

    // 타임라인에 메서드 추가
    const extendedTl = tl as ExtendedTimeline;
    extendedTl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
    extendedTl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
    extendedTl.current = () => curIndex;
    extendedTl.toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
    extendedTl.times = times;

    // 역방향 설정이 있는 경우
    if (config.reversed) {
      tl.vars.onReverseComplete?.();
      tl.reverse();
    }

    return extendedTl;
  }

  return (
    <section>
      <div className="relative flex overflow-hidden pb-[10%] pt-[15%] items-center flex-col justify-center">
        {/* 서비스 카탈로그 제목 */}
        <div className="services-catalog-title mb-[10vw] px-[10%] md:mb-[5vw] md:px-0">
          <h5 className="font-heading font-medium text-[9vw] md:text-center md:text-[8vw] md:leading-[1.2] lg:text-[4.5vw] title-anim">
            A full catalogue of my projects. 👨‍💻
          </h5>
        </div>

        {/* 서비스 목록 컨테이너 */}
        <div className="w-full h-full space-y-[3.5vw] text-[4vw] font-heading md:text-[3vw] lg:text-[1.5vw] fadeup">
          {/* 첫 번째 행 - 프로젝트 포트폴리오 */}
          <div className="services-catalog-row flex justify-between items-center flex-row whitespace-nowrap p-0 will-change-transform relative">
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw] opacity-[0.6]">
              Wine Bliss
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Spaceport Project
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw] opacity-[0.6]">
              Garfield Theme Portfolio
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Tetris Game
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw] opacity-[0.6]">
              Emotion Diary
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              To-Do List
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Weather App
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Typing Game
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Calculator
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Chatting App
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Digital Marketing
            </div>
            <div className="services-catalog-row-item inline-block mr-[18vw] md:mr-[12vw]">
              Old Portfolio
            </div>
          </div>

          {/* 두 번째 행 - 디자인 서비스 */}
          <div className="services-catalog-row justify-between items-center flex-row whitespace-nowrap p-0 will-change-transform relative">
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Frontend Development
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Vue.js / React / Next.js
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Responsive Web Apps
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Mobile-First Design
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              TypeScript Development
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Component Libraries
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              API Integration
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              State Management
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Performance Optimization
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              CSS & Styling
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Modern JavaScript
            </div>
          </div>

          {/* 세 번째 행 - 개발 도구 및 라이브러리 */}
          <div className="services-catalog-row justify-between items-center flex-row whitespace-nowrap p-0 will-change-transform relative">
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Git & Version Control
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Webpack / Vite / Turbopack
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Tailwind CSS / Styled Components
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Context API / Local Storage
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Browser DevTools
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              ESLint / Prettier
            </div>
          </div>

          {/* 네 번째 행 - 백엔드 연동 및 API */}
          <div className="services-catalog-row justify-between items-center flex-row whitespace-nowrap p-0 will-change-transform relative">
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              RESTful API Integration
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Fetch API / Axios
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              JSON Data Handling
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Form Validation
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Error Handling
            </div>
          </div>

          {/* 다섯 번째 행 - 배포 및 DevOps */}
          <div className="services-catalog-row justify-between items-center flex-row whitespace-nowrap p-0 will-change-transform relative">
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              Vercel / Netlify Deployment
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw]">
              MySQL / MariaDB
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              MongoDB / NoSQL
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Database Design
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              Performance Monitoring
            </div>
            <div className="services-catalog-row-item inline-block mr-[15vw] md:mr-[10vw] opacity-[0.6]">
              SEO Optimization
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioMarquee;
