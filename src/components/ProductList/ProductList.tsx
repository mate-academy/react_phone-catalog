import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import type { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

const cx = classNames.bind(styles);

const MAX_PAGE_BUTTONS = 4;

type Props = {
  products: Product[];
  perPage?: number;
};

export const ProductList = ({ products, perPage }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = perPage ? perPage : Math.max(products.length, 1);

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const page = Math.min(Math.max(pageFromUrl, 1), totalPages);

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;

    return products.slice(start, start + itemsPerPage);
  }, [products, page, itemsPerPage]);

  const firstButton = Math.min(
    Math.max(page - 1, 1),
    Math.max(totalPages - MAX_PAGE_BUTTONS + 1, 1),
  );

  const lastButton = Math.min(firstButton + MAX_PAGE_BUTTONS - 1, totalPages);

  const pages = Array.from(
    { length: lastButton - firstButton + 1 },
    (_, i) => firstButton + i,
  );

  const goToPage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (safePage === 1) {
        params.delete('page');
      } else {
        params.set('page', String(safePage));
      }

      return params;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cx('product-list')}>
      <div className={cx('product-list__grid')}>
        {visibleProducts.map(product => (
          <div key={product.id} className={cx('product-list__item')}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className={cx('product-list__pagination')} aria-label="Pagination">
          <button
            type="button"
            className={cx('product-list__page-button')}
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {pages.map(p => (
            <button
              key={p}
              type="button"
              className={cx('product-list__page-button', {
                'product-list__page-button--active': p === page,
              })}
              onClick={() => goToPage(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          <button
            type="button"
            className={cx('product-list__page-button')}
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
};
