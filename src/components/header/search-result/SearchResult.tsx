import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { TProduct } from '@utils/types/product.type';
import { getProductUrl } from '@utils/helpers/getProductUrl';

import styles from './SearchResult.module.scss';
import { scrollToTop } from '@utils/helpers/scrollToTop';

type TProps = {
  currentItemId: string;
  filteredProducts: TProduct[];
  setQuery: () => void;
};

export const SearchResult: FC<TProps> = ({
  currentItemId,
  filteredProducts = [],
  setQuery,
}) => {
  const URL = (category: string, itemId: string) =>
    getProductUrl(category, itemId);

  const NO_RESULT = filteredProducts.length === 0;

  const onClick = () => {
    setQuery();
    scrollToTop();
  };
  return (
    <div className={styles.box}>
      {NO_RESULT ? (
        <div className={styles.noMatch}>
          <p>Nothing was found for your request. Please specify your request</p>
        </div>
      ) : (
        filteredProducts.map(({ name, itemId, id, image, category }) => (
          <Link
            to={URL(category, itemId)}
            key={id}
            state={{ itemId: itemId }}
            className={cn(
              styles.link,
              currentItemId === itemId && styles.active,
            )}
            title={`View details for ${name}`}
            aria-label={`View details for ${name}`}
            onClick={onClick}
          >
            <div className={styles.wrapper}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
                role="img"
                aria-label={name}
              />
              <div className={styles.title}>
                <p>{name}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
