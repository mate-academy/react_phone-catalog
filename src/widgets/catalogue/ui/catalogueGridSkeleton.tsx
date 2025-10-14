import { ProductCardSkeleton } from '@ui/index';
import styles from '../styles/catalogue.module.scss';
import { ItemsAmount } from '@shared/api';

type Props = {
  currentPerPage: ItemsAmount;
};

export const CatalogueGridSkeleton = ({ currentPerPage }: Props) => {
  const arr = Array.from({ length: +currentPerPage || 16 }, (_, i) => i);

  return (
    <div className={styles.catalogue}>
      {arr.map(el => (
        <ProductCardSkeleton key={el} />
      ))}
    </div>
  );
};
