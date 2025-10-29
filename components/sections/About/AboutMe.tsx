'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import Image from 'next/image';

import { LINKS, MY_EXPERIENCE, MY_STACK } from '@/lib/data/aboutData';
import SectionTitle from '@/components/ui/common/SectionTitle';
import OptimizedIcon, { ExperienceIcons, ContactIcons } from '@/components/ui/common/OptimizedIcon';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const container = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (profileRef.current) {
          const profileElements = profileRef.current.querySelectorAll('.profile-element');
          gsap.from(profileElements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'Power2.out',
            scrollTrigger: {
              trigger: profileRef.current,
              start: 'top 80%',
            },
          });
        }

        if (contactRef.current) {
          const contactElements = contactRef.current.querySelectorAll('.contact-element');
          gsap.from(contactElements, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'Power2.out',
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 85%',
            },
          });
        }

        if (socialRef.current) {
          const socialElements = socialRef.current.querySelectorAll('.social-element');
          gsap.from(socialElements, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'Power2.out',
            scrollTrigger: {
              trigger: socialRef.current,
              start: 'top 85%',
            },
          });
        }

        if (experienceRef.current) {
          const experienceItems = experienceRef.current.querySelectorAll('.experience-item');
          gsap.from(experienceItems, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'Power2.out',
            scrollTrigger: {
              trigger: experienceRef.current,
              start: 'top 75%',
            },
          });
        }

        const resumeButton = document.querySelector('.resume-button');
        if (resumeButton) {
          gsap.from(resumeButton, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'Power2.out',
            scrollTrigger: {
              trigger: resumeButton,
              start: 'top 85%',
            },
          });
        }

        if (skillsRef.current) {
          const slideUpEl = skillsRef.current.querySelectorAll('.slide-up');
          if (slideUpEl?.length) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: skillsRef.current,
                start: 'top 80%',
                end: 'bottom 80%',
                scrub: 0.5,
              },
            });

            tl.from('.slide-up', {
              opacity: 0,
              y: 50,
              ease: 'Power2.out',
              stagger: 0.4,
            });
          }

          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'bottom 50%',
              end: 'bottom 10%',
              scrub: 1,
            },
          });

          tl2.to(skillsRef.current, {
            y: -150,
            opacity: 0,
          });
        }
      });

      return () => ctx.revert();
    },
    { scope: container }
  );

  const handleResumeDownload = () => {
    window.open('#', '_self');
  };

  return (
    <section
      className="min-h-screen py-8 sm:py-12 md:py-20 relative overflow-hidden bg-white dark:bg-black"
      id="about-me"
      ref={container}
    >
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 dark:from-[var(--brand-primary)]/20 dark:to-[var(--brand-secondary)]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 dark:from-[#10B981]/20 dark:to-[#059669]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-[#F59E0B]/5 to-[#D97706]/5 dark:from-[#F59E0B]/10 dark:to-[#D97706]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[85%] mx-auto relative z-10">
        <SectionTitle title="About me" />

        {/* 메인 콘텐츠 */}
        <div className="mt-8 sm:mt-12 md:mt-[7vw]">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* 왼쪽: 프로필 정보 */}
            <div className="lg:col-span-5" ref={profileRef}>
              <div className="space-y-6 sm:space-y-8">
                {/* 프로필 카드 */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 profile-element">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                    <div className="relative mx-auto sm:mx-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-35 md:h-35 rounded-full overflow-hidden shadow-lg">
                        <Image
                          src="/assets/about/aboutme.png"
                          alt="About Me"
                          width={140}
                          height={140}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-white dark:border-gray-800 flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm">😊</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        subin33
                      </h3>
                      <p className="text-[var(--brand-primary)] font-medium text-sm sm:text-base">
                        Frontend Developer
                      </p>
                      <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        🎂 0000.00.00
                      </p>
                      <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                        {LINKS.map((link) => (
                          <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-600 hover:border-[var(--brand-primary)] hover:shadow-lg transition-all duration-300 flex items-center justify-center group relative"
                            aria-label={`${link.name} 링크로 이동`}
                            title={`${link.name}`}
                          >
                            {link.name === 'github' && (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-[var(--brand-primary)] transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            )}
                            {link.name === 'Blog' && (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-[var(--brand-primary)] transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                />
                              </svg>
                            )}
                            {link.name === 'resume' && (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-[var(--brand-primary)] transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            )}
                            {link.name === 'notion' && (
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300 group-hover:text-[var(--brand-primary)] transition-colors"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.268-.233c.466-.047.84.42.793.933zm2.936-10.018L10.63 2.26c-.653-.327-1.215-.234-1.634.14L4.295 5.5c-.28.186-.046.466.327.466l12.21.793c.42 0 .56-.186.28-.466z" />
                              </svg>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quod qui quae.
                    Minus beatae, obcaecati corporis laudantium excepturi placeat cumque officia,
                    nihil nisi nostrum assumenda quis earum natus, animi maxime! Ea ad rem id error
                    consequuntur modi exercitationem voluptatum quidem, quo, in, labore dignissimos
                    accusantium ab dolorum molestiae cupiditate repellendus quod. Recusandae
                    accusamus sapiente dolorem tempora dolore minima quisquam ratione? Optio impedit
                    quisquam minus soluta odio suscipit voluptate nisi, non facilis accusantium quo
                    possimus voluptatum molestiae sunt, iusto repellendus labore ex. A odit
                    exercitationem alias. Officiis aut voluptatum id vero natus laboriosam at
                    quibusdam possimus. Atque rem odit sit reiciendis.
                  </div>
                </div>

                {/* 이력서 다운로드 버튼 */}
                <div className="resume-button">
                  <button
                    onClick={handleResumeDownload}
                    className="w-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    aria-label="이력서 다운로드"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>이력서 다운로드</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 오른쪽: 연락처 및 소셜 정보 */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* 연락처 정보 */}
              <div
                ref={contactRef}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <div className="w-2 h-2 bg-[var(--brand-primary)] rounded-full mr-3"></div>
                  Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="contact-element space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-lg flex items-center justify-center">
                        {ContactIcons.email}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=test@naver.com&su=포트폴리오 문의"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gray-900 dark:text-white text-sm sm:text-base transition-colors"
                          aria-label="Gmail로 이메일 보내기"
                          data-cursor-size="80px"
                          data-cursor-exclusion
                        >
                          test@naver.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center">
                        <OptimizedIcon
                          type="location"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                        />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Location
                        </p>
                        <a
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gray-900 dark:text-white text-sm sm:text-base transition-colors"
                          aria-label="Google 지도에서 주소 보기"
                          data-cursor-size="80px"
                          data-cursor-exclusion
                        >
                          주소 | Address
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="contact-element space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center">
                        {ContactIcons.clock}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Experience
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                          1.8+ Years
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#EC4899] to-[#BE185D] rounded-lg flex items-center justify-center">
                        {ContactIcons.phone}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <a
                          href="tel:010-0000-0000"
                          className="font-medium text-gray-900 dark:text-white text-sm sm:text-base transition-colors"
                          aria-label="전화 걸기"
                          title="전화 걸기"
                          data-cursor-size="80px"
                          data-cursor-exclusion
                        >
                          010-0000-0000
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 자격증 정보 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 정보처리산업기사 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg flex items-center justify-center shadow-lg">
                      {ContactIcons.checkmark}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Certificate
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        정보처리산업기사
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">한국산업인력공단</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {ContactIcons.verified}
                      <p className="text-xs text-[#8B5CF6] font-medium">2025.06.13</p>
                    </div>
                  </div>
                </div>

                {/* SQLD 자격증 */}
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-lg flex items-center justify-center shadow-lg">
                      {ContactIcons.database}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Database
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        SQLD (SQL 개발자)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        한국데이터산업진흥원
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {ContactIcons.verifiedCyan}
                      <p className="text-xs text-[#06B6D4] font-medium">2024.04.05</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 경험 섹션 - 오른쪽 컬럼 아래에 추가 */}
              <div ref={experienceRef}>
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <div className="space-y-6 sm:space-y-2">
                    {MY_EXPERIENCE.map((item, index) => (
                      <div key={item.title} className="experience-item">
                        {/* 섹션 라벨 추가 */}
                        {index === 0 && (
                          <div className="mb-4">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full mr-3 sm:mr-4"></div>
                              Experience
                            </h4>
                          </div>
                        )}

                        {/* Education 섹션 시작 */}
                        {item.type === 'education' && (
                          <div className="mb-4">
                            <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] rounded-full mr-3 sm:mr-4"></div>
                              Education
                            </h4>
                          </div>
                        )}

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg ${
                                  item.type === 'education'
                                    ? 'bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]'
                                    : 'bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]'
                                }`}
                              >
                                {item.type === 'education'
                                  ? ExperienceIcons.education
                                  : ExperienceIcons.experience}
                              </div>
                              <div>
                                <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                                  {item.company}
                                </p>
                                {item.experience && (
                                  <p className="text-xs text-[var(--brand-primary)] font-medium bg-[var(--brand-primary)]/10 dark:bg-[var(--brand-primary)]/20 px-2 py-1 rounded-full inline-block">
                                    {item.experience}
                                  </p>
                                )}
                              </div>
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              {ExperienceIcons.calendar}
                              <span className="ml-2">{item.duration}</span>
                            </p>
                          </div>
                        </div>

                        {/* 구분선 (마지막 항목 제외) */}
                        {index < MY_EXPERIENCE.length - 1 && (
                          <div className="border-t border-gray-200 dark:border-gray-600 mt-4 sm:mt-6 pt-4 sm:pt-6"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 장식 요소 */}
        <div className="mt-12 sm:mt-35 flex items-center justify-center slide-up-and-fade">
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
            <div className="w-6 sm:w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent"></div>
            <div className="text-lg sm:text-xl md:text-3xl text-gray-600 dark:text-gray-400 uppercase font-medium">
              skills
            </div>
            <div className="w-6 sm:w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent"></div>
          </div>
        </div>

        {/* Skills 섹션 */}
        <div className="mt-12 sm:mt-16 md:mt-24" ref={skillsRef}>
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {Object.entries(MY_STACK).map(([key, value]) => (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 md:gap-0" key={key}>
                <div className="sm:col-span-5 mb-4 sm:mb-0">
                  <p className="slide-up text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-none text-gray-600 dark:text-gray-400 uppercase">
                    {key}
                  </p>
                </div>

                <div className="sm:col-span-7 flex gap-x-4 sm:gap-x-6 md:gap-x-11 gap-y-4 sm:gap-y-6 md:gap-y-9 flex-wrap">
                  {value.map((item) => (
                    <div
                      className="slide-up flex gap-2 sm:gap-3.5 items-center leading-none"
                      key={item.name}
                    >
                      <div>
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={28}
                          height={28}
                          className="max-h-7 sm:max-h-8 md:max-h-10 w-auto h-auto"
                          unoptimized
                        />
                      </div>
                      <span className="text-base sm:text-lg md:text-xl lg:text-2xl capitalize text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
