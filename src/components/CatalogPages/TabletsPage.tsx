/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../Shared/Product/ProductCard';
import { Sort } from '../Shared/Sort/Sort';
import { Product } from '../../types/Product';

import productsData from '../../../public/api/products.json';
import { Loader } from '../Shared/Loader/Loader';
import { getTablet } from '../Api';
import { Pagination } from '../Shared/Pagination/Pagination';

export const TabletsPage: React.FC = () => {
  const [tablet, setTablet] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const perPageParam = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    getTablet()
      .then(data => {
        setError(false);
        setTablet(data);
      })
      .catch(() => {
        setTablet(productsData as Product[]);
        setError(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const sortedPhones = useMemo(() => {
    const sorted = [...tablet];

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.year - a.year);
      case 'alphabetically':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheapest':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [tablet, sortBy]);

  const itemsPerPage =
    perPageParam === 'all' ? sortedPhones.length : Number(perPageParam);
  const totalPages = Math.ceil(sortedPhones.length / (itemsPerPage || 1)) || 1;
  const validPage = Math.max(1, Math.min(currentPage, totalPages));
  const visiblePhones = useMemo(() => {
    if (perPageParam === 'all') {
      return sortedPhones;
    }

    const startIndex = (validPage - 1) * itemsPerPage;

    return sortedPhones.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPhones, validPage, itemsPerPage, perPageParam]);

  const handlePageChange = (newPage: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', String(newPage));

      return newParams;
    });
  };

  const maxYear = useMemo(() => {
    if (!tablet.length) {
      return 0;
    }

    return Math.max(...tablet.map(p => p.year));
  }, [tablet]);

  return (
    <main className="main">
      <div className="container">
        <div className="main__content">
          <section className="catalog">
            <div className="catalog__top">
              <Link to="/">
                <img src="./img/icons/Home.svg" alt="Home" />
              </Link>
              <img src="./img/icons/VectorRight.svg" alt="" />
              <span className="catalog__visit">Tablets</span>
            </div>

            <h1>Tablets</h1>
            <span className="catalog__text">{sortedPhones.length} models</span>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <>
                <p className="error">Something went wrong</p>
                <button onClick={() => window.location.reload()}>
                  Reload page
                </button>
              </>
            ) : (
              <>
                <Sort />

                {sortedPhones.length === 0 ? (
                  <p>There are no tablets yet</p>
                ) : (
                  <div className="catalog__products-cards">
                    {visiblePhones.map(product => {
                      const isBrandNew = product.year === maxYear;

                      return (
                        <div
                          className="catalog__products-card"
                          key={product.id}
                        >
                          <ProductCard
                            product={product}
                            hasDiscount={!isBrandNew}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="catalog__pagination-container">
                  <Pagination
                    currentPage={validPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
