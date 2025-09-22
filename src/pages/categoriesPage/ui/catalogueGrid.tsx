import { LoadingStates, useProdCard } from '@features/index';
import styles from '../styles/catalogue.module.scss';
import { ProductCard } from '@entities/prodCard';
import { CatalogueData, Category } from '@shared/api/types';
import { createLoaderMap, ErrorElement } from '@ui/index';

type Props = {
  data: CatalogueData | LoadingStates;
  category: Category;
};

export const CatalogueGrid = ({ data, category }: Props) => {
  const { isIn, stateHandlers } = useProdCard();

  if (typeof data === 'string') {
    return createLoaderMap(data, styles.message, styles.message)[data];
  }

  if (data.items === null) {
    return (
      <ErrorElement
        message={`There are no ${category} yet`}
        className={styles.message}
      />
    );
  }

  return (
    <ul className={styles.catalogue}>
      {data.items.map(el => (
        <ProductCard
          key={el.key}
          product={el}
          isIn={isIn}
          stateHandlers={stateHandlers}
        />
      ))}
    </ul>
  );
};
