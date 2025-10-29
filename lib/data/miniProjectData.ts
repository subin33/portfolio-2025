export interface MiniProjectData {
  title: string;
  slug: string;
  img: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
  detailLink?: string;
  techStack?: string[];
  features?: Array<{ name: string; description: string }>; // 주요 기능 추가
}

export const miniProjectData: MiniProjectData[] = [
  {
    title: 'Garfield Theme Portfolio',
    slug: 'garfield-theme-portfolio',
    img: '/assets/portfolio/garfield.webp',
    description:
      '이 프로젝트는 4개의 코너 버튼을 통해 About, Experience, Projects, Contact 섹션으로 네비게이션을 제공합니다. 중앙에는 Garfield 캐릭터의 애니메이션된 얼굴이 위치하며, 각 섹션을 클릭할 때마다 캐릭터의 시선이 변화하는 인터랙션을 구현했습니다. 다크모드와 라이트모드 전환 기능을 지원하며, 반응형 디자인으로  다양한 디바이스에서 사용할 수 있습니다. 프로젝트 섹션에서는 슬라이드쇼 형태로 포트폴리오 프로젝트들을 볼 수 있으며,  모든 애니메이션과 전환 효과는 순수 CSS와 JavaScript로 구현되어 있습니다.',
    githubLink: '#',
    demoLink: 'https://project-playground.netlify.app/project/garfield/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Garfield-Theme-Portfolio-254cfaa56dff81c1884fedf913d0a1be',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      {
        name: '4코너 네비게이션',
        description:
          '화면의 4개 코너에 위치한 버튼을 통해 About, Experience, Projects, Contact 섹션으로 이동하는 네비게이션 시스템',
      },
      {
        name: 'Garfield 캐릭터 애니메이션',
        description:
          '중앙에 위치한 Garfield 캐릭터가 각 섹션 클릭 시 시선이 변화하는 인터랙티브 애니메이션',
      },
      {
        name: '다크/라이트 모드',
        description: ' 다크모드와 라이트모드를 전환할 수 있으며, 로컬 스토리지에 설정을 저장',
      },
      {
        name: '반응형 디자인',
        description: '데스크톱과 모바일 환경을 모두 지원하는 반응형 레이아웃',
      },
      {
        name: '프로젝트 슬라이드쇼',
        description:
          '프로젝트 섹션에서 좌우 화살표 버튼을 통해 포트폴리오 프로젝트들을 슬라이드 형태로 표시',
      },
    ],
  },
  {
    title: 'Calculator',
    slug: 'Calculator',
    img: '/assets/portfolio/calculator.webp',
    description:
      '이 프로젝트는  iOS 디자인을 참고하여 HTML, CSS, JavaScript를 사용하여 구현되었으며, 학습을 목적으로 개발된 계산기 애플리케이션입니다. 모바일과 데스크톱 환경 모두 사용 가능합니다. 계산기는 사칙연산, 백분율 계산, 부호 변경, 소수점 입력 등의 기능을 지원합니다.',
    githubLink: 'https://github.com/subin33/Calculator-App',
    demoLink: 'https://project-playground.netlify.app/project/calculator/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Calculator-254cfaa56dff815894f6f8320cb7164c',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      {
        name: '기본 사칙연산',
        description: '덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(/) 연산 지원',
      },
      {
        name: '소수점 계산',
        description: '소수점 입력 및 소수점이 포함된 계산 수행',
      },
      {
        name: '백분율 계산',
        description: '현재 값이나 계산 결과를 백분율로 변환',
      },
      {
        name: '부호 변경',
        description: '+/- 버튼을 통한 양수/음수 전환',
      },
      {
        name: '계산 결과 연속 사용',
        description: '이전 계산 결과를 다음 계산의 시작점으로 활용',
      },
      {
        name: '입력 수정',
        description: '백스페이스 기능으로 마지막 입력 삭제',
      },
      {
        name: '모바일 모킹',
        description: '실제 스마트폰과 유사한 디자인으로 모바일 환경 시뮬레이션',
      },
      {
        name: '실시간 계산',
        description: '입력과 동시에 수식 표시 및 계산 결과 실시간 업데이트',
      },
    ],
  },
  {
    title: 'NewsPaper Theme Portfolio',
    slug: 'NewsPaper',
    img: '/assets/portfolio/news-paper.png',
    description:
      '신문 디자인을 참고하여 만든 개인 포트폴리오 웹사이트입니다. HTML, CSS, JavaScript를 사용하여 정적인 웹페이지로 구성되었으며, 데스크톱과 모바일 환경에서 모두 볼 수 있도록 반응형으로 제작했습니다. 신문의 레이아웃을 활용하여 프로젝트들을 정리하고, 간단한 시계 기능과 텍스트 선택 방지 기능을 추가했습니다. 외부 링크를 통해 CodePen과 Notion에 올린 다른 프로젝트들도 연결하여 포트폴리오의 일부로 활용했습니다. ',
    githubLink: '#',
    demoLink: 'https://newspaper-of-me.netlify.app/pc/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Newspaper-Theme-Portfolio-254cfaa56dff810c8247fe0d12bb1af8',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      {
        name: '반응형 웹 디자인',
        description: '데스크톱과 모바일 환경을 모두 지원하는 반응형 레이아웃',
      },
      {
        name: '신문 스타일 레이아웃',
        description: 'Grid 를 활용한 신문 디자인',
      },
      {
        name: '모바일 모킹',
        description: '실제 모바일 디바이스처럼 보이는 프레임을 통한 모바일 뷰 제공',
      },
      {
        name: '실시간 시계',
        description: '현재 날짜와 시간을 실시간으로 표시하는 동적 시계 기능',
      },
      {
        name: '텍스트 선택 방지',
        description: '콘텐츠의 무단 복사를 방지하는 보안 기능',
      },
      {
        name: '프로젝트 갤러리',
        description: '다양한 웹 프로젝트들을 카테고리별로 분류하여 전시',
      },
      {
        name: '외부 링크 통합',
        description: 'CodePen, Notion 등 외부 플랫폼과의 연동',
      },
    ],
  },
];
