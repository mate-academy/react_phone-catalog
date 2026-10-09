/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../Shared/Product/ProductCard';
import { Sort } from '../Shared/Sort/Sort';
import { Product } from '../../types/Product';

import productsData from '../../../public/api/products.json';
import { Loader } from '../Shared/Loader/Loader';
import { getAccessorie } from '../Api';
import { Pagination } from '../Shared/Pagination/Pagination';

export const AccessoriesPage: React.FC = () => {
  const [accesorie, setAccesorie] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const perPageParam = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    getAccessorie()
      .then(data => {
        setError(false);
        setAccesorie(data);
      })
      .catch(() => {
        setAccesorie(productsData as Product[]);
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
    const sorted = [...accesorie];

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
  }, [accesorie, sortBy]);

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
    if (!accesorie.length) {
      return 0;
    }

    return Math.max(...accesorie.map(p => p.year));
  }, [accesorie]);

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
              <span className="catalog__visit">Accessories</span>
            </div>

            <h1>Accessories</h1>
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
                  <p>There are no accessories yet</p>
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
