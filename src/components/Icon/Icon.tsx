import styles from './Icon.module.scss';
import { assetUrl } from '../../utils/assets';

type IconName =
  | 'heart'
  | 'cart'
  | 'home'
  | 'left'
  | 'right'
  | 'up'
  | 'close'
  | 'plus'
  | 'minus'
  | 'search'
  | 'menu'
  | 'sun'
  | 'moon';

const paths: Record<IconName, string> = {
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  cart: 'M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2',
  home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3V10Z',
  left: 'm15 18-6-6 6-6',
  right: 'm9 18 6-6-6-6',
  up: 'm6 15 6-6 6 6',
  close: 'm6 6 12 12M6 18 18 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z',
  moon: 'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z',
};

const assets: Partial<Record<IconName, string>> = {
  heart: 'heart',
  cart: 'cart',
  home: 'home',
  left: 'left',
  right: 'right',
  up: 'up',
  close: 'close',
  plus: 'plus',
  minus: 'minus',
  search: 'search',
  menu: 'menu',
};

export const Icon = ({
  name,
  filled = false,
}: {
  name: IconName;
  filled?: boolean;
}) =>
  assets[name] ? (
    <span
      className={`${styles.icon} ${filled ? styles.filled : ''}`}
      style={{
        maskImage: `url(${assetUrl(
          `img/figma-assets/icon-${name === 'heart' && filled ? 'heart-filled' : assets[name]}.svg`,
        )})`,
      }}
      aria-hidden="true"
    />
  ) : (
    <svg
      className={`${styles.icon} ${styles.glyph}`}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
