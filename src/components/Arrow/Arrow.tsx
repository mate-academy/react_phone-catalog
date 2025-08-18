import { useAppContext } from '../../contexts/AppContext';
import styles from './Arrow.module.scss';

type Props = {
  direction: 'left' | 'right' | 'up' | 'down';
  isDisabled?: boolean;
  height?: string;
  width?: string;
  onClick: () => void;
};

export const Arrow: React.FC<Props> = ({
  direction,
  isDisabled = false,
  height = '32px',
  width = '32px',
  onClick,
}) => {
  const { theme } = useAppContext();

  return (
    <button
      disabled={isDisabled}
      className={`
        ${styles.arrow}
      `}
      style={{ height, width }}
      onClick={onClick}
    >
      <img
        className={styles[direction]}
        src={isDisabled ?
          `/img/icons/${theme}-theme/arrow-disabled.svg` :
          `/img/icons/${theme}-theme/arrow.svg`
        }
        alt={`Arrow ${direction}`}
      />
    </button>
  );
};
