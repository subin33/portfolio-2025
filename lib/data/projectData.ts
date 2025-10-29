// 프로젝트 데이터의 타입 정의
export interface ProjectData {
  name: string; // 프로젝트 이름
  description: string; // 프로젝트 설명
  src: string; // 데스크톱 이미지 경로
  srcSLider: string; // 모바일 슬라이더 이미지 경로
  detailedDescription: string; // 상세 설명
  techStack: string[]; // 기술 스택
  githubLink?: string; // GitHub 링크 (선택사항)
  demoLink?: string; // 데모 링크 (선택사항)
  detailLink?: string; // 상세보기 링크 (선택사항)
  features?: Array<{ name: string; description: string }>;
  implementationPages?: Array<{ name: string; description: string }>;
  displayType?: 'features' | 'implementationPages';
}

// 프로젝트 데이터 배열
export const projectData: ProjectData[] = [
  {
    name: 'JobNest',
    description: '구인구직 웹 애플리케이션',
    src: 'job-nest.webp',
    srcSLider: '/assets/portfolio/mobile/jobnest.webp',
    detailedDescription:
      'JobNest는 Vue.js 3와 Supabase를 사용하여 개발한 구인구직 웹 애플리케이션입니다. 개인 학습 목적으로 진행한 프로젝트로, 기본적인 CRUD 기능과 사용자 인증 시스템을 구현했습니다. 구현한 기능으로는 로그인/회원가입, 구인글 등록 및 수정, 목록 조회, 상세보기, 지원 기능 등이 있습니다. Vue Router를 사용한 SPA 구조로 구성했고, PWA 기능도 추가하여 모바일 환경에서의 사용성을 개선했습니다. 주요 특징으로는 Supabase의 실시간 데이터베이스 기능을 활용한 동적 데이터 처리와, 이미지 업로드 기능을 포함한 구인글 관리 시스템이 있습니다. Vite를 빌드 도구로 사용하여 개발 환경을 구성했고, Vercel에 배포했습니다.',
    techStack: ['Vue.js 3', 'Supabase', 'SCSS'],
    githubLink: 'https://github.com/subin33/JobNest',
    demoLink: 'https://job-nest-4bq2zkvpc-subin-project.vercel.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/JobNest-24ecfaa56dff8091b07acd4fe1982c4b',
    displayType: 'features',
    features: [
      {
        name: '로그인/회원가입',
        description: 'Supabase Auth 기반, 이메일/비밀번호 로그인, JWT 토큰 관리',
      },
      {
        name: '구인글 등록/관리',
        description: 'Vue 3 Composition API 기반 폼, CRUD 작업, 작성자 권한 제어',
      },
      {
        name: '이미지 업로드',
        description: 'Supabase Storage 연동, UUID 기반 파일명 생성, 미리보기 기능',
      },
      {
        name: '구인글 목록/상세',
        description: '실시간 데이터 동기화, date-fns 날짜 포맷팅, 반응형 UI',
      },
      {
        name: '지원 시스템',
        description: '중복 지원 방지, 지원자 정보 자동 연동, 지원 상태 실시간 확인',
      },
      { name: '사용자 프로필', description: '지원 내역 관리, 받은 지원 내역 조회, 로그아웃 기능' },
      {
        name: '반응형 네비게이션',
        description: 'Vue Router 기반 동적 네비게이션, 페이지별 UI 변경',
      },
      {
        name: 'PWA 지원',
        description: 'Service Worker 오프라인 캐싱, 앱 설치 기능, 네이티브 앱 경험',
      },
      { name: '보안 시스템', description: 'Row Level Security (RLS), 환경 변수 관리, XSS 방지' },
      { name: '로딩 상태 관리', description: '비동기 작업 중 사용자 피드백, 진행 상황 표시' },
      { name: '에러 처리', description: '사용자 친화적 에러 메시지, 네트워크 오류 대응' },
      {
        name: '모바일 최적화',
        description: '터치 인터페이스 최적화, 반응형 디자인, 모바일 우선 설계',
      },
      {
        name: '실시간 동기화',
        description: 'Supabase 실시간 구독, 데이터베이스 변경사항 즉시 반영',
      },
      { name: '테스트 계정', description: '즉시 체험 가능한 테스트 계정 제공, 데모 환경 구성' },
    ],
  },
  {
    name: 'Blog',
    description: 'Next.js 와 Notion API를 활용한 Blog',
    src: 'my-blog.webp',
    srcSLider: '/assets/portfolio/mobile/blog.webp',
    detailedDescription:
      'Next.js 와 TypeScript로 만든 개인 블로그 입니다. Notion을 CMS로 사용하여 글을 작성하고 관리할 수 있으며, 웹 사이트에서는 실시간으로 업데이트된 포스트를 확인할 수 있습니다. React Query를 통한 상태 관리와 무한 스크롤을 지원하며 , MDX를 활용한 마크다운 렌더링과 자동 목차 생성 기능을 구현했습니다. 태그 기반 필터링과 정렬 옵션으로 콘텐츠 탐색을 할 수 있고, Giscus 댓글 시스템을 통해 댓글을 달 수 있습니다.  Zod를 통한 데이터 검증과 Suspense를 활용한 스트리밍 렌더링으로 성능을 최적화했습니다.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Notion API'],
    githubLink: '#',
    demoLink: 'https://blog-p5xedqc0q-subin-project.vercel.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/My-Blog-24ecfaa56dff80539bbdf6fda2cc08b3',
    displayType: 'features',
    features: [
      {
        name: 'Notion CMS 연동',
        description: 'Notion에서 직접 콘텐츠 작성 및 관리, 실시간 블로그 업데이트',
      },
      {
        name: '목차 자동 생성',
        description: '포스트의 헤딩을 기반으로 자동으로 목차를 생성하여 긴 글의 네비게이션 지원',
      },
      {
        name: '태그 기반 필터링',
        description: '포스트를 태그별로 분류하고 필터링',
      },
      {
        name: '다크/라이트 테마 전환',
        description: '다크모드와 라이트모드 전환',
      },
      {
        name: '댓글 시스템',
        description: 'GitHub Discussions 기반 Giscus 댓글 기능',
      },
      {
        name: '반응형 디자인',
        description: '데스크톱과 모바일 환경을 모두 지원하는 반응형 레이아웃 ',
      },
      {
        name: '무한 스크롤',
        description: '효율적인 콘텐츠 로딩을 위한 무한 스크롤 구현',
      },
      {
        name: '정렬 기능',
        description: '최신순/오래된순으로 포스트를 정렬하여 원하는 순서로 콘텐츠를 확인',
      },
    ],
  },
  {
    name: 'lean-canvas',
    description: 'Lean Canvas',
    src: 'lean-canvas.webp',
    srcSLider: '/assets/portfolio/mobile/lean.webp',
    detailedDescription:
      'Lean Canvas는 Ash Maurya의 Lean Canvas 프레임워크를 기반으로 한 비즈니스 모델 캔버스 애플리케이션입니다. 스타트업과 기업들이 9개 핵심 요소(문제, 해결안, 가치제안, 경쟁우위, 목표고객, 기존대안, 핵심지표, 고객경로, 비용구조, 수익흐름)를 정리하고 관리할 수 있도록 도와주는 도구입니다. React와 Vite를 기반으로 구축되었으며, Tailwind CSS를 활용한 반응형 디자인과 Supabase를 통한 실시간 데이터베이스 연동을 제공합니다. TanStack Query를 활용한 서버 상태 관리와 React Router DOM을 통한 SPA 라우팅을 구현했습니다.',
    techStack: ['React', 'JavaScript', 'Tailwind CSS', 'Supabase'],
    githubLink: 'https://github.com/subin33/lean-canvas',
    demoLink: 'https://lean-canvas-sigma.vercel.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/lean-canvas-24ecfaa56dff8005a6c7cb40ee64f859',
    displayType: 'features',
    features: [
      {
        name: 'Lean Canvas 템플릿',
        description:
          '9개 섹션(문제, 해결안, 가치제안, 경쟁우위, 목표고객, 기존대안, 핵심지표, 고객경로, 비용구조, 수익흐름)을 포함한 완전한 캔버스 제공',
      },
      {
        name: '실시간 노트 관리',
        description: '각 섹션별 컬러 코딩된 노트를 추가, 편집, 삭제 가능',
      },
      {
        name: '캔버스 CRUD',
        description: '새로운 캔버스 생성, 기존 캔버스 조회/수정/삭제 기능',
      },
      {
        name: '검색 및 필터링',
        description: '제목 기반 검색과 카테고리별 필터링 지원',
      },
      {
        name: '뷰 토글',
        description: '그리드 뷰와 리스트 뷰 간 전환 가능',
      },
      {
        name: '반응형 디자인',
        description: '데스크톱과 모바일 환경을 모두 지원하는 반응형 레이아웃',
      },
      {
        name: '직관적인 인터페이스',
        description: '드래그 앤 드롭과 같은 자연스러운 상호작용',
      },
      {
        name: '실시간 저장',
        description: '자동 저장 기능으로 데이터 손실 방지',
      },
    ],
  },
  {
    name: 'Wine Bliss',
    description: 'Wine Bliss',
    src: 'wine-bliss.webp',
    srcSLider: '/assets/portfolio/mobile/wine.webp',
    detailedDescription:
      'Wine Bliss 모바일 웹 퍼블리싱은 와인 쇼핑몰을 위한 모바일 전용 웹사이트입니다. HTML5, CSS3, jQuery, Slick Slider를 활용하여 개발되었으며, 모바일 디바이스에 최적화된 디자인으로 제작되었습니다. 주요 페이지로는 메인페이지,로그인/회원가입,상품상세페이지,장바구니,마이페이지,검색페이지,카테고리 페이지로 구성되어 있습니다 .  Figma를 통해 제작된 Prototype을 통해 디자인을 미리 확인할 수 있습니다.',
    techStack: ['HTML', 'CSS', 'jQuery'],
    githubLink: 'https://github.com/subin33/Wine-Bliss-Mobile-Web-Publishing',
    demoLink: 'https://mobile-web-portfolio.netlify.app/mobile-mockup/single-view.html',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Wine-Bliss-24ecfaa56dff80c28d23dc5e58d9ee2b?pvs=74',
    displayType: 'implementationPages',
    implementationPages: [
      {
        name: '메인 홈페이지',
        description: '와인 상품 진열, 신상품 및 인기상품 배지 표시, 카테고리 네비게이션',
      },
      {
        name: '상품 상세 페이지',
        description: '와인 상품 정보, 가격, 할인율, 구매 버튼, 관련 상품 추천',
      },
      { name: '장바구니', description: '선택한 상품 목록, 수량 조절, 총 금액 계산, 주문 진행' },
      { name: '마이페이지', description: '주문 내역, 배송 상태, 개인정보 관리, 찜한 상품 목록' },
      { name: '검색 페이지', description: '와인 검색, 필터링 옵션, 정렬 기능, 검색 결과 표시' },
      { name: '로그인/회원가입', description: '사용자 인증, 회원 정보 관리, 비밀번호 찾기' },
      { name: '카테고리 페이지', description: '와인 종류별 분류, 가격대별 필터링, 정렬 옵션' },
    ],
  },
  {
    name: 'Emotion Diary',
    description: 'Emotion Diary',
    src: 'emotion-diary.webp',
    srcSLider: '/assets/portfolio/mobile/emotion.webp',
    detailedDescription:
      'Emotion Diary는 사용자가 일상을 감정과 함께 기록하고 관리할 수 있는 감정 일기장 웹 애플리케이션입니다. 감정 상태를 5단계로 선택하고, 일기 내용을 입력하여 기록할 수 있습니다. 월별로 일기를 조회할 수 있고, 일기 상세 페이지에서는 일기 내용을 확인할 수 있습니다. 일기 수정과 삭제도 가능합니다. 또한 모바일 디바이스에 최적화된 디자인으로 제작되었습니다.',
    techStack: ['React', 'JavaScript', 'CSS'],
    githubLink: 'https://github.com/subin33/Emotion-Diary',
    demoLink: 'https://emotion-diary-eta-two.vercel.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Emotion-Diary-253cfaa56dff80dcacbec8f26e1e0b7f',
    displayType: 'features',
    features: [
      { name: '일기 작성', description: '날짜, 감정 상태, 일기 내용 입력, 새로운 일기 작성' },
      { name: '감정 선택', description: '5단계 감정 스케일 선택, 현재 감정 시각적 표현' },
      {
        name: '일기 목록 조회',
        description: '월별 일기 목록 조회, 월 이동 기능, 과거/미래 일기 확인',
      },
      { name: '일기 상세 보기', description: '작성 일기 상세 내용 확인, 감정 이미지와 함께 표시' },
      { name: '일기 수정', description: '기존 일기 내용, 날짜, 감정 수정' },
      { name: '일기 삭제', description: '불필요한 일기 삭제, 삭제 확인 메시지 제공' },
      { name: '데이터 영속성', description: '로컬 스토리지 활용, 데이터 유지' },
      {
        name: '반응형 디자인',
        description: '데스크톱과 모바일 환경을 모두 지원하는 반응형 레이아웃',
      },
      { name: '페이지 제목 관리', description: '현재 페이지 동적 제목 설정' },
    ],
  },
  {
    name: 'Todo List',
    description: 'Todo List',
    src: 'todo-list.webp',
    srcSLider: '/assets/portfolio/mobile/todo.webp',
    detailedDescription:
      'Todo List는 사용자가 새로운 할 일을 추가하고, 완료 상태를 토글하며, 불필요한 항목은 삭제할 수 있습니다. 또한 검색 기능을 통해 특정 할 일을 빠르게 찾을 수 있으며, 전체 통계 정보를 한눈에 확인할 수 있습니다. 또한 모바일 디바이스에 최적화된 디자인으로 제작되었습니다.',
    techStack: ['React', 'JavaScript', 'CSS'],
    githubLink: 'https://github.com/subin33/todo-list',
    demoLink: 'https://subin-todo.netlify.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Emotion-Diary-1-253cfaa56dff80e28941d1f10606497f',
    displayType: 'features',
    features: [
      { name: '할 일 추가', description: '새로운 할 일 입력, 목록에 추가' },
      { name: '할 일 완료/취소', description: '할 일 완료 상태 토글' },
      { name: '할 일 삭제', description: '특정 할 일 목록에서 삭제' },
      { name: '할 일 검색', description: '키워드 기반 할 일 검색' },
      { name: '할 일 필터링', description: '상태별(전체, 완료, 미완료) 할 일 목록 필터링' },
      { name: '통계 정보 표시', description: '전체/완료 할 일 수 등 통계 정보 제공' },
      { name: '날짜 표시', description: '현재 날짜 화면 표시' },
      { name: '반응형 UI', description: '데스크톱과 모바일 환경을 모두 지원하는 반응형 레이아웃' },
    ],
  },
];
