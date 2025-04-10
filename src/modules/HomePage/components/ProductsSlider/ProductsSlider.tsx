'use client'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setProducts } from '@/store/features/products/productsSlice';
import data from '@/api/phones.json';
import { PhoneCard } from '@/components/PhoneCard';
import { useEffect, useState, useMemo } from 'react';
import { ProductsSliderProps } from '@/types/Product';

export const ProductsSlider = ({ 
  title,
  sortFunction,
  cardProps
 }: ProductsSliderProps) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4;

  useEffect(() => {
    dispatch(setProducts(data));
  }, [dispatch]);

  
  const filteredSortedProducts = useMemo(() => {
    let result = [...products];

    if (sortFunction) {
      result = result.sort(sortFunction);
    }

    return result;
  }, [products, sortFunction]);

  const maxIndex = Math.max(filteredSortedProducts.length - visibleCards, 0);

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  if (!filteredSortedProducts || filteredSortedProducts.length === 0) {
    return <p className='text-text-color-base-white'>No products found</p>
  }

  return (
    <div className="overflow-hidden px-4 sm:px-8 xl:px-[152px] relative mt-20">
      <div className="flex justify-between items-center mb-6 max-w-[1136px]">
        <h2 className="text-[22px] sm:text-[32px] text-text-color-base-white font-extrabold font-mont leading-[1.4]">
          {title}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`w-8 h-8 flex items-center justify-center ${currentIndex === 0
              ? 'border border-color-border opacity-70 cursor-not-allowed'
              : 'bg-background-color-btn hover:bg-background-color-btn-hover'
              }`}
          >
            <img src="icons/arrow-left.svg" alt="left" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`w-8 h-8 flex items-center justify-center ${currentIndex === maxIndex
              ? 'border border-color-border opacity-70 cursor-not-allowed'
              : 'bg-[#3E3E4A] hover:bg-[#4E4E5A]'
              }`}
          >
            <img src="icons/arrow-right.svg" alt="right" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden max-w-[1136px]">
        <div
          className="flex transition-transform duration-500 gap-4"
          style={{
            transform: `translateX(-${currentIndex * (272 + 16)}px)`,
          }}
        >
          {filteredSortedProducts.map((product) => (
            <div key={product.id} style={{ flex: '0 0 272px' }}>
              <PhoneCard product={product} {...cardProps} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
