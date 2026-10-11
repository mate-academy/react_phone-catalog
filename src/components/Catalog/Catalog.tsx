import styles from './Catalog.module.scss';

import { useEffect, useState } from 'react';
import { getAccessories } from '../../api/accessories';
import { getPhones } from '../../api/phones';
import { getTablets } from '../../api/tablets';
import { ProductDetails } from '../../types';
import { CatalogCard } from '../CatalogCard';
import { ProductCardSkeleton } from '../Loaders';
import { useSearchParams } from 'react-router-dom';

export type CatalogProps = {
  type: 'phones' | 'tablets' | 'accessories';
};

const getProducts = {
  phones: getPhones,
  tablets: getTablets,
  accessories: getAccessories,
};

export const Catalog = ({ type }: CatalogProps) => {
  const [products, setProducts] = useState<ProductDetails[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'all';

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const itensPerPage =
    perPage === 'all' ? Math.max(filteredProducts.length, 1) : Number(perPage);

  const totalPages = Math.ceil(filteredProducts.length / itensPerPage);

  const start = (page - 1) * itensPerPage;
  const end = page * itensPerPage;

  const startPage = Math.max(1, Math.min(page - 2, totalPages - 4));

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index,
  );

  const orderedProducts = () => {
    switch (sortBy) {
      case 'age':
        return filteredProducts.toReversed();

      case 'title':
        return filteredProducts.toSorted((a, b) =>
          a.name.localeCompare(b.name),
        );

      case 'price':
        return filteredProducts.toSorted(
          (a, b) => a.priceDiscount - b.priceDiscount,
        );

      default:
        return filteredProducts.toReversed();
    }
  };

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    getProducts[type]()
      .then(product => {
        setProducts(product);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [type]);

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setSearchParams(prev => {
        if (totalPages === 1) {
          prev.delete('page');
        } else {
          prev.set('page', String(totalPages));
        }

        return prev;
      });
    }
  }, [page, totalPages, setSearchParams]);

  return (
    <div className={styles.catalog}>
      {hasError && <p>Error loading products</p>}

      <section className={styles.catalog__selector}>
        <div
          className={`${styles['catalog__selector--container']} ${styles['catalog__selector--sortBy']}`}
        >
          <p>Sort By</p>

          <select
            value={sortBy}
            onChange={event => {
              setSearchParams(prev => {
                prev.set('sort', event.target.value);
                prev.delete('page');

                return prev;
              });
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>

          <img src="./icons/ChevronArrowDown.svg" alt="" />
        </div>

        <div
          className={`${styles['catalog__selector--container']} ${styles['catalog__selector--itensOnPage']}`}
        >
          <p>Items on page</p>

          <select
            value={perPage}
            onChange={event => {
              setSearchParams(prev => {
                const value = event.target.value;

                if (value === 'all') {
                  prev.delete('perPage');
                } else {
                  prev.set('perPage', value);
                }

                prev.delete('page');

                return prev;
              });
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>

          <img src="./icons/ChevronArrowDown.svg" alt="" />
        </div>
      </section>

      {isLoading &&
        Array.from({ length: perPage === 'all' ? 16 : itensPerPage }).map(
          (_, index) => <ProductCardSkeleton key={index} />,
        )}

      {!isLoading && !hasError && filteredProducts.length === 0 && (
        <h4 className={styles.catalog__noProducts}>No products found</h4>
      )}

      {!isLoading &&
        !hasError &&
        orderedProducts()
          .slice(start, end)
          .map(product => (
            <CatalogCard showFullPrice key={product.id} product={product} />
          ))}

      {totalPages > 1 && (
        <section className={styles.catalog__pagination}>
          <a
            className={styles['catalog__pagination--arrows']}
            aria-label="Previous page"
            onClick={() => {
              setSearchParams(prev => {
                const previousPage = Math.max(page - 1, 1);

                if (previousPage === 1) {
                  prev.delete('page');
                } else {
                  prev.set('page', String(previousPage));
                }

                return prev;
              });
            }}
          >
            <img src="./icons/ChevronArrowLeft.svg" alt="" />
          </a>

          <div className={styles['catalog__pagination--pages']}>
            {visiblePages.map(pageNumber => (
              <div
                key={pageNumber}
                className={
                  page === pageNumber
                    ? styles['catalog__pagination--active']
                    : ''
                }
                onClick={() => {
                  setSearchParams(prev => {
                    if (pageNumber === 1) {
                      prev.delete('page');
                    } else {
                      prev.set('page', String(pageNumber));
                    }

                    return prev;
                  });
                }}
              >
                <a>{pageNumber}</a>
              </div>
            ))}
          </div>

          <a
            className={styles['catalog__pagination--arrows']}
            aria-label="Next page"
            onClick={() => {
              setSearchParams(prev => {
                const nextPage = Math.min(page + 1, totalPages);

                if (nextPage === 1) {
                  prev.delete('page');
                } else {
                  prev.set('page', String(nextPage));
                }

                return prev;
              });
            }}
          >
            <img src="./icons/ChevronArrowRight.svg" alt="" />
          </a>
        </section>
      )}
    </div>
  );
};
