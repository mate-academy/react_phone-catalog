import React from 'react';

export type IconName =
  | 'menu'
  | 'close'
  | 'heart'
  | 'heart-filled'
  | 'cart'
  | 'search'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-up'
  | 'github'
  | 'sun'
  | 'moon';

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

const paths: Record<IconName, React.ReactNode> = {
  menu: (
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  close: (
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  heart: (
    <path
      d="M12 20s-7-4.35-9.5-8.8C.7 7.6 2.6 4 
      6.2 4c2 0 3.4 1.1 4.3 2.5C11.4 5.1 12.8
      4 14.8 4c3.6 0 5.5 3.6 3.7 7.2C19 15.65 12 20 12 20z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
    />
  ),
  'heart-filled': (
    <path
      d="M12 20s-7-4.35-9.5-8.8C.7 7.6 2.6 4 6.2
      4c2 0 3.4 1.1 4.3 2.5C11.4 5.1 12.8 4 14.8
      4c3.6 0 5.5 3.6 3.7 7.2C19 15.65 12 20 12 20z"
      fill="currentColor"
    />
  ),
  cart: (
    <path
      d="M3 4h2l1.4 10.2A2 2 0 0 0 8.4 16h8.2a2 2 0 0 0
      2-1.6L20 7H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17
      20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  search: (
    <path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  ),
  'chevron-left': (
    <path
      d="M15 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-right': (
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-down': (
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'arrow-up': (
    <path
      d="M12 19V5M5 12l7-7 7 7"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  github: (
    <path
      d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.
    48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.
    11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03
    1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1
    .33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-
    .1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1
    5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7
    1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.92.36.31.68.92.68
    1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
      fill="currentColor"
    />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2
        12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </>
  ),
  moon: (
    <path
      d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
};

export const Icon: React.FC<Props> = ({ name, size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
);
