export interface PortfolioData {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  technologies?: string[];
  description: string;
  githubLink?: string;
  demoLink?: string;
  detailLink?: string;
}

export const PortfolioData: PortfolioData[] = [
  {
    id: 'Portfolio-1',
    title: 'New Portfolio',
    image: '/assets/portfolio/newporfolio.png',
    imageAlt: 'New Portfolio Site Image',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    description:
      '이 프로젝트는  Next.js와 TypeScript를 기반으로 구축된 개인 포트폴리오 웹사이트입니다. 학습한 기술들을 실제로 적용해보고자 시작한 프로젝트로, GSAP 애니메이션과 커스텀 커서 기능을 통해 기본적인 인터랙티브 요소들을 구현해보았습니다. 반응형 디자인을 적용하여 다양한 디바이스에서 확인할 수 있도록 했으며, Main, About Me, Projects, Portfolio, Mini Game ,Mini Project, Contact로 기본적인 포트폴리오 섹션들을 포함했습니다. Parallax 효과나 스무스 스크롤링 같은 웹 애니메이션 기법들을 학습하며 적용한 결과물입니다.',
    githubLink: 'https://github.com/subin33/portfolio-2025',
    demoLink: 'https://buly.kr/15PltFz/#home',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/New-Portfolio-253cfaa56dff80d28f13f3a0ba084a6c',
  },
  {
    id: 'Portfolio-2',
    title: 'Motorcycle Site',
    image: '/assets/portfolio/motorcycle.png',
    imageAlt: 'Motorcycle Site 프로젝트 이미지',
    technologies: ['Vue.js', 'CSS'],
    description:
      'MOTORCYCLE-SITE는 Vue.js 와 Vuetify를 기반으로 구축되어 있으며, 사용자에게 다양한 오토바이 제품 정보를 소개하고, 브랜드의 솔루션과 서비스를 효과적으로 전달 하는 것을 목표로 합니다. 반응형 디자인을 적용하여 데스크톱과 모바일 환경에서 모두 사용 가능하며, 동영상 배경과 인터랙티브한 요소들을 통해 인터페이스를 구현했습니다.',
    githubLink: '#',
    demoLink: 'https://motorcycle-site.netlify.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Motorcycle-Site-254cfaa56dff81fb8623d6a790e2df92',
  },
  {
    id: 'Portfolio-3',
    title: 'Old Portfolio',
    image: '/assets/portfolio/oldportfolio.png',
    imageAlt: 'Old Portfolio Site Image',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    description:
      '개인 포트폴리오 웹사이트로, HTML, CSS, JavaScript를 기반으로 제작했습니다. GSAP를 통한 스크롤 애니메이션과 타입라이터 효과, 커스텀 커서를 활용한 이미지 프리뷰 기능을 구현했으며, EmailJS로 연락처 폼 기능을 제공합니다. Webpack을 통한 모듈 번들링으로 코드 구조를 개선하고, 반응형 디자인을 적용하여 다양한 디바이스에서 접근 가능하도록 했습니다. 개인 프로젝트들을 정리하여 학습 과정과 기술 역량을 보여주는 포트폴리오입니다.',
    githubLink: '#',
    demoLink: 'https://2025-subin.netlify.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Old-Portfolio-Site-1-254cfaa56dff81d5ac46cbedf518e69e',
  },
  {
    id: 'Portfolio-4',
    title: 'Spaceport Project',
    image: '/assets/portfolio/spaceportproject.png',
    imageAlt: 'Spaceport Project Image',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    description:
      '우주를 테마로 한 페이지에서, 각 프로젝트들이 한 페이지에서 시각적으로 소개하고 빠르게 접근할 수 있도록 구성했으며, 모달 기반 ‘Quick View’ 기능을 통해 별도 이동 없이 프로젝트 미리보기도 가능합니다. 테트리스 게임, 포트폴리오, 날씨 앱, 투두리스트, 감정 일기장, 계산기, 타이핑 게임, 이미지 퍼즐, 채팅 앱, 심리테스트 등 총 10개의 프로젝트로 구성되어 있습니다.',
    githubLink: '#',
    demoLink: 'https://project-playground.netlify.app/pc/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Spaceport-Project-253cfaa56dff8072986df69747394966',
  },
  {
    id: 'Portfolio-5',
    title: 'Old Portfolio Site',
    image: '/assets/portfolio/oldportfolio-2.png',
    imageAlt: 'Old Portfolio Site Image',
    technologies: ['HTML', 'JavaScript', 'CSS'],
    description:
      '개인 포트폴리오 웹사이트로, HTML, CSS, JavaScript를 기반으로 제작되었으며, GSAP 애니메이션 라이브러리와 Matter.js 물리 엔진을 활용하여 요소를 구현했습니다. 주요 기능으로는 스크롤 기반 애니메이션, 오디오 컨트롤, 이미지 파티클 효과, 그리고 반응형 네비게이션 등이 있습니다.  Webpack을 통한 모듈 번들링으로 코드 구조를 개선하고, 반응형 디자인을 적용하여 다양한 디바이스에서 접근 가능하도록 했습니다. 개인 프로젝트들을 정리하여 학습 과정과 기술 역량을 보여주는 포트폴리오입니다.',
    githubLink: '#',
    demoLink: 'https://nohsubin.netlify.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Old-Portfolio-254cfaa56dff8195882ddb6d809cbb1b',
  },
];
