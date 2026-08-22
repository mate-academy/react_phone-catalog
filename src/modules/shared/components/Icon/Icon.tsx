export type IconName =
  | 'heart'
  | 'heart-filled'
  | 'cart'
  | 'search'
  | 'close'
  | 'menu'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'plus'
  | 'minus'
  | 'arrow-up'
  | 'sun'
  | 'moon'
  | 'home';

type Props = {
  name: IconName;
  className?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  heart: (
    <path
      // eslint-disable-next-line max-len
      d="M12 20.5s-7-4.4-9.5-8.6C.7 8.8 2 5 5.6 4.2 8 3.6 10 5 12 7.3 14 5 16 3.6 18.4 4.2 22 5 23.3 8.8 21.5 11.9 19 16.1 12 20.5 12 20.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  ),
  'heart-filled': (
    <path
      // eslint-disable-next-line max-len
      d="M12 20.5s-7-4.4-9.5-8.6C.7 8.8 2 5 5.6 4.2 8 3.6 10 5 12 7.3 14 5 16 3.6 18.4 4.2 22 5 23.3 8.8 21.5 11.9 19 16.1 12 20.5 12 20.5Z"
      fill="currentColor"
    />
  ),
  cart: (
    <path
      // eslint-disable-next-line max-len
      d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6M9.5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  search: (
    <path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm9 2-4.35-4.35"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  close: (
    <path
      d="M5 5l14 14M19 5 5 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  menu: (
    <path
      d="M4 6h16M4 12h16M4 18h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  'arrow-left': (
    <path
      d="M19 12H5m0 0 6-6m-6 6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'arrow-right': (
    <path
      d="M5 12h14m0 0-6-6m6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-left': (
    <path
      d="M15 6l-6 6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-right': (
    <path
      d="M9 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  plus: (
    <path
      d="M12 5v14M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  minus: (
    <path
      d="M5 12h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  ),
  'arrow-up': (
    <path
      d="M12 19V5m0 0-6 6m6-6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sun: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      {/* eslint-disable-next-line max-len */}
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </g>
  ),
  moon: (
    <path
      d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
  home: (
    <path
      d="M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export const Icon: React.FC<Props> = ({ name, className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
);
