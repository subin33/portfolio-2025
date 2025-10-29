// GifSection 데이터 타입 정의
export interface MiniGameData {
  id: string;
  title: string;
  description: string;
  poster: string;
  videoSrc: string;
  dataSpeed: number;
  githubLink?: string;
  demoLink?: string;
  detailLink?: string;
  techStack: string[];
}

// GifSection 데이터 배열
export const miniGameData: MiniGameData[] = [
  {
    id: '01',
    title: 'tetris game',
    description:
      '테트리스 게임을 웹 브라우저에서 즐길 수 있도록 구현한 게임입니다. 순수 JavaScript, HTML, CSS를 사용하여 개발되었으며, 모듈화된 구조로 코드의 가독성과 유지보수성을 높였습니다. 게임은 20x10 크기의 게임 보드에서 7가지 다른 모양의 테트리스 블록을 조작하여 라인을 완성하는 방식으로 진행됩니다. 점수 시스템, HOLD 기능, NEXT 블록 미리보기, 게임 오버 처리 등 테트리스의 기능들을 구현하였습니다.',
    poster: '/assets/mini-project/poster/tetris.webp',
    videoSrc: '/assets/mini-project/gif/tetris.gif',
    dataSpeed: 4,
    githubLink: 'https://github.com/subin33/tetris-game',
    demoLink: 'https://project-playground.netlify.app/project/tetris/',
    detailLink: 'https://wirehaired-dimple-7ea.notion.site/Tetris-254cfaa56dff81fe892af3ebc56b3ac5',
    techStack: ['HTML', 'JavaScript', 'CSS'],
  },
  {
    id: '02',
    title: 'chatting-app',
    description:
      '실시간 채팅 애플리케이션으로, Socket.IO를 활용한 양방향 통신을 구현한 웹 기반 채팅 서비스입니다. 사용자는 고유한 대화명을 설정하여 채팅방에 참여할 수 있으며, 실시간으로 메시지를 주고받을 수 있습니다. 모바일 친화적인 UI/UX를 제공하며, 사용자 프로필 이미지와 시간 표시 기능을 포함하고 있습니다. Express.js 서버와 클라이언트 사이의 실시간 통신을 통해 즉각적인 메시지 전송과 수신이 가능하며, 사용자 접속/퇴장 상태도 실시간으로 관리됩니다.',
    poster: '/assets/mini-project/poster/chatting-app.webp',
    videoSrc: '/assets/mini-project/gif/chatting-app.gif',
    dataSpeed: 5,
    githubLink: 'https://github.com/subin33/Chatting_App',
    demoLink: 'https://port-0-chatting-app-m6azhk9ob720801f.sel4.cloudtype.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Chatting-App-254cfaa56dff81b78d43d50f93129097',
    techStack: ['HTML', 'Node.js', 'Express.js', 'Socket.io', 'JavaScript', 'CSS'],
  },
  {
    id: '03',
    title: 'image puzzle game',
    description:
      'Image Puzzle Game 은 이미지 퍼즐 게임입니다. 사용자는 4x4 그리드로 구성된 16개의 퍼즐 조각을 드래그 앤 드롭 방식으로 조작하여 원본 이미지를 완성하는 것이 목표입니다. 게임은 시작 버튼을 통해 퍼즐 조각들이 무작위로 섞인 상태에서 시작되며, 플레이어는 각 조각을 올바른 위치로 이동시켜야 합니다. 게임 진행 시간이 실시간으로 측정되며, 힌트 기능을 통해 도움을 받을 수 있습니다. 완성 시 축하 메시지와 함께 게임이 종료되는 구조로 되어 있습니다.',
    poster: '/assets/mini-project/poster/image-puzzle.webp',
    videoSrc: '/assets/mini-project/gif/image-puzzle.gif',
    dataSpeed: 3.5,
    githubLink: 'https://github.com/subin33/image_puzzle_game',
    demoLink: 'https://project-playground.netlify.app/project/image-puzzle/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Image-Puzzle-Game-254cfaa56dff8113b6e4d7f24317f53d',
    techStack: ['HTML', 'JavaScript', 'CSS'],
  },
  {
    id: '04',
    title: 'weather app',
    description:
      'Weather App은 사용자가 도시명을 입력하면 실시간 날씨 정보를 제공하는 웹 애플리케이션입니다. OpenWeatherMap API를 활용하여 전 세계 모든 도시의 현재 날씨 상태, 온도, 습도, 풍속 등의 정보를 실시간으로 조회할 수 있습니다. 아이콘을 사용해 직관적인 날짜 정보 확인이 가능합니다. 검색 기능은 클릭과 엔터키 입력을 모두 지원하며, 잘못된 도시명 입력 시 에러 메시지와 함께 올바른 입력 예시를 제공합니다.',
    poster: '/assets/mini-project/poster/weather-app.webp',
    videoSrc: '/assets/mini-project/gif/weather-app.gif',
    dataSpeed: 2.5,
    githubLink: 'https://github.com/subin33/Weather-App',
    demoLink: 'https://weather-app-subin.netlify.app/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Weather-App-254cfaa56dff8140b84bfd1d9fb996ed',
    techStack: ['HTML', 'JavaScript', 'CSS'],
  },
  {
    id: '05',
    title: 'typing game',
    description:
      'Typing Game은 사용자의 타이핑 속도와 정확도를 측정하는 웹 기반 게임입니다. 외부 API를 통해 랜덤한 영어 단어를 가져와서 제한된 시간 내에 최대한 많은 단어를 정확하게 입력하는 방식으로 진행됩니다. 게임은 9초의 제한 시간을 가지며, 각 단어를 정확히 입력할 때마다 점수가 증가하고 시간이 리셋됩니다. 게임 진행 상황을 시각적으로 표시하고, 게임 종료 시 알림을 통해 피드백을 제공합니다.',
    poster: '/assets/mini-project/poster/typing-game.webp',
    videoSrc: '/assets/mini-project/gif/typing-game.gif',
    dataSpeed: 3.2,
    githubLink: 'https://github.com/subin33/typing_game',
    demoLink: 'https://project-playground.netlify.app/project/typing-game/',
    detailLink:
      'https://wirehaired-dimple-7ea.notion.site/Typing-Game-254cfaa56dff814e8867cac04d4d9ee6',
    techStack: ['HTML', 'JavaScript', 'CSS'],
  },
];
