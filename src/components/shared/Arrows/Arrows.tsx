import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import styles from './Arrows.module.scss';

type ArrowProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const NextArrow: React.FC<ArrowProps> = ({ onClick, disabled }) => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <button
      className={`${styles.custom__arrow} ${isSunSelected ? styles.custom__next : styles.custom__next_dark} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
    ></button>
  );
};

export const PrevArrow: React.FC<ArrowProps> = ({ onClick, disabled }) => {
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <button
      className={`${styles.custom__arrow} ${isSunSelected ? styles.custom__prev : styles.custom__prev_dark} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
    ></button>
  );
};
