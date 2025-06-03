'use client';

import { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setProducts } from '@/store/features/products/productsSlice';
import rawData from '@/api/accessories.json';
import { Product } from '@/types/Product';
import { PhoneCard } from '@/components/PhoneCard';
import { PhonesGridWithPaginationProps } from '@/types/Product';
import { SkeletonCard } from '@/components/Skeleton';

export const AccessoriesGridWithPagination = ({
  sortFunction,
  itemsOnPage,
  currentPage,
  setCurrentPage,
}: PhonesGridWithPaginationProps) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const data: Omit<Product, 'quantity'>[] = rawData;

  const processedData = data.map(item => ({
    ...item,
    quantity: 0,
  }));

  useEffect(() => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      try {
        dispatch(setProducts(processedData));
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const itemsPerPage =
    itemsOnPage === 'All' ? products.length : parseInt(itemsOnPage || '8');

  const sortedProducts = useMemo(() => {
    if (!products.length) return [];
    const result = [...products];
    return sortFunction ? result.sort(sortFunction) : result;
  }, [products, sortFunction]);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPages = () => {
    const pages = [];
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-8 h-8 flex items-center justify-center font-semibold ${
            currentPage === i
              ? 'bg-color-btn-purple text-text-color-base-white'
              : 'bg-color-btn-pagin text-text-color-base-white hover:bg-color-border'
          }`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  if (loading)
    return (
      <div className="px-4 mt-10 font-mont sm:px-6 md:px-8 xl:px-[152px]">
        <div className="flex flex-wrap justify-center md:justify-normal gap-4 mb-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="text-text-color-base-white text-center my-10">
        <p>Something went wrong </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 rounded text-text-color-base-white"
        >
          Reload
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-text-color-base-white text-center my-10">
        There are no phones yet.
      </div>
    );
  }

  return (
    <div className="px-4 mt-10 font-mont sm:px-6 md:px-8 xl:px-[152px]">
      <div className="flex flex-wrap justify-center md:justify-normal gap-4 mb-10">
        {paginatedProducts.map(product => (
          <PhoneCard key={product.id} product={product} showDiscount variant='phone' />
        ))}
      </div>

      {itemsOnPage !== 'All' && (
        <div className="flex gap-2 justify-center items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex mr-2 items-center justify-center ${
              currentPage === 1
                ? 'border border-color-border opacity-70 cursor-not-allowed'
                : 'bg-background-color-btn hover:bg-background-color-btn-hover'
            }`}
          >
            <img src="icons/arrow-left.svg" alt="left" />
          </button>

          {renderPages()}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex ml-2 items-center justify-center ${
              currentPage === totalPages
                ? 'border border-color-border opacity-70 cursor-not-allowed'
                : 'bg-background-color-btn hover:bg-background-color-btn-hover'
            }`}
          >
            <img src="icons/arrow-right.svg" alt="right" />
          </button>
        </div>
      )}
    </div>
  );
};
