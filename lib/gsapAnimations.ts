'use client';
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitInLineWord, SplitInWord } from './splitText';

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

export function TitleAnim(): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnim = document.querySelectorAll('.title-anim');
      titleAnim.forEach(function (el) {
        // Element를 HTMLElement로 타입 캐스팅
        const htmlElement = el as HTMLElement;
        SplitInLineWord(htmlElement);
        const words = htmlElement.querySelectorAll('.word');
        gsap.from(words, {
          scrollTrigger: {
            trigger: htmlElement,
            start: 'top 85%',
            //  markers:true
          },
          opacity: 0,
          yPercent: 100,
          duration: 0.8,
          ease: 'Power3.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);
}

export function ParaAnim(): void {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const ParaAnim = document.querySelectorAll('.para-anim');
      ParaAnim.forEach(function (el) {
        // Element를 HTMLElement로 타입 캐스팅
        const htmlElement = el as HTMLElement;
        SplitInWord(htmlElement);
        const words = htmlElement.querySelectorAll('.word');
        gsap.from(words, {
          scrollTrigger: {
            trigger: htmlElement,
            start: 'top 85%',
          },
          opacity: 0,
          yPercent: 100,
          duration: 0.8,
          stagger: 0.01,
          ease: 'Power3.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);
}
