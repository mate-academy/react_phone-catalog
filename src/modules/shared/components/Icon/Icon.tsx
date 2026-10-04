import cn from 'classnames';
import styles from './Icon.module.scss';

export type IconName =
  | 'home'
  | 'search'
  | 'bag'
  | 'heart'
  | 'heart-filled'
  | 'menu'
  | 'close'
  | 'plus'
  | 'minus'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'sun'
  | 'moon';

const PATHS: Record<IconName, string> = {
  home: 'M2.5 7 8 2.5 13.5 7v6a.5.5 0 0 1-.5.5H10v-4H6v4H3a.5.5 0 0 1-.5-.5z',
  search: 'M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM14 14l-3.5-3.5',
  bag: 'M3.5 4.5h9l.7 9H2.8zM6 6V4.5a2 2 0 1 1 4 0V6',
  heart: 'M8 13.5S2 10 2 6a3 3 0 0 1 6-1.1A3 3 0 0 1 14 6c0 4-6 7.5-6 7.5z',
  'heart-filled':
    'M8 13.5S2 10 2 6a3 3 0 0 1 6-1.1A3 3 0 0 1 14 6c0 4-6 7.5-6 7.5z',
  menu: 'M2 4.5h12M2 8h12M2 11.5h12',
  close: 'M3.5 3.5l9 9M12.5 3.5l-9 9',
  plus: 'M8 3v10M3 8h10',
  minus: 'M3 8h10',
  'chevron-left': 'M10 3.5 5.5 8l4.5 4.5',
  'chevron-right': 'M6 3.5 10.5 8 6 12.5',
  'chevron-up': 'M3.5 10 8 5.5l4.5 4.5',
  'chevron-down': 'M3.5 6 8 10.5 12.5 6',
  sun:
    'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5' +
    'M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1',
  moon: 'M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z',
};

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 16, className }: Props) => {
  const isFilled = name === 'heart-filled';

  return (
    <svg
      className={cn(styles.icon, className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={isFilled ? 'var(--c-accent-secondary)' : 'none'}
      stroke={isFilled ? 'var(--c-accent-secondary)' : 'currentColor'}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
};
