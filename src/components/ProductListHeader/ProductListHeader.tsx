import { IconLeft } from '../../ui/IconLeft';
import { IconRight } from '../../ui/IconRight';

import styles from './ProductListHeader.module.scss';

type Props = {
  title: string | undefined;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
};

export const ProductListHeader: React.FC<Props> = ({
  title,
  handlePrevSlide,
  handleNextSlide,
}) => {
  return (
    <div className={styles.ProductsHeader}>
      <p className={styles.Title}>{title}</p>

      <div className={styles.Buttons}>
        <button className={styles.Button} onClick={handlePrevSlide}>
          <IconLeft className={styles.Icon} fill="#4A4D58" />
        </button>
        <button className={styles.Button} onClick={handleNextSlide}>
          <IconRight fill="#F1F2F9" />
        </button>
      </div>
    </div>
  );
};
