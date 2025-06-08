import styles from './MSPButton.module.scss';
import { Direction } from '../../types/MSPtypes';

type Props = {
  dir: Direction;
  className: string;
  onClick: () => void;
};

export const MSPButton: React.FC<Props> = ({ dir, className, onClick }) => {
  return (
    <button
      className={`${styles['sw-button']} ${className}-${dir}`}
      onClick={onClick}
    >
      <img
        src={`/src/assets/icons/arrow-${dir}.svg`}
        className={styles['sw-arrow']}
        alt=""
      />
    </button>
  );
};
