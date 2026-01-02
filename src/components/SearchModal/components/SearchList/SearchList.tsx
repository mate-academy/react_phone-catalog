import { Product } from '@/types/Product';
import { FC } from 'react';

import styles from './SearchList.module.scss';
import { SearchItem } from '../SearchItem';
import { SearchItemSkeleton } from '../SearchItemSkeleton/SearchItemSkeleton';

interface Props {
  products: Product[];
  isLoading?: boolean;
  itemsToLoad?: number;
}

export const SearchList: FC<Props> = ({
  products,
  isLoading,
  itemsToLoad = 10,
}) => {
  if (!isLoading && products.length === 0) {
    return <p className={styles.message}>No products found</p>;
  }

  return (
    <ul className={styles.list}>
      {isLoading &&
        Array.from({ length: itemsToLoad }).map((_, index) => (
          <li key={`loading-search-item-${index}`}>
            <SearchItemSkeleton />
          </li>
        ))}
      {!isLoading &&
        products.map(pr => <SearchItem product={pr} key={pr.id} />)}
    </ul>
  );
};
