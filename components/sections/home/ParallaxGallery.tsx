'use client';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useMemo } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 이미지 데이터 최적화
const GALLERY_IMAGES = [
  { src: '/assets/parallax-gallery/card-01.webp', alt: '포트폴리오 갤러리 이미지 1' },
  { src: '/assets/parallax-gallery/card-02.png', alt: '포트폴리오 갤러리 이미지 2' },
  { src: '/assets/parallax-gallery/card-03.webp', alt: '포트폴리오 갤러리 이미지 3' },
  { src: '/assets/parallax-gallery/card-04.webp', alt: '포트폴리오 갤러리 이미지 4' },
  { src: '/assets/parallax-gallery/card-05.webp', alt: '포트폴리오 갤러리 이미지 5' },
  { src: '/assets/parallax-gallery/card-06.webp', alt: '포트폴리오 갤러리 이미지 6' },
  { src: '/assets/parallax-gallery/card-07.webp', alt: '포트폴리오 갤러리 이미지 7' },
  { src: '/assets/parallax-gallery/card-08.webp', alt: '포트폴리오 갤러리 이미지 8' },
  { src: '/assets/parallax-gallery/card-09.webp', alt: '포트폴리오 갤러리 이미지 9' },
  { src: '/assets/parallax-gallery/card-10.webp', alt: '포트폴리오 갤러리 이미지 10' },
  { src: '/assets/parallax-gallery/card-11.webp', alt: '포트폴리오 갤러리 이미지 11' },
  { src: '/assets/parallax-gallery/card-12.webp', alt: '포트폴리오 갤러리 이미지 12' },
];

const ParallaxGallery: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  // 이미지 행 데이터 메모이제이션
  const imageRows = useMemo(
    () => [
      // 첫 번째 행 (왼쪽 이동)
      [0, 1, 0, 1],
      // 두 번째 행 (오른쪽 이동)
      [2, 3, 4, 5],
      // 세 번째 행 (왼쪽 이동)
      [6, 7, 8, 9],
      // 네 번째 행 (오른쪽 이동)
      [11, 10, 11, 10],
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const x = 800;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          scrub: 0.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      // 모듈 애니메이션 최적화
      const moduleElements = gsap.utils.toArray('.module') as Element[];
      const module2Elements = gsap.utils.toArray('.module-2') as Element[];

      moduleElements.forEach((el: Element) => {
        tl.fromTo(
          el,
          { x: 0 },
          { x: `-=${x}`, autoAlpha: 1, duration: 0.1, ease: 'none' },
          '-=0.1'
        );
      });

      module2Elements.forEach((el: Element) => {
        tl.fromTo(
          el,
          { x: 0 },
          { x: `+=${x}`, autoAlpha: 1, duration: 0.1, ease: 'none' },
          '-=0.1'
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // 최적화된 이미지 렌더링 함수
  const renderImage = (imageIndex: number, uniqueKey: string) => {
    const image = GALLERY_IMAGES[imageIndex];
    return (
      <Image
        key={uniqueKey}
        className="w-[45vw]"
        src={image.src}
        alt={image.alt}
        width={800}
        height={550}
        priority={false}
        loading="lazy"
        sizes="(max-width: 768px) 45vw, 800px"
        quality={80}
      />
    );
  };

  return (
    <section ref={container} className="w-full h-full md:mb-[30vh]">
      <div className="overflow-hidden w-screen h-screen md:h-[50vh]">
        <div className="w-full h-full rotate-45">
          <div className="w-full flex gap-[2vw] flex-col items-center translate-x-[-10%] translate-y-[-25%]">
            {/* 첫 번째 행 - module 클래스 (왼쪽으로 이동) */}
            <div className="flex flex-nowrap gap-[2vw] module">
              {imageRows[0].map((imageIndex, idx) =>
                renderImage(imageIndex, `row1-image-${imageIndex}-${idx}`)
              )}
            </div>

            {/* 두 번째 행 - module-2 클래스 (오른쪽으로 이동) */}
            <div className="flex flex-nowrap gap-[2vw] module-2 translate-x-[-50%]">
              {imageRows[1].map((imageIndex, idx) =>
                renderImage(imageIndex, `row2-image-${imageIndex}-${idx}`)
              )}
            </div>

            {/* 세 번째 행 - module 클래스 (왼쪽으로 이동) */}
            <div className="flex flex-nowrap gap-[2vw] module">
              {imageRows[2].map((imageIndex, idx) =>
                renderImage(imageIndex, `row3-image-${imageIndex}-${idx}`)
              )}
            </div>

            {/* 네 번째 행 - module-2 클래스 (오른쪽으로 이동) */}
            <div className="flex flex-nowrap gap-[2vw] module-2 translate-x-[-50%]">
              {imageRows[3].map((imageIndex, idx) =>
                renderImage(imageIndex, `row4-image-${imageIndex}-${idx}`)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxGallery;
