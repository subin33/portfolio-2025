'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface LazyGifProps {
  poster?: string;
  videoSrc: string;
  className?: string;
  style?: React.CSSProperties;
}

const LazyGif: React.FC<LazyGifProps> = ({ poster, videoSrc, className = '', style }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  useEffect(() => {
    const element = imgRef.current;

    if (!('IntersectionObserver' in window)) {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect(); // 요소가 로드되면 observer 해제
        }
      });
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (observer && element) {
        observer.unobserve(element);
      }
    };
  }, [videoSrc]);

  return (
    <Image
      ref={imgRef}
      src={isInViewport ? videoSrc : poster || ''}
      alt="GIF 애니메이션"
      className={className}
      style={style}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
      loading="lazy"
      unoptimized={videoSrc.endsWith('.gif')}
    />
  );
};

export default LazyGif;
