import { useRef } from 'react';
import { Product } from '@/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { Button } from '@heroui/button';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import React from 'react';

type Props = {
  products: Product[];
};

export const BrandNewModelsSlider: React.FC<Props> = ({ products }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const sorted = [...products].sort((a, b) => b.year - a.year);

  const scroll = (direction: 'left' | 'right') => {
    const container = listRef.current;

    if (!container) {
      return;
    }

    const cardWidth = container.firstElementChild?.clientWidth ?? 320;

    container.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="font-extrabold text-[22px] sm:text-[32px] text-[#0F0F11]">
          Brand new models
        </h2>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="bordered"
            radius="full"
            className="border-gray-300 w-8 h-8 min-w-8 min-h-8 p-0 flex items-center justify-center"
            onPress={() => scroll('left')}
          >
            <CaretLeftIcon size={12} color="#030303" />
          </Button>
          <Button
            isIconOnly
            variant="bordered"
            radius="full"
            className="border-gray-300 w-8 h-8 min-w-8 min-h-8 p-0 flex items-center justify-center"
            onPress={() => scroll('right')}
          >
            <CaretRightIcon size={12} color="#030303" />
          </Button>
        </div>
      </div>

      {/* Slider container */}
      <div
        ref={listRef}
        className="flex gap-6 overflow-x-auto overflow-y-visible scroll-smooth hideScrollBar pb-4"
      >
        {sorted.map(product => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
