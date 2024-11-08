import { FC, memo } from 'react';

import { scrollToTop } from '@utils/helpers/scrollToTop';
import { TProduct } from '@utils/types/product.type';

import { NoResults, SearchItem } from '../';
import styles from './SearchResult.module.scss';

type TProps = {
  currentItemId: string;
  filteredProducts: TProduct[];
  resetSearchBar: () => void;
};

export const SearchResult: FC<TProps> = memo(
  ({ currentItemId, filteredProducts = [], resetSearchBar }) => {
    const NO_RESULT = filteredProducts.length === 0;

    const onClick = () => {
      resetSearchBar();
      scrollToTop();
    };

    return (
      <div className={styles.box}>
        {NO_RESULT ? (
          <NoResults />
        ) : (
          filteredProducts.map(product => (
            <SearchItem
              key={product.id}
              product={product}
              currentItemId={currentItemId}
              onClick={onClick}
            />
          ))
        )}
      </div>
    );
  },
);
