import React from 'react';

type IconName = 'chevron-left' | 'chevron-right' | 'close' | 'menu';

const PATHS: Record<IconName, string> = {
  'chevron-left': 'M10 4L6 8L10 12',
  'chevron-right': 'M6 4L10 8L6 12',
  close: 'M2 2L14 14M14 2L2 14',
  menu: 'M1 2H15M1 8H15M1 14H15',
};

interface Props {
  name: IconName;
  stroke?: string;
}

export const Icon: React.FC<Props> = ({ name, stroke = 'currentColor' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d={PATHS[name]}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
