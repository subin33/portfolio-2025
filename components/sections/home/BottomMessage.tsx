'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticlesContainer from '@/components/common/ParticlesContainer';
import { bottomParticlesData } from '@/lib/data/particlesData';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from '@/styles/particles.module.css';

gsap.registerPlugin(ScrollTrigger);

interface BottomMessageProps {
  text: string;
}

const BottomMessage: React.FC<BottomMessageProps> = ({ text }) => {
  const container = useRef<HTMLElement>(null);
  const aeroText = useRef<HTMLParagraphElement>(null);
  const aeroMain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aeroMain.current || !container.current) return;

    const shapes = aeroMain.current.querySelectorAll('.shape');
    const containerElement = container.current;

    const handleMouseMove = (evt: MouseEvent) => {
      const mouseX = evt.clientX;
      const mouseY = evt.clientY;

      gsap.to(shapes, {
        x: mouseX,
        y: mouseY,
        stagger: -0.1,
      });
    };

    containerElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (!aeroText.current || !container.current) return;

    const aeroTextElement = aeroText.current;
    const containerElement = container.current;

    const ctx = gsap.context(() => {
      gsap.from(aeroTextElement, {
        scrollTrigger: {
          trigger: containerElement,
          start: 'top 60%',
        },
        opacity: 0,
        yPercent: 320,
        skewY: 30,
        duration: 3,
        ease: 'expo.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={container} data-cusrsor-color="#000" data-cursor-size="0px">
        <div className="flex flex-col relative w-screen h-screen z-[-99] tablet:h-[70vh]">
          <div className={`${styles.textContainer} dark:!mix-blend-darken`}>
            <p ref={aeroText} className="w-[70%] tablet:w-[80%] font-heading">
              {text}
            </p>
            <ParticlesContainer particles={bottomParticlesData} />
          </div>
          <div ref={aeroMain} className={styles.aerosolMain}>
            <div className={styles.shapes}>
              <div className={`${styles.shape} ${styles.shape1} shape`}></div>
              <div className={`${styles.shape} ${styles.shape2} shape`}></div>
              <div className={`${styles.shape} ${styles.shape3} shape`}></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BottomMessage;
