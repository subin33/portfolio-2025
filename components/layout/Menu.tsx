'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Menu.module.css';

interface MenuState {
  clicked: boolean;
}

interface MenuProps {
  state: MenuState;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

interface SocialLink {
  name: string;
  link: string;
}

interface MenuLink {
  name: string;
  link: string;
}

export default function Menu({ state, isMenuOpen, toggleMenu }: MenuProps) {
  const menu = useRef<HTMLDivElement>(null);
  const revealMenu = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const links = Array.from({ length: 16 }, () => useRef<HTMLDivElement>(null));

  useEffect(() => {
    const menuLoaderBar = document.querySelectorAll(`.${styles.menuLoaderBar}`);
    const linksToShow = links.map((link) => link.current).filter(Boolean);

    if (state.clicked === false) {
      gsap.to(revealMenu.current, { opacity: 0, duration: 0.2 });
      gsap.to(menuLoaderBar, { width: '0', duration: 0.4, stagger: 0.1 });
      gsap.to([menu.current], { css: { display: 'none' }, delay: 1.2 });
    } else if (state.clicked) {
      gsap.to([menu.current], { css: { display: 'block' } });
      gsap.to(menuLoaderBar, { width: '100%', duration: 0.4, stagger: 0.1 });
      gsap.to(revealMenu.current, { opacity: 1, duration: 0.5, delay: 0.6 });

      gsap.to(linksToShow, {
        duration: 0,
        rotationX: 0,
        opacity: 1,
        translateY: 0,
        transformPerspective: '1000',
        transformOrigin: 'top center',
      });

      gsap.from(linksToShow, {
        delay: 0.7,
        duration: 0.7,
        opacity: 0,
        translateY: 200,
        rotationX: -80,
        stagger: 0.1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div ref={menu} className={styles.nav} id="mb_nav" data-cursor-exclusion>
      <div className={styles.menuLoaderBars}>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <span key={i} className={`${styles.menuLoaderBar} menuLoaderBar`}></span>
          ))}
      </div>

      {/* 메뉴 레이어 */}
      <div ref={revealMenu} className={styles.menuLayer}>
        {/* 로고 컨테이너 */}
        <div className={styles.menuLogoContainer}>
          <Link href="/" prefetch={false}>
            <Image
              src="/assets/logos/logo.png"
              width={80}
              height={80}
              alt="Enigma Logo"
              title="Enigma Logo"
              className="w-[2.5vw] invert lg:w-[2.5vw] md:w-[6vw] sm:w-[35px]"
            />
          </Link>
        </div>

        <button
          className={`${styles.menuButtonInside} ${isMenuOpen ? styles.opened : ''}`}
          id="menuButton"
          onClick={toggleMenu}
          aria-label="Main Menu"
          data-cursor-opaque
          data-cursor-size="60px"
        >
          <svg viewBox="0 0 100 100" className="w-[40px] h-auto md:w-[6vw] lg:w-[2.5vw]">
            <path
              className={`${styles.line} ${styles.line1}`}
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className={`${styles.line} ${styles.line2}`} d="M 20,50 H 80" />
            <path
              className={`${styles.line} ${styles.line3}`}
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>

        {/* 메뉴 콘텐츠 래퍼 */}
        <div className={styles.wrapper}>
          {/* 왼쪽 메뉴 링크 */}
          <div className={styles.contentLeft}>
            {MenuLinks.map((link, index) => (
              <div key={index} className={styles.navLinkItem} ref={links[index]}>
                <span className={styles.contentHeadingSerial}>0{index + 1}</span>
                <Link
                  prefetch={false}
                  href={link.link}
                  className={styles.navLink}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* 오른쪽 소셜 링크 및 연락처 */}
          <div className={styles.contentRight}>
            <div className={styles.contentRightBody}>
              {/* 소셜 링크 섹션 */}
              <div className={styles.contentRightBodyTop}>
                <div className={styles.contentTitle} ref={links[6]}>
                  let&apos;s be friends
                </div>
                <div className={styles.socialItems}>
                  {SocialLinks.map((item, index) => (
                    <div
                      key={index}
                      className={styles.socialItem}
                      ref={links[7 + index]}
                      data-cursor-opaque
                      data-cursor-size="50px"
                    >
                      <Link
                        className="en-main-link"
                        target={
                          item.name === 'Contact' || item.name === 'Portfolio' ? undefined : 'blank'
                        }
                        href={item.link}
                        prefetch={item.name === 'Resume' ? false : undefined}
                        rel={
                          item.name === 'Resume'
                            ? 'noopener, noreferrer'
                            : item.name === 'Contact' || item.name === 'Portfolio'
                            ? undefined
                            : 'nofollow, noreferrer'
                        }
                        onClick={item.name === 'Resume' ? undefined : toggleMenu}
                      >
                        <span data-text={item.name}>{item.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 연락처 섹션 */}
              <div className={styles.contentRightBodyTop}>
                <div className={styles.contentTitle} ref={links[13]}>
                  contact
                </div>
                <div className={styles.contentRightBottom}>
                  <div
                    className={styles.socialItem}
                    ref={links[14]}
                    data-cursor-opaque
                    data-cursor-size="50px"
                  >
                    <Link
                      className="en-link-under"
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=test@naver.com&su=포트폴리오 문의"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Gmail로 이메일 보내기"
                    >
                      <span>test@naver.com</span>
                    </Link>
                  </div>
                  <div
                    className={styles.socialItem}
                    ref={links[15]}
                    data-cursor-opaque
                    data-cursor-size="50px"
                  >
                    <Link className="en-main-link" href="tel:+82 10 0000 0000">
                      <span data-text="+82 10 0000 0000">+82 10 0000 0000</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  {
    name: 'Contact',
    link: '#contact',
  },
  {
    name: 'Portfolio',
    link: '#about-me',
  },
  {
    name: 'Resume',
    link: '#about-me',
  },
];

// 메뉴 링크 데이터
const MenuLinks: MenuLink[] = [
  {
    name: 'About Me',
    link: '#about-me',
  },
  {
    name: 'Project',
    link: '#projects',
  },
  {
    name: 'Portfolio',
    link: '#portfolios',
  },
  {
    name: 'Mini Game',
    link: '#mini-game-project',
  },
  {
    name: 'Mini Project',
    link: '#mini-project',
  },
  {
    name: 'Contact',
    link: '#contact',
  },
];
