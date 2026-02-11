import { Product } from '@/types/Product';
import { FC } from 'react';

import styles from './SearchList.module.scss';
import { SearchItem } from '../SearchItem';
import { SearchItemSkeleton } from '../SearchItemSkeleton/SearchItemSkeleton';
import classNames from 'classnames';

interface Props {
  products: Product[];
  isLoading?: boolean;
  itemsToLoad?: number;
  className?: string;
}

export const SearchList: FC<Props> = ({
  products,
  isLoading,
  itemsToLoad = 10,
  className,
}) => {
  return (
    <ul className={classNames(styles.list, className)}>
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
