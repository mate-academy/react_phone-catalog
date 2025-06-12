import { NavigateFunction } from 'react-router-dom';
import { ProductData } from '../../../types/ProductData';
import styles from './BackButton.module.scss';

type Props = {
  product: ProductData | null;
  navigate: NavigateFunction;
};

export const BackButton: React.FC<Props> = ({ product, navigate }) => {
  return (
    <button
      className={styles.back__button}
      onClick={
        product ? () => navigate(`/${product?.category}`) : () => navigate(`/`)
      }
    >
      <div className={styles.back__button__item}>
        <div className={styles.back__button__image} />
      </div>
      <span className={styles.back__button__text}>Back</span>
    </button>
  );
};
