'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLenisFunctions } from '@/lib/utils/scroll';
import Menu from './Menu';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import Showreel from './Showreel';
import { usePathname } from 'next/navigation';

interface MenuState {
  initial: boolean | null;
  clicked: boolean;
}

const Navbar: React.FC = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-inner-container', {
        duration: 1,
        y: -100,
        delay: 3,
      });
    });
    return () => ctx.revert();
  }, []);

  const lenis = useLenis();
  const { startLenis, stopLenis } = useLenisFunctions();
  const [menuState, setMenuState] = useState<MenuState>({ initial: false, clicked: false });
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isShowreel, setIsShowreel] = useState<boolean>(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

  const pathname = usePathname();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 확인
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

      if (initialTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }

      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.start();
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 확인
    if (typeof window !== 'undefined') {
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setIsHeaderVisible(currentScrollY <= lastScrollY);
        lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const btnDisable = (): void => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  const toggleDarkMode = (): void => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const openShowreel = (): void => {
    setIsShowreel(true);
    stopLenis();
  };

  const closeShowreel = (): void => {
    setIsShowreel(false);
    startLenis();
  };

  const toggleMenu = (): void => {
    if (disabled) return;
    btnDisable();

    setIsMenuOpen((prev) => !prev);
    if (menuState.initial === false) {
      setMenuState({ initial: null, clicked: true });
      stopLenis();
    } else {
      setMenuState({ initial: null, clicked: !menuState.clicked });
      startLenis();
    }
  };

  if (!isLoaded) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[10]">
        <div className="w-[85%] mx-auto flex justify-between items-center py-[4vw] md:w-[90%] md:py-[3vw] lg:w-[92%] lg:py-[1.5vw] header-inner-container">
          <div className="w-[34px] h-full md:w-[6vw] lg:w-[2.3vw]">
            <div className="w-[80px] h-[80px] bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center justify-end gap-[6vw] md:gap-[5vw] lg:gap-[3vw]">
            <div className="w-[60px] h-[30px] bg-gray-200 rounded animate-pulse"></div>
            <div className="w-[30px] h-[30px] bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-[40px] h-[40px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[30] transition-transform duration-500 bg-gray-200/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-[85%] mx-auto flex justify-between items-center py-[4vw] md:w-[90%] md:py-[3vw] lg:w-[92%] lg:py-[1vw] header-inner-container">
          <div className="w-[34px] h-full md:w-[6vw] lg:w-[2.3vw]">
            <Link href="/" aria-label="Go to Homepage" prefetch={false}>
              <Image
                className="dark:invert"
                src="/assets/logos/logo.png"
                width={50}
                height={50}
                alt="Enigma Logo"
                title="Enigma Logo"
                data-cursor-size="60px"
                data-cursor-exclusion
                priority
              />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-[6vw] md:gap-[5vw] lg:gap-[3vw]">
            <div data-cursor-size="60px" data-cursor-exclusion>
              <button
                aria-label="Open Showreel"
                onClick={openShowreel}
                className="hidden md:block font-heading text-[3vw] font-medium lg:text-[1vw] text-[#1a1a1a] dark:text-[#ffffff]"
              >
                <span>subin33</span>
              </button>
            </div>
            <button
              aria-label="Toggle Dark Mode"
              onClick={toggleDarkMode}
              className={`rounded-full w-[30px] h-[30px] p-[4px] transition-all duration-500 md:w-[4vw] md:h-[4vw] md:p-[0.5vw] lg:w-[2.5vw] lg:h-[2.5vw] ${
                isDarkMode
                  ? 'rotate-[270deg] bg-gray-800 dark:bg-gray-200'
                  : 'rotate-90 bg-white dark:bg-gray-800'
              }`}
            >
              <Image
                className="w-full h-full transition-transform duration-300"
                src={isDarkMode ? '/assets/icons/ui/moon.svg' : '/assets/icons/ui/sun.svg'}
                width={30}
                height={30}
                alt="Dark Mode Icon"
                priority
              />
            </button>

            <button
              ref={menuBtnRef}
              aria-label="Open Menu"
              onClick={toggleMenu}
              className="relative flex items-center justify-center p-0 m-0 bg-none border-none cursor-pointer"
              data-cursor-exclusion
              data-cursor-size="60px"
            >
              <svg viewBox="0 0 100 100" className="w-[40px] h-auto md:w-[6vw] lg:w-[2.5vw]">
                {/* 공통 stroke 색상 정의 */}
                {(() => {
                  const strokeColor = isDarkMode || isMenuOpen ? '#ffffff' : '#000000';
                  return (
                    <>
                      {/* Line 1 */}
                      <path
                        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                        className="fill-none stroke-[6] stroke-linecap-round transition-all duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] transform translate-x-[5px]"
                        style={{
                          stroke: strokeColor,
                          strokeDasharray: isMenuOpen ? '60 207' : '55 207',
                          strokeDashoffset: isMenuOpen ? -140 : 0,
                        }}
                      />
                      {/* Line 2 */}
                      <path
                        d="M 20,50 H 80"
                        className="fill-none stroke-[6] stroke-linecap-round transition-all duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] transform translate-x-[5px]"
                        style={{
                          stroke: strokeColor,
                          strokeDasharray: isMenuOpen ? '1 50' : '55 50',
                          strokeDashoffset: isMenuOpen ? -30 : 0,
                        }}
                      />
                      {/* Line 3 */}
                      <path
                        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                        className="fill-none stroke-[6] stroke-linecap-round transition-all duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1)] transform translate-x-[5px]"
                        style={{
                          stroke: strokeColor,
                          strokeDasharray: isMenuOpen ? '60 207' : '55 207',
                          strokeDashoffset: isMenuOpen ? -140 : 0,
                        }}
                      />
                    </>
                  );
                })()}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Showreel */}
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 z-[20] pointer-events-none ${
          isShowreel ? 'pointer-events-auto' : ''
        }`}
        data-cursor-color="var(--brand-primary)"
        data-cursor-text="Close"
        data-cursor-size="100px"
      >
        <Showreel isShowreel={isShowreel} onClick={closeShowreel} />
      </div>

      <Menu state={menuState} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Navbar;
