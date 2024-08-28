import { useContext } from 'react';
import styles from '../CustomArrows/CustomArrows.module.scss';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

export const CustomPrevArrow: React.FC<ArrowProps> = props => {
  const { className, onClick } = props;
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div
      className={
        isSunSelected
          ? `${className} ${styles.customArrow} ${styles.customPrevArrow}`
          : `${className} ${styles.customArrow_dark} ${styles.customPrevArrow_dark}`
      }
      onClick={onClick}
    ></div>
  );
};

export const CustomNextArrow: React.FC<ArrowProps> = props => {
  const { className, onClick } = props;
  const { isSunSelected } = useContext(GlobalContext);

  return (
    <div
      className={
        isSunSelected
          ? `${className} ${styles.customArrow} ${styles.customNextArrow}`
          : `${className} ${styles.customArrow_dark} ${styles.customNextArrow_dark}`
      }
      onClick={onClick}
    ></div>
  );
};
