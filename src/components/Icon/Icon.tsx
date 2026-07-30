import styles from './Icon.module.scss';

export type IconName =
  | 'menu'
  | 'close'
  | 'search'
  | 'home'
  | 'favourites'
  | 'favourites-filled'
  | 'cart'
  | 'plus'
  | 'minus'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'github';

type Props = {
  name: IconName;
  className?: string;
};

/* eslint-disable max-len -- SVG path data cannot be wrapped */
const paths: Record<IconName, React.ReactNode> = {
  menu: (
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  ),
  close: (
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  ),
  search: (
    <>
      <circle cx={11} cy={11} r={6.5} stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M20 20l-4.35-4.35"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </>
  ),
  home: (
    <path
      d="M4 11.5L12 4l8 7.5M6 9.5V20h12V9.5"
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  favourites: (
    <path
      d="M12 21s-7.5-4.6-10.3-9C-.4 8.4 1.2 4.3 5 3.6c2.4-.45 4.7.5 7 2.9 2.3-2.4 4.6-3.35 7-2.9 3.8.7 5.4 4.8 3.3 8.4-2.8 4.4-10.3 9-10.3 9z"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      fill="none"
    />
  ),
  'favourites-filled': (
    <path
      d="M12 21s-7.5-4.6-10.3-9C-.4 8.4 1.2 4.3 5 3.6c2.4-.45 4.7.5 7 2.9 2.3-2.4 4.6-3.35 7-2.9 3.8.7 5.4 4.8 3.3 8.4-2.8 4.4-10.3 9-10.3 9z"
      fill="currentColor"
    />
  ),
  cart: (
    <path
      d="M7 8V6.5a5 5 0 0110 0V8M4.5 8h15l-1 12.5a1.5 1.5 0 01-1.5 1.4H7a1.5 1.5 0 01-1.5-1.4L4.5 8z"
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  plus: (
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  ),
  minus: (
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  ),
  'chevron-left': (
    <path
      d="M14 4l-8 8 8 8"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-right': (
    <path
      d="M10 4l8 8-8 8"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-up': (
    <path
      d="M4 14l8-8 8 8"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-down': (
    <path
      d="M4 10l8 8 8-8"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.58 2 12.2c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.2 2.46.1 2.72.65.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0022 12.2C22 6.58 17.52 2 12 2z"
    />
  ),
};
/* eslint-enable max-len */

export const Icon = ({ name, className }: Props) => (
  <svg
    className={`${styles.icon} ${className ?? ''}`}
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
);
