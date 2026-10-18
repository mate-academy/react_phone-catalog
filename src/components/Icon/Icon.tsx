import styles from './Icon.module.scss';

const ICONS = {
  'arrow-left': 'M10.5 3 5.5 8l5 5',
  'arrow-right': 'm5.5 3 5 5-5 5',
  'arrow-up': 'm3 10.5 5-5 5 5',
  heart:
    'M8 13.5S2 10 2 5.8a3 3 0 0 1 6-1.3 3 3 0 0 1 6 1.3C14 10 8 13.5 8 13.5Z',
  cart: 'M2 2h2l1.5 8h6.5l1.5-6H4.5M6 13.2h.01M11 13.2h.01',
  close: 'm3.5 3.5 9 9m0-9-9 9',
  minus: 'M3 8h10',
  plus: 'M3 8h10M8 3v10',
  home: 'M2 7.5 8 2l6 5.5V14H2Z',
  search: 'M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm7 2-3.5-3.5',
  sun: [
    'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 1v1.5M8 13.5V15M1 8h1.5',
    'M13.5 8H15M3 3l1 1m8 8 1 1M3 13l1-1m8-8 1-1',
  ].join(''),
  moon: 'M13.5 9.5a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7Z',
};

export type IconName = keyof typeof ICONS;

interface Props {
  name: IconName;
  isFilled?: boolean;
}

export const Icon = ({ name, isFilled = false }: Props) => (
  <svg
    className={styles.icon}
    viewBox="0 0 16 16"
    fill={isFilled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={ICONS[name]} />
  </svg>
);
