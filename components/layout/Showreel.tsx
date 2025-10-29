'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Showreel 컴포넌트 props 타입 정의
interface ShowreelProps {
  onClick: () => void;
  isShowreel: boolean;
}

const Showreel: React.FC<ShowreelProps> = ({ onClick, isShowreel }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShowreel) {
      const tl = gsap.timeline();
      tl.fromTo(
        modalRef.current,
        {
          opacity: 0,
          translateY: -100,
        },
        {
          duration: 1,
          translateY: 0,
          opacity: 1,
        }
      );
      return () => {
        tl.kill();
      };
    }
  }, [isShowreel]);

  if (!isShowreel) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close Showreel"
        onClick={onClick}
        className="w-full h-full p-4 bg-[#00000099] backdrop-blur-lg"
      >
        <div
          ref={modalRef}
          className="h-[30%] w-full rounded-2xl overflow-hidden md:h-1/2 lg:h-full"
        >
          <video
            className="object-cover h-full w-full"
            src="/showreel.mp4"
            autoPlay
            playsInline
            loop
          />
        </div>
      </button>
    </>
  );
};

export default Showreel;
