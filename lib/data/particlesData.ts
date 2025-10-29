// 파티클 아이템 데이터 타입 정의
export interface ParticleItem {
  content: string;
  variant: string;
}

// 상단 파티클 데이터 (이모지)
export const topParticlesData: ParticleItem[] = [
  { content: '💵', variant: '_v1' },
  { content: '🎯', variant: '_v3' },
  { content: '💸', variant: '_v2' },
  { content: '🧲', variant: '_v5' },
  { content: '🫰🏻', variant: '_v4' },
  { content: '🖥', variant: '_v7' },
  { content: '💰', variant: '_v8' },
  { content: '📍', variant: '_v9' },
  { content: '🧑‍💻', variant: '_v6' },
  { content: '🏦', variant: '_v10' },
  { content: '💲', variant: '_v6' },
  { content: '🖍', variant: '_v7' },
  { content: '🤑', variant: '_v8' },
];

// 하단 파티클 데이터 (인사말)
export const bottomParticlesData: ParticleItem[] = [
  { content: '안녕하세요!', variant: '_v1' },
  { content: 'Hello!', variant: '_v2' },
  { content: '¡Hola!', variant: '_v3' },
  { content: 'Bonjour!', variant: '_v4' },
  { content: 'สวัสดีค่ะ', variant: '_v5' },
  { content: 'こんにちは!', variant: '_v6' },
  { content: '你好', variant: '_v7' },
  { content: 'Hi!', variant: '_v8' },
  { content: 'Hello!', variant: '_v9' },
  { content: '¡Hola!', variant: '_v10' },
  { content: 'Bonjour!', variant: '_v11' },
  { content: 'สวัสดีค่ะ', variant: '_v12' },
  { content: 'こんにちは!', variant: '_v13' },
  { content: '你好', variant: '_v14' },
  { content: 'Ciao!', variant: '_v15' },
];
