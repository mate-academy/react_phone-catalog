import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsGrid.module.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import WhiteLeft from '../../assets/icons/Chevron (Arrow Left).svg';
import GrayLeft from '../../assets/icons/Chevron (Arrow Left Gray).svg';
import WhiteRight from '../../assets/icons/Chevron (Arrow Right).svg';
import GrayRight from '../../assets/icons/Chevron (Arrow Right Gray).svg';
import { Loader } from '../../components/Loader/Loader';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number | string;
  oldPrice?: string;
  specs?: { left: string; right: string }[];
}

interface ProductsGridProps {
  products: Product[];
  visibleCount: number | 'all';
  showPagination?: boolean;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  visibleCount,
  showPagination = true,
  className,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');

  const currentPage = Math.max(Number(pageParam) || 1, 1);
  const perPage =
    perPageParam === 'all'
      ? products.length
      : Number(perPageParam) ||
        (visibleCount === 'all' ? products.length : visibleCount);

  const totalPages = Math.ceil(products.length / perPage);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const visibleProducts = products.slice(start, end);

  const handleSetPage = (page: number) => {
    setIsLoading(true);
    const params: Record<string, string> = {};

    if (page > 1) {
      params.page = String(page);
    }

    if (visibleCount !== 'all') {
      params.perPage = String(visibleCount);
    }

    setSearchParams(params);

    setTimeout(() => setIsLoading(false), 300);
  };

  const handlePrev = () => handleSetPage(Math.max(currentPage - 1, 1));
  const handleNext = () => handleSetPage(Math.min(currentPage + 1, totalPages));

  const maxButtons = 4;
  const startPage = Math.max(
    Math.min(currentPage - 2, totalPages - maxButtons + 1),
    1,
  );

  const pageNumbers = Array.from(
    { length: Math.min(maxButtons, totalPages) },
    (_, i) => startPage + i,
  );

  const activeIndex = pageNumbers.indexOf(currentPage);

  useEffect(() => {
    setIsLoading(true);
    const params: Record<string, string> = {};

    if (currentPage > 1) {
      params.page = String(currentPage);
    }

    if (visibleCount !== 'all') {
      params.perPage = String(visibleCount);
    }

    setSearchParams(params);

    setTimeout(() => setIsLoading(false), 300);
  }, [visibleCount]);

  useEffect(() => {
    setIsLoading(true);
    const params: Record<string, string> = {};

    if (currentPage > 1) {
      params.page = String(currentPage);
    }

    if (visibleCount !== 'all') {
      params.perPage = String(visibleCount);
    }

    setSearchParams(params, { replace: true });

    const timer = setTimeout(() => setIsLoading(false), 300);

    return () => clearTimeout(timer);
  }, [visibleCount, currentPage, setSearchParams]);

  return (
    <div className={`${styles.grid} ${className || ''}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.cardsWrapper}>
            {visibleProducts.map((product, idx) => (
              <ProductCard
                key={product.reactId}
                id={product.reactId}
                originalId={product.originalId}
                image={product.image}
                title={product.title}
                price={
                  product.price.toString().startsWith('$')
                    ? product.price
                    : `$${product.price}`
                }
                oldPrice={product.oldPrice ? `$${product.oldPrice}` : undefined}
                specs={product.specs || product.baseSpecs}
                className={`${styles.tabletCard} ${
                  idx === visibleProducts.length - 1 ? styles.lastMobile : ''
                }`}
              />
            ))}
          </div>

          {showPagination !== false && (
            <div className={styles.pagination}>
              <button
                className={`${styles.arrowBtn} ${styles.prevArrow}`}
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <img
                  src={currentPage === 1 ? GrayLeft : WhiteLeft}
                  alt="Previous"
                />
              </button>

              {pageNumbers.map((num, idx) => (
                <button
                  key={num}
                  onClick={() => handleSetPage(num)}
                  className={`${styles.pageNumber} ${
                    activeIndex === idx ? styles.active : ''
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                className={`${styles.arrowBtn} ${styles.nextArrow}`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                <img
                  src={currentPage === totalPages ? GrayRight : WhiteRight}
                  alt="Next"
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
