'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SocialLink {
  name: string;
  link: string;
}

const Contact: React.FC = () => {
  const footerContainer = useRef<HTMLElement>(null);

  useEffect(() => {
    const text = footerContainer.current?.querySelectorAll('.footer-anim p');

    if (text) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          text,
          {
            rotationX: -90,
            opacity: 0,
            translateY: 300,
            transformPerspective: '1000',
            transformOrigin: 'top center',
          },
          {
            duration: 0.8,
            rotationX: 0,
            opacity: 1,
            translateY: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: footerContainer.current,
              start: 'top 80%',
            },
          }
        );
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <>
      <footer ref={footerContainer} className="w-full h-full">
        <div className="w-[90%] mx-auto pt-[15%] pb-[10%] md:pt-[10%] md:pb-[5%] lg:pt-[5%] lg:pb-[1.5%]">
          {/* Footer CTA Section - 메인 콜투액션 영역 */}
          <div className="flex flex-col items-center justify-between md:flex-row md:items-end">
            <div className="leading-[1.4] text-[8vw] font-heading footer-anim text-center md:text-left md:text-[6vw] md:leading-[1.2] md:w-[65%]">
              <p className="">Let&apos;s connect </p>
              <p className="text-center md:text-right md:font-medium"> — anytime!</p>
            </div>

            {/* 데스크톱용 CTA 버튼 - 모바일에서는 숨김 */}
            <div className="hidden md:flex md:w-[35%] md:items-end md:justify-around md:mb-[1.5vw] fadeup">
              <div className="relative w-[12vw] h-[3vw]">
                <Image
                  priority={false}
                  fill
                  sizes="12vw"
                  src="/assets/icons/ui/footer-arrow.png"
                  className="!h-auto dark:invert"
                  alt="Footer Arrow Icon"
                />
              </div>
              <Link className="h-fit w-fit block" href="#contact">
                <div
                  data-cursor-text="Say Hi !!"
                  data-cursor-color="var(--brand-primary)"
                  data-cursor-size="100px"
                  className="flex items-center justify-center leading-[1] font-heading h-[12vw] w-[12vw] bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] rounded-full text-white text-[1.5vw] border border-[#333333] hover:bg-gradient-to-br hover:from-[#2A2A2A] hover:via-[#3A3A3A] hover:to-[#2A2A2A] hover:border-[#ffffff] hover:shadow-brand duration-700 transition-all ease-out hover:scale-105 backdrop-blur-sm"
                >
                  <span className="relative z-10">Contact Me</span>
                  {/* 글로우 효과를 위한 오버레이 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-[var(--brand-primary)] opacity-0 hover:opacity-10 transition-opacity duration-700"></div>
                </div>
              </Link>
            </div>
          </div>
          {/* Footer CTA Section END */}

          {/* 연락처 정보 섹션 */}
          <div className="pt-[15%] font-heading fadeup md:pt-[5vw]">
            <div className="flex flex-col text-center md:flex-row md:text-left">
              {/* 이메일 및 전화번호 정보 */}
              <div className="w-full md:w-1/2">
                <div className="space-y-[2.5vw] w-full md:space-y-[1vw] md:w-fit">
                  <h6 className="text-[3.5vw] font-normal text-gray2 md:text-[1.15vw]">email</h6>
                  <div data-cursor-size="80px" data-cursor-exclusion>
                    <a
                      className="en-link-under text-[4.5vw] md:text-[1.5vw]"
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=test@naver.com&su=포트폴리오 문의"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Gmail로 이메일 보내기"
                    >
                      <span className="!font-normal">test@naver.com</span>
                    </a>
                  </div>
                </div>
                <div className="space-y-[2.5vw] w-full pt-[15%] md:pt-[2.5vw] md:space-y-[1vw] md:w-fit">
                  <h6 className="text-[3.5vw] font-normal text-gray2 md:text-[1.15vw]">
                    phone number
                  </h6>
                  <div data-cursor-size="80px" data-cursor-exclusion>
                    <Link
                      className="en-main-link text-[4.5vw] md:text-[1.5vw]"
                      href="tel:+82 0000 0000"
                    >
                      <span data-text="+82 0000 0000">+82 0000 0000</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 소셜 미디어 링크 */}
              <div className="w-full pt-[15%] md:w-1/2 md:pt-0">
                <h6 className="text-[3.5vw] font-normal text-gray2 pb-[2.5vw] md:text-[1.15vw] md:pb-[2vw]">
                  Contact Me
                </h6>
                <div className="grid grid-cols-3 items-end w-full gap-y-[2vw] gap-x-[8vw] justify-items-center md:justify-items-start">
                  {SocialLinks.map((item, index) => (
                    <div
                      className="w-fit"
                      key={index}
                      data-cursor-exclusion
                      data-cursor-size="80px"
                    >
                      <Link
                        className="en-main-link text-[4.8vw] md:text-[4vw] lg:text-[1.5vw]"
                        target="blank"
                        href={item.link}
                        rel="nofollow, noreferrer"
                      >
                        <span data-text={item.name}>{item.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center pt-[15%] md:w-fit md:mx-auto md:pt-[2vw]">
            <p className="text-[3vw] text-gray2 tracking-[1px] border-t border-slate-300 pt-[3vw] md:text-[1vw] md:border-t-0 md:pt-0">
              © 2025.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;

const SocialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/subin33',
  },
  {
    name: 'Notion',
    link: '#',
  },
  {
    name: 'Blog',
    link: 'https://blog-kappa-woad-43.vercel.app/',
  },
];
