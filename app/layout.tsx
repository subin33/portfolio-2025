import type { Metadata } from 'next';
import './globals.css';
import { MediaContextProvider } from '@/lib/responsive/media';
import Navbar from '@/components/layout/Navbar';
import { Cursor } from '@/components/layout/CustomCursor';
import ScrollPositionManager from '@/components/common/ScrollPositionManager';
import Loader from '@/components/sections/home/Loader';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    default: ' Frontend Developer Portfolio',
    template: '%s | Portfolio',
  },
  description:
    'Frontend Developer with 1.8+ years of practical experience. Building thoughtful user experiences with modern web technologies.',
  keywords: [
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: 'name' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://buly.kr/15PltFz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Frontend Developer Portfolio',
    description:
      'Frontend Developer with 1.8+ years of practical experience. Building thoughtful user experiences with modern web technologies.',
    url: 'https://buly.kr/15PltFz',
    siteName: 'Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio',
        type: 'image/png',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Developer Portfolio',
    description: 'Frontend Developer with 1.8+ years of practical experience.',
    images: ['/public/og-image.png'],
    creator: '@portfolio',
    site: '@portfolio',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/assets/fonts/clash-display/ClashDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/clash-display/ClashDisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/clash-display/ClashDisplay-Semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6366F1" />
        <meta name="color-scheme" content="light dark" />

        {/* PWA 관련 메타 태그 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Portfolio" />

        {/* 보안 관련 메타 태그 */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* 추가 소셜 미디어 최적화 - 카카오톡, 페이스북 등에서 더 나은 미리보기를 위해 */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:secure_url" content="https://buly.kr/15PltFz/og-image.png" />

        {/* 카카오톡 특화 메타 태그 */}
        <meta property="og:image:alt" content="Portfolio" />
        <meta property="og:site_name" content="Portfolio" />
        <meta property="og:locale" content="ko_KR" />
      </head>
      <body
        className="antialiased bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300"
        suppressHydrationWarning
      >
        <MediaContextProvider>
          <ScrollPositionManager />
          <Cursor />
          <Loader />
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
        </MediaContextProvider>

        <Analytics />
      </body>
    </html>
  );
}
