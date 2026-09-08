import styles from './Arrow.module.scss';

type Props = {
  direction: 'left' | 'right' | 'up' | 'down';
  fill?: string;
  isDisabled?: boolean;
};

export const Arrow: React.FC<Props> = ({
  direction,
  isDisabled = false,
  fill = '',
}) => (
  <svg
    className={`
        ${styles[direction]} 
        ${styles.arrowSymbol}
    `}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z"
      fill={
        isDisabled
          ? 'var(--color-icons)'
          : fill === ''
            ? 'var(--color-primary)'
            : fill
      }
    />
  </svg>
);
