import React from 'react';

// 버튼 타입 정의
type ButtonVariant = 'primary' | 'secondary';
type ButtonIcon = 'github' | 'external' | 'detail';

// Button 컴포넌트의 props 타입 정의
interface ButtonProps {
  text: string;
  url: string;
  icon?: ButtonIcon;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

// 프로젝트 버튼 컴포넌트
const Button: React.FC<ButtonProps> = ({
  text,
  url,
  icon,
  variant = 'primary',
  className = '',
  onClick,
  ariaLabel,
}) => {
  // 기본 클릭 핸들러
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 버튼 스타일 클래스
  const buttonClasses = `group flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer ${className}`;

  // variant에 따른 배경색 클래스
  const variantClasses = {
    primary: 'bg-[var(--ring)] hover:bg-[var(--ring)]/80 hover:shadow-[var(--ring)]/25',
    secondary: 'bg-[var(--ring)]/80 hover:bg-[var(--ring)]/60 hover:shadow-[var(--ring)]/25',
  };

  const accessibleLabel = ariaLabel || text;

  // 아이콘 렌더링 함수
  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses = 'h-5 w-5 transition-transform duration-300 group-hover:scale-110';

    switch (icon) {
      case 'github':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'external':
        return (
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
      case 'detail':
        return (
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${buttonClasses} ${variantClasses[variant]}`}
      aria-label={accessibleLabel}
    >
      {renderIcon()}
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default Button;
