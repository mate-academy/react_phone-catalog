'use client';

import { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setProducts } from '@/store/features/products/productsSlice';
import data from '@/api/phones.json';
import { PhoneCard } from '@/components/PhoneCard';
import { PhonesGridWithPaginationProps } from '@/types/Product';

export const PhonesGridWithPagination = ({
  sortFunction,
  itemsOnPage,
  currentPage,
  setCurrentPage,
}: PhonesGridWithPaginationProps) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      try {
        dispatch(setProducts(data));
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);


  const itemsPerPage =
    itemsOnPage === 'All' ? products.length : parseInt(itemsOnPage || '4');

  const sortedProducts = useMemo(() => {
    if (!products.length) return [];
    const result = [...products];
    return sortFunction ? result.sort(sortFunction) : result;
  }, [products, sortFunction]);

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
        </button>
      );
    }

    return pages;
  };

  if (loading)
    return (
      <div className="text-text-color-base-white font-mont text-2xl text-center my-10">
        Loading...
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
      <div className="grid grid-cols-4 gap-4 mb-10">
        {paginatedProducts.map((product) => (
          <PhoneCard key={product.id} product={product} showDiscount />
        ))}
      </div>

      {itemsOnPage !== 'All' && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center ${
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
            className={`w-8 h-8 flex items-center justify-center ${
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
