'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import { useEffect } from 'react';
import SectionTitle from '@/components/ui/common/SectionTitle';
import TechStack from '@/components/ui/common/TechStack';
import { PortfolioData } from '@/lib/data/portfolioData';
import Button from '@/components/ui/button/Button';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Portfolios 컴포넌트 타입 정의
const Portfolios: React.FC = () => {
  // 데스크톱 환경에서만 실행 (화면 너비가 1024px 초과인 경우)
  useEffect(() => {
    // 데스크톱 환경이 아닌 경우 애니메이션 실행하지 않음
    if (typeof window === 'undefined' || window.innerWidth <= 1024) {
      return;
    }

    const ctx = gsap.context(() => {
      // 섹션 개수와 컨테이너 설정
      const sectionLength: number = document.getElementsByClassName('portfolio-item').length;
      const foc_container: HTMLElement | null = document.querySelector('.portfolio-items');

      if (!foc_container) return;

      // 컨테이너 너비 설정
      const newWidth: number = sectionLength * 100;
      foc_container.style.width = newWidth + '%';

      // GSAP 유틸리티로 섹션들 배열화
      const foc_sections: Element[] = gsap.utils.toArray('.portfolio-items .portfolio-item');

      // 네비게이션 링크들과 섹션들 가져오기
      const navbarLinks: NodeListOf<Element> = document.querySelectorAll('.portfolio-list li a');
      const sections: Element[] = gsap.utils.toArray('.portfolio-item');

      // 스크롤 트윈 설정
      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: '#portfolios',
          pin: true,
          scrub: 0.5,
          start: 'top top',
          end: () => `+=${foc_container.offsetWidth - window.innerWidth}`,
          markers: false,
          snap: {
            snapTo: 1 / (foc_sections.length - 1),
            inertia: true,
            duration: { min: 0.3, max: 0.8 },
          },
          invalidateOnRefresh: true,
        },
      });

      // 섹션들을 가로로 이동시키는 애니메이션
      scrollTween.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
      });

      // 각 섹션에 대한 ScrollTrigger 생성
      sections.forEach((section: Element, i: number) => {
        const relatedLink: Element | null = document.querySelector(
          `[data-section="${section.id}"]`
        );

        ScrollTrigger.create({
          trigger: section,
          start: 'left 50%',
          end: 'right 50%',
          containerAnimation: scrollTween,
          markers: false,
          id: `section-${i + 1}`,
          onToggle: (self: ScrollTrigger) => {
            const currentActive: Element | null = document.querySelector('.portfolio-list .active');
            if (self.isActive && relatedLink) {
              relatedLink.classList.add('active');
              if (currentActive && currentActive !== relatedLink) {
                currentActive.classList.remove('active');
              }
            } else if (relatedLink) {
              relatedLink.classList.remove('active');
            }
          },
        });
      });

      // 네비게이션 링크 클릭 이벤트 처리
      navbarLinks.forEach((anchor: Element) => {
        anchor.addEventListener('click', function (e: Event) {
          e.preventDefault();
          const target = e.target as HTMLAnchorElement;
          const targetElem: HTMLElement | null = document.querySelector(
            target.getAttribute('href') || ''
          ) as HTMLElement;

          if (targetElem && foc_container.isSameNode(targetElem.parentElement)) {
            // ScrollTrigger와 속성들이 정의되어 있는지 확인
            if (
              scrollTween.scrollTrigger &&
              'end' in scrollTween.scrollTrigger &&
              'start' in scrollTween.scrollTrigger
            ) {
              const totalScroll: number =
                scrollTween.scrollTrigger.end - scrollTween.scrollTrigger.start;
              const totalMovement: number = (foc_sections.length - 1) * targetElem.offsetWidth;
              const y: number = Math.round(
                scrollTween.scrollTrigger.start +
                  (targetElem.offsetLeft / totalMovement) * totalScroll
              );

              gsap.to(window, {
                scrollTo: {
                  y: y,
                  autoKill: false,
                },
                duration: 1,
              });
            }
          }
        });
      });
    });

    // 컴포넌트 언마운트 시 컨텍스트 정리
    return () => ctx.revert();
  }, []);

  // 네비게이션 리스트 애니메이션
  useEffect(() => {
    // 데스크톱 환경이 아닌 경우 애니메이션 실행하지 않음
    if (typeof window === 'undefined' || window.innerWidth <= 1024) {
      return;
    }

    const ctx = gsap.context(() => {
      const PortfolioList: NodeListOf<Element> = document.querySelectorAll('.portfolio-list li');

      gsap.fromTo(
        PortfolioList,
        {
          scrollTrigger: {
            trigger: '.portfolio-list',
            start: 'top 80%',
          },
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="lg:block hidden md:pb-[15%]">
      <div className="content">
        <div className="w-[85%] mx-auto overflow-hidden">
          <SectionTitle title="Portfolio" />

          {/* 네비게이션 버튼들 */}
          <div className="portfolio-button">
            <ul className="portfolio-list flex-all">
              {PortfolioData.map((portfolio) => (
                <li key={portfolio.id} className="" data-section={portfolio.id}>
                  <a href={`#${portfolio.id}`} className="anchor">
                    {portfolio.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="Portfolio-Scroll">
          <div className="Portfolios-Container" id="panels">
            <div className="portfolio-items fadeUp" id="panels-container">
              {PortfolioData.map((Portfolio) => (
                <div key={Portfolio.id} className="portfolio-item w-full h-full" id={Portfolio.id}>
                  <div className="portfolio-content">
                    <div className="portfolio-item-left">
                      <Image
                        src={Portfolio.image}
                        alt={Portfolio.imageAlt}
                        width={800}
                        height={600}
                        className="w-full h-full object-contain"
                        style={{ aspectRatio: 'auto' }}
                        priority
                      />
                    </div>
                    <div className="portfolio-item-right">
                      <h4 className="title-3xl mb-4">
                        <span className="text-gradient-brand font-bold text-4xl">
                          {Portfolio.title}
                        </span>
                      </h4>

                      {/* 기술 스택이 있는 경우에만 표시 */}
                      {Portfolio.technologies && (
                        <TechStack technologies={Portfolio.technologies} />
                      )}
                      <p className="content-p mb-[1.5vw] leading-relaxed text-gray-600 dark:text-gray-300">
                        <span>{Portfolio.description}</span>
                      </p>

                      {/* 버튼 그룹 - GitHub, 데모, 상세보기 링크 표시 */}
                      {(Portfolio.githubLink || Portfolio.demoLink || Portfolio.detailLink) && (
                        <div className="flex flex-wrap gap-3 mt-[2vw]">
                          {Portfolio.githubLink && Portfolio.githubLink !== '#' && (
                            <Button
                              text="GitHub"
                              url={Portfolio.githubLink}
                              icon="github"
                              variant="primary"
                            />
                          )}

                          {Portfolio.demoLink && Portfolio.demoLink !== '#' && (
                            <Button
                              text="Live Site"
                              url={Portfolio.demoLink}
                              icon="external"
                              variant="primary"
                            />
                          )}

                          {Portfolio.detailLink && Portfolio.detailLink !== '#' && (
                            <Button
                              text="상세보기"
                              url={Portfolio.detailLink}
                              icon="detail"
                              variant="primary"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolios;
