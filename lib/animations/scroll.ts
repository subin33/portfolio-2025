'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fadeUp(): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = document.querySelectorAll('.fadeup');
      content.forEach((content) => {
        gsap.fromTo(
          content,
          {
            scrollTrigger: {
              trigger: content,
              start: 'top 90%',
            },
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.Out',
            duration: 0.7,
            stagger: 0.5,
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);
}
