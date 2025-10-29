'use client';
import React, { FC, useCallback, useLayoutEffect, useRef } from 'react';

import { gsap, Expo, Power4 } from 'gsap';

interface Pos {
  x?: number;
  y?: number;
}

interface Vel {
  x?: number;
  y?: number;
}

type Diff = number | undefined;

interface SetFunctions {
  x?: unknown;
  y?: unknown;
  r?: unknown;
  sx?: unknown;
  sy?: unknown;
  width?: unknown;
  rt?: unknown;
}

function getScale(diffX: Diff, diffY: Diff) {
  if (diffX && diffY) {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return Math.min(distance / 735, 0.35);
  }
  return;
}

function getAngle(diffX: Diff, diffY: Diff) {
  if (diffX && diffY) {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI;
  }
  return;
}

const EMPTY = {};
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === 'function' ? value() : value;
  }
  return ref.current;
}

function useTicker(callback: () => void, paused?: boolean) {
  useLayoutEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

interface CursorProps {
  isGelly?: boolean;
  animationDuration?: number;
  animationEase?: string | gsap.EaseFunction | undefined;
  gellyAnimationAmount?: number;
  gellyAnimationDuration?: number;
  magneticAnimationAmount?: number;
  magneticAnimationDuration?: number;
  magneticAnimationEase?: string | gsap.EaseFunction | undefined;
  colorAnimationEase?: string | gsap.EaseFunction | undefined;
  colorAnimationDuration?: number;
  backgroundImageAnimationEase?: string | gsap.EaseFunction | undefined;
  backgroundImageAnimationDuration?: number;
  sizeAnimationEase?: string | gsap.EaseFunction | undefined;
  sizeAnimationDuration?: number;
  textAnimationEase?: string | gsap.EaseFunction | undefined;
  textAnimationDuration?: number;
  cursorSize?: number;
  cursorBackgrounColor?: string;
  exclusionBackgroundColor?: string;
  cursorInnerColor?: string;
}

export const Cursor: FC<CursorProps> = ({
  isGelly = true,
  animationDuration = 0.5,
  animationEase = Expo.easeOut,
  gellyAnimationAmount = 50,
  magneticAnimationAmount = 0.1,
  magneticAnimationDuration = 0.7,
  magneticAnimationEase = Power4.easeOut,
  colorAnimationEase = Power4.easeOut,
  colorAnimationDuration = 0.5,
  backgroundImageAnimationEase = undefined,
  backgroundImageAnimationDuration = 0,
  sizeAnimationEase = Expo.easeOut,
  sizeAnimationDuration = 0.8,
  textAnimationEase = Expo.easeOut,
  textAnimationDuration = 1,
  cursorSize = 10,
  cursorBackgrounColor = '#000',
  exclusionBackgroundColor = '#fff',
  cursorInnerColor = '#fff',
}) => {
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorInner = useRef<HTMLDivElement | null>(null);

  const pos: Pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel: Vel = useInstance(() => ({ x: 0, y: 0 }));
  const set: SetFunctions = useInstance(() => ({}));

  useLayoutEffect(() => {
    set.x = gsap.quickSetter(cursor.current, 'x', 'px');
    set.y = gsap.quickSetter(cursor.current, 'y', 'px');

    if (isGelly) {
      set.r = gsap.quickSetter(cursor.current, 'rotate', 'deg');
      set.sx = gsap.quickSetter(cursor.current, 'scaleX');
      set.sy = gsap.quickSetter(cursor.current, 'scaleY');
      set.width = gsap.quickSetter(cursor.current, 'width', 'px');
      set.rt = gsap.quickSetter(cursorInner.current, 'rotate', 'deg');
    }
  });

  const loop = useCallback(() => {
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    (set.x as (value: number) => void)?.(pos.x || 0);
    (set.y as (value: number) => void)?.(pos.y || 0);

    if (isGelly && scale && rotation && cursor.current) {
      (set.width as (value: string) => void)?.(
        cursor.current?.style.height + scale * gellyAnimationAmount
      );
      (set.r as (value: number) => void)?.(rotation);
      (set.sx as (value: number) => void)?.(1 + scale);
      (set.sy as (value: number) => void)?.(1 - scale);
      (set.rt as (value: number) => void)?.(-rotation);
    }
  }, [gellyAnimationAmount, isGelly, pos.x, pos.y, set, vel.x, vel.y]);

  const setupEventListeners = useCallback(() => {
    const sizeElements = document.querySelectorAll(
      '[data-cursor-size]'
    ) as unknown as NodeListOf<HTMLElement>;
    const textElements = document.querySelectorAll(
      '[data-cursor-text]'
    ) as unknown as NodeListOf<HTMLElement>;
    const colorElements = document.querySelectorAll(
      '[data-cursor-color]'
    ) as unknown as NodeListOf<HTMLElement>;
    const backgroundImageElements = document.querySelectorAll(
      '[data-cursor-background-image]'
    ) as unknown as NodeListOf<HTMLElement>;
    const magneticElements = document.querySelectorAll(
      '[data-cursor-magnetic]'
    ) as unknown as NodeListOf<HTMLElement>;
    const exclusionElements = document.querySelectorAll(
      '[data-cursor-exclusion]'
    ) as unknown as NodeListOf<HTMLElement>;

    let hasExclusionAlready = false;

    const setupSizeListeners = () => {
      sizeElements.forEach((el) => {
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            gsap.to(`#${cursor.current.id}`, {
              width: `${e.target.dataset['cursorSize']}`,
              height: `${e.target.dataset['cursorSize']}`,
              duration: sizeAnimationDuration,
              ease: sizeAnimationEase,
            });
          }
        });
      });
      sizeElements.forEach((el) => {
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            gsap.to(`#${cursor.current.id}`, {
              width: `${cursorSize}`,
              height: `${cursorSize}`,
              duration: sizeAnimationDuration,
              ease: sizeAnimationEase,
            });
          }
        });
      });
    };

    const setupTextListeners = () => {
      textElements.forEach((el) => {
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursorInner.current) {
            cursorInner.current.textContent = `${e.target.dataset['cursorText']}`;
            gsap.to(`#${cursorInner.current.id}`, {
              scale: 1,
              opacity: 1,
              duration: textAnimationDuration,
              ease: textAnimationEase,
            });
          }
        });
      });
      textElements.forEach((el) => {
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursorInner.current) {
            cursorInner.current.textContent = '';
            gsap.to(`#${cursorInner.current.id}`, {
              scale: 0,
              opacity: 0,
              duration: textAnimationDuration,
              ease: textAnimationEase,
            });
          }
        });
      });
    };

    const setupColorListeners = () => {
      colorElements.forEach((el) => {
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            gsap.to(`#${cursor.current.id}`, {
              backgroundColor: `${e.target.dataset['cursorColor']}`,
              duration: colorAnimationDuration,
              ease: colorAnimationEase,
            });
          }
        });
      });
      colorElements.forEach((el) => {
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            gsap.to(`#${cursor.current.id}`, {
              backgroundColor: `${cursorBackgrounColor}`,
              duration: colorAnimationDuration,
              ease: colorAnimationEase,
            });
          }
        });
      });
    };

    const setupExclusionListeners = () => {
      exclusionElements.forEach((el) => {
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            cursor.current.style.mixBlendMode = 'exclusion';
            cursor.current.style.background = `${exclusionBackgroundColor}`;
          }
        });
      });
      exclusionElements.forEach((el) => {
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursor.current) {
            cursor.current.style.mixBlendMode = '';
            cursor.current.style.background = `${cursorBackgrounColor}`;
          }
        });
      });
    };

    const setupBackgroundImageListeners = () => {
      backgroundImageElements.forEach((el) => {
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursorInner.current) {
            if (cursor.current) {
              if (cursor.current.style.mixBlendMode === 'exclusion') hasExclusionAlready = true;

              cursor.current.style.mixBlendMode = 'exclusion';
              cursor.current.style.backgroundColor = 'transform';
            }
            gsap.to(`#${cursorInner.current.id}`, {
              scale: 1,
              opacity: 1,
              background: `url("${e.target.dataset['cursorBackgroundImage']}")`,
              filter: 'invert(1)',
              duration: backgroundImageAnimationDuration,
              ease: backgroundImageAnimationEase,
            });
          }
        });
      });
      backgroundImageElements.forEach((el) => {
        el.addEventListener('mouseleave', (e: MouseEvent) => {
          if (e.target instanceof HTMLElement && cursorInner.current) {
            if (cursor.current) {
              if (!hasExclusionAlready) {
                cursor.current.style.mixBlendMode = '';
                cursor.current.style.backgroundColor = `${cursorBackgrounColor}`;
              } else {
                cursor.current.style.backgroundColor = `${exclusionBackgroundColor}`;
              }
            }
            gsap.to(`#${cursorInner.current.id}`, {
              scale: 0,
              opacity: 0,
              background: ``,
              filter: 'none',
              duration: backgroundImageAnimationDuration,
            });
          }
        });
      });
    };

    const setupMagneticListeners = () => {
      magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
          const areatarget = e.target as HTMLElement;
          gsap.to(areatarget, {
            x:
              (e.clientX -
                (areatarget.offsetLeft - window.pageXOffset) -
                areatarget.clientWidth / 2) *
              magneticAnimationAmount,
            y:
              (e.clientY -
                (areatarget.offsetTop - window.pageYOffset) -
                areatarget.clientHeight / 2) *
              magneticAnimationAmount,
            duration: magneticAnimationDuration,
            ease: magneticAnimationEase,
          });
        });
      });
      magneticElements.forEach((el) => {
        el.addEventListener('mouseleave', (e) => {
          const areatarget = e.target as HTMLElement;
          gsap.to(areatarget, {
            x: 0,
            y: 0,
            duration: magneticAnimationDuration,
            ease: magneticAnimationEase,
          });
        });
      });
    };

    setupSizeListeners();
    setupTextListeners();
    setupColorListeners();
    setupExclusionListeners();
    setupBackgroundImageListeners();
    setupMagneticListeners();

    return () => {
      sizeElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      textElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      colorElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      exclusionElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      backgroundImageElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      magneticElements.forEach((el) => {
        el.removeEventListener('mousemove', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, [
    sizeAnimationDuration,
    sizeAnimationEase,
    cursorSize,
    textAnimationDuration,
    textAnimationEase,
    colorAnimationDuration,
    colorAnimationEase,
    cursorBackgrounColor,
    exclusionBackgroundColor,
    backgroundImageAnimationDuration,
    backgroundImageAnimationEase,
    magneticAnimationAmount,
    magneticAnimationDuration,
    magneticAnimationEase,
  ]);

  useLayoutEffect(() => {
    const setFromEvent = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const duration = animationDuration;
      const ease = animationEase;

      gsap.set(pos, {});

      const xTo = gsap.quickTo(pos, 'x', {
        duration,
        ease,
        onUpdate: () => {
          if (pos.x) vel.x = x - pos.x;
        },
      });

      const yTo = gsap.quickTo(pos, 'y', {
        duration,
        ease,
        onUpdate: () => {
          if (pos.y) vel.y = y - pos.y;
        },
      });

      xTo(x);
      yTo(y);

      loop();
    };

    window.addEventListener('mousemove', setFromEvent);

    document.body.addEventListener('mouseenter', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && cursor.current) {
        gsap.to(`#${cursor.current.id}`, {
          opacity: 1,
          duration: animationDuration,
          ease: animationEase,
        });
      }
    });

    document.body.addEventListener('mouseleave', (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && cursor.current) {
        gsap.to(`#${cursor.current.id}`, {
          opacity: 0,
          duration: animationDuration,
          ease: animationEase,
        });
      }
    });

    const cleanup = setupEventListeners();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const hasNewCursorElements = Array.from(mutation.addedNodes).some((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              return (
                element.hasAttribute('data-cursor-text') ||
                element.hasAttribute('data-cursor-size') ||
                element.hasAttribute('data-cursor-color') ||
                element.hasAttribute('data-cursor-exclusion') ||
                element.hasAttribute('data-cursor-background-image') ||
                element.hasAttribute('data-cursor-magnetic') ||
                element.querySelector('[data-cursor-text]') ||
                element.querySelector('[data-cursor-size]') ||
                element.querySelector('[data-cursor-color]') ||
                element.querySelector('[data-cursor-exclusion]') ||
                element.querySelector('[data-cursor-background-image]') ||
                element.querySelector('[data-cursor-magnetic]')
              );
            }
            return false;
          });

          if (hasNewCursorElements) {
            cleanup();
            const newCleanup = setupEventListeners();
            Object.assign(cleanup, newCleanup);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', setFromEvent);
      document.body.removeEventListener('mouseenter', () => {});
      document.body.removeEventListener('mouseleave', () => {});
      observer.disconnect();
      cleanup();
    };
  }, [setupEventListeners, animationDuration, animationEase, loop, pos, vel]);

  useTicker(loop);

  return (
    <div
      ref={cursor}
      id={'c-cursor'}
      className="c-cursor"
      style={{
        width: cursorSize,
        height: cursorSize,
        background: cursorBackgrounColor,
      }}
    >
      <div
        style={{ color: cursorInnerColor }}
        ref={cursorInner}
        id={'c-cursorInner'}
        className="c-cursor__inner"
      />
    </div>
  );
};
