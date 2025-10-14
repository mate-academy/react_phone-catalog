import { useProdCard } from '@features/index';
import { ProductCard } from '@entities/prodCard';
import { CatalogueData } from '@shared/api/types';
import styles from '../styles/catalogue.module.scss';

type Props = {
  data: CatalogueData;
};

export const CatalogueGrid = ({ data }: Props) => {
  const { isIn, stateHandlers } = useProdCard();

  return (
    <ul className={styles.catalogue}>
      {data.items.map((el, index) => (
        <ProductCard
          key={index}
          product={el}
          isIn={isIn}
          stateHandlers={stateHandlers}
        />
      ))}
    </ul>
  );
};
