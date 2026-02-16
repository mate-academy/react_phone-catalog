import { Arrow } from './Arrow';
import styles from './ArrowButton.module.scss';

type Props = {
  direction: 'left' | 'right' | 'up' | 'down';
  isDisabled?: boolean;
  height?: string;
  width?: string;
  onClick: () => void;
};

export const ArrowButton: React.FC<Props> = ({
  direction,
  isDisabled = false,
  height = '32px',
  width = '32px',
  onClick,
}) => (
  <button
    disabled={isDisabled}
    className={`
      ${styles.arrow}
    `}
    style={{ height, width }}
    onClick={onClick}
  >
    <Arrow direction={direction} isDisabled={isDisabled} />
  </button>
);
