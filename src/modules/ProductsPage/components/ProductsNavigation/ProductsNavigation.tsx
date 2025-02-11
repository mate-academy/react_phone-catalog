import React from 'react';
import classNames from 'classnames';

import { Arrow } from '@components/Arrow';
import { SearchLink } from '../SearchLink';
import { ArrowType } from '@sTypes/ArrowType';

import styles from './ProductsNavigation.module.scss';

const MAX_VISIBLE_PAGES = 5;

function getVisiblePageRange(pagesCount: number, currentPage: number) {
  const half = Math.floor(MAX_VISIBLE_PAGES / 2);

  let start = Math.max(currentPage - half, 0);
  const end = Math.min(start + MAX_VISIBLE_PAGES, pagesCount);

  if (end - start < MAX_VISIBLE_PAGES && start > 0) {
    start = Math.max(end - MAX_VISIBLE_PAGES, 0);
  }

  return { start, end };
}

type Props = {
  page: number;
  pagesCount: number;

  scrollToProducts: () => void;
};

export const ProductsNavigation: React.FC<Props> = ({
  page,
  pagesCount,

  scrollToProducts,
}) => {
  const { start, end } = getVisiblePageRange(pagesCount, page);

  return (
    <div className={styles['products-navigation']}>
      <SearchLink
        style={!page ? { pointerEvents: 'none' } : undefined}
        params={{ page: page !== 1 ? `${page}` : null }}
        onClick={page ? () => scrollToProducts() : undefined}
      >
        <Arrow type={ArrowType.left} disabled={!page} />
      </SearchLink>

      <div className={styles['products-navigation__pages']}>
        {Array.from({ length: end - start }, (_, i) => {
          const index = start + i;

          return (
            <SearchLink
              key={index}
              params={{ page: index ? `${index + 1}` : null }}
              className={classNames(styles['products-navigation__page'], {
                [styles['products-navigation__page--active']]: index === page,
              })}
              onClick={() => scrollToProducts()}
            >
              {index + 1}
            </SearchLink>
          );
        })}
      </div>

      <SearchLink
        style={page === pagesCount - 1 ? { pointerEvents: 'none' } : undefined}
        params={{ page: `${page + 2}` }}
        onClick={() => scrollToProducts()}
      >
        <Arrow
          type={ArrowType.right}
          disabled={!pagesCount || page === pagesCount - 1}
        />
      </SearchLink>
    </div>
  );
};
