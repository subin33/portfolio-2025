import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * TailwindCSS 클래스명을 효율적으로 결합하는 유틸리티 함수
 * clsx와 tailwind-merge를 조합하여 중복 클래스와 충돌을 자동으로 해결
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
