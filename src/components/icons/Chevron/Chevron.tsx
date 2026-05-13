import styles from './Chevron.module.scss';

type Props = {
  direction: 'left' | 'right' | 'up' | 'down';
  className?: string;
};

export const Chevron = ({ direction, className }: Props) => {
  return (
    <svg
      className={`${styles.icon} ${styles[direction]} ${className ?? ''}`}
      viewBox="0 0 6 10"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 1L5 5L1 9" />
    </svg>
  );
};
