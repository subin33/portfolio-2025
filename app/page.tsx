'use client';
import dynamic from 'next/dynamic';

import Main from '@/components/sections/home/Main';
import AboutMe from '@/components/sections/About/AboutMe';
import TopMessage from '@/components/sections/home/TopMessage';

import Projects from '@/components/sections/Project/Projects';
import Contact from '@/components/sections/Contact/Contact';
import ContactDetails from '@/components/sections/Contact/ContactDetails';
const MiniGames = dynamic(() => import('@/components/sections/MiniProject/MiniGames'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
  ssr: false,
});
const MiniProjects = dynamic(() => import('@/components/sections/MiniProject/MiniProjects'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
  ssr: false,
});
const ParallaxGallery = dynamic(() => import('@/components/sections/home/ParallaxGallery'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
  ssr: false,
});
const PortfolioMarquee = dynamic(() => import('@/components/sections/home/PortfolioMarquee'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
  ssr: false,
});
const BottomMessage = dynamic(() => import('@/components/sections/home/BottomMessage'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
  ssr: false,
});
import Portfolios from '@/components/sections/Portfolio/Portfolios';
const PortfoliosMobile = dynamic(() => import('@/components/sections/Portfolio/PortfolioMobile'), {
  loading: () => <div className="min-h-screen bg-gray-50 animate-pulse" />,
  ssr: false,
});

import { Media } from '@/lib/responsive/media';

export default function Home() {
  return (
    <div>
      <Main />
      <AboutMe />
      <TopMessage text="Learning every day to become a developer who listens and builds with purpose" />
      <section id="projects">
        <Projects />
      </section>

      <section id="portfolios">
        <Media greaterThan="mobile">
          <Portfolios />
        </Media>
        <Media at="mobile">
          <PortfoliosMobile />
        </Media>
      </section>

      <section id="mini-game-project">
        <MiniGames />
      </section>

      <section id="mini-project">
        <MiniProjects />
      </section>

      <section id="portfolio-marquee">
        <PortfolioMarquee />
      </section>

      <section id="parallax-gallery">
        <Media greaterThan="mobile">
          <ParallaxGallery />
        </Media>
      </section>

      <section id="contact">
        <ContactDetails />
      </section>

      <BottomMessage text="good things happen when you say hello" />

      <section>
        <Contact />
      </section>
    </div>
  );
}
