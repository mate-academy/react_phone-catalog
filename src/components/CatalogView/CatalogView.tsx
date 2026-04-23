import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import { getSearchParams } from '../../utils/searchParams';

type Props = {
  products: Product[];
  styles: Record<string, string>;
};

export const CatalogView: React.FC<Props> = ({ products, styles }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = +(searchParams.get('page') || '1');

  const isPagination = perPage !== 'all';
  const itemsPerPage = isPagination ? +perPage : products.length;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const visibleProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setSearchParams(getSearchParams({ page: page.toString() }, searchParams));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.catalogView}>
      <div className={styles.catalog__grid}>
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            classForCard={styles['catalog__grid-card']}
          />
        ))}
      </div>

      {isPagination && totalPages > 1 && (
        <nav className={styles.pagination}>
          <button
            className={`${styles.pagination__arrow} ${styles['pagination__arrow--left']}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />

          <ul className={styles.pagination__list}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page} className={styles.pagination__item}>
                <button
                  className={`${styles.pagination__button} ${
                    page === currentPage
                      ? styles['pagination__button--active']
                      : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.pagination__arrow} ${styles['pagination__arrow--right']}`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </nav>
      )}
    </section>
  );
};
