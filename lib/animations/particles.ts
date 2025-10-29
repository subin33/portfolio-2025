import { gsap } from 'gsap';

// Particles 옵션 인터페이스 정의
export interface ParticlesOptions {
  container: HTMLElement | string | null;
  itemsSelector?: string;
  observable?: boolean;
  observableTarget?: HTMLElement | null;
  observableRefresh?: boolean;
  repeats?: number;
  timeScale?: number;
  initialSeek?: number;
  fadeInDuration?: number;
  fadeInEase?: string;
  fadeOutDuration?: number;
  fadeOutEase?: string;
  yStart?: string | (() => number);
  yEnd?: string | (() => number);
  xStart?: string | (() => number);
  xEnd?: string | (() => number);
  ease?: string;
  duration?: (() => number) | number;
  offset?: (() => number) | number;
}

// Particles 클래스 정의
export class Particles {
  private options: ParticlesOptions;
  private timeScale: number;
  private container: HTMLElement | null = null;
  private items: NodeListOf<Element> | null = null;
  private tl: gsap.core.Timeline | null = null;
  private observer: IntersectionObserver | null = null;

  constructor(options: ParticlesOptions) {
    this.options = Object.assign(
      {},
      {
        container: null,
        itemsSelector: '[data-particle-item]',
        observable: true,
        observableTarget: null,
        observableRefresh: true,
        repeats: -1,
        timeScale: 1.5,
        initialSeek: 3000,
        fadeOutDuration: 1,
        fadeOutEase: 'power4.out',
        yStart: '350',
        yEnd: '-500',
        ease: 'none',
        duration: () => gsap.utils.random(5, 10),
        offset: () => gsap.utils.random(0, 20),
      },
      options
    );

    this.timeScale = this.options.timeScale || 1.5;
    this.init();
  }

  /**
   * 파티클 초기화
   */
  private init(): void {
    this.container =
      typeof this.options.container === 'string'
        ? document.querySelector(this.options.container)
        : this.options.container;

    if (!this.container) {
      // 파티클 컨테이너를 찾을 수 없음
      return;
    }

    this.items = this.container.querySelectorAll(
      this.options.itemsSelector || '[data-particle-item]'
    );
    this.tl = this.createTimeline();

    if (this.options.observable) {
      this.observe();
    } else {
      this.start();
    }

    if (this.options.repeats === -1 && this.tl) {
      this.tl.seek(this.options.initialSeek || 3000);
    }
    this.bind();
  }

  /**
   * 이벤트 바인딩
   */
  private bind(): void {
    window.addEventListener('resize', this.refresh.bind(this));
  }

  /**
   * 이벤트 제거
   */
  private unbind(): void {
    window.removeEventListener('resize', this.refresh.bind(this));
  }

  /**
   * 파티클 새로고침
   */
  private refresh(): void {
    if (this.tl) {
      this.tl.invalidate();
    }
  }

  /**
   * 움직임 시작
   */
  public start(): void {
    if (this.tl) {
      this.tl.play().timeScale(this.timeScale);
    }
  }

  /**
   * 움직임 일시정지
   */
  public stop(): void {
    if (this.tl) {
      this.tl.pause();
    }
  }

  /**
   * IntersectionObserver로 컨테이너 또는 observable 요소 관찰 시작
   * @param observable - 선택적 관찰 요소
   */
  public observe(observable?: HTMLElement): void {
    if (observable) this.options.observableTarget = observable;
    if (this.observer) this.unobserve();

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.options.observableRefresh) this.refresh();
        this.start();
      } else {
        this.stop();
      }
    });

    const target = this.options.observableTarget || this.container;
    if (target) {
      this.observer.observe(target);
    }
  }

  /**
   * IntersectionObserver 제거
   */
  public unobserve(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * 움직임 타임스케일 값 설정
   * @param scale - 타임스케일 값
   */
  public setTimeScale(scale: number = 1): void {
    this.timeScale = scale;
    if (this.tl) {
      this.tl.timeScale(scale);
    }
  }

  /**
   * 현재 움직임 방향 반환
   * @returns 뒤집힌 경우 true
   */
  public isReversed(): boolean {
    return this.timeScale < 0;
  }

  /**
   * 움직임 방향 뒤집기
   * @param reverse - 뒤집힌 상태
   * @returns 뒤집힌 상태
   */
  public setReversed(reverse: boolean): boolean {
    if (reverse !== this.isReversed()) {
      this.setTimeScale(this.timeScale * -1);
    }
    return this.isReversed();
  }

  /**
   * 움직임의 GSAP 타임라인 반환
   * @returns GSAP 타임라인
   */
  public getTimeline(): gsap.core.Timeline | null {
    return this.tl;
  }

  /**
   * 움직임 타임라인 생성
   * @returns GSAP 타임라인
   */
  private createTimeline(): gsap.core.Timeline {
    const mtl = gsap.timeline({ paused: true });

    if (!this.items) return mtl;

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i] as HTMLElement;
      const tl = gsap.timeline({ repeat: this.options.repeats || -1 });
      const offset =
        typeof this.options.offset === 'function'
          ? this.options.offset()
          : this.options.offset || 0;

      tl.set(item, { willChange: 'transform' });

      if (this.options.fadeInDuration) {
        tl.fromTo(
          item,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: this.options.fadeInEase,
            duration: this.options.fadeInDuration,
            lazy: false,
          },
          0
        );
      }

      const yStart =
        typeof this.options.yStart === 'function' ? this.options.yStart() : this.options.yStart;
      const yEnd =
        typeof this.options.yEnd === 'function' ? this.options.yEnd() : this.options.yEnd;
      const xStart =
        typeof this.options.xStart === 'function' ? this.options.xStart() : this.options.xStart;
      const xEnd =
        typeof this.options.xEnd === 'function' ? this.options.xEnd() : this.options.xEnd;
      const duration =
        typeof this.options.duration === 'function'
          ? this.options.duration()
          : this.options.duration || 5;

      tl.fromTo(
        item,
        {
          y: yStart,
          x: xStart,
        },
        {
          y: yEnd,
          x: xEnd,
          ease: this.options.ease,
          duration: duration,
        },
        0
      );

      if (this.options.fadeOutDuration) {
        tl.to(
          item,
          {
            opacity: 0,
            ease: this.options.fadeOutEase,
            duration: this.options.fadeOutDuration,
            lazy: false,
          },
          '-=' + this.options.fadeOutDuration
        );
      }

      mtl.add(tl, offset);
    }

    return mtl;
  }

  /**
   * GSAP 타임라인 제거
   */
  private removeTimeline(): void {
    if (this.tl) {
      this.tl.kill();
      this.tl = null;
    }
  }

  /**
   * 파티클 중지 및 제거
   */
  public destroy(): void {
    this.stop();
    this.removeTimeline();
    this.unbind();
    this.unobserve();
  }
}
