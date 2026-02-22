import { useRef } from 'react';
import ProductCard from '../ui/ProductCard';
import { Product } from '../../types/itemTypes';

const ProductSlider = ({
  title,
  filteredProducts,
}: {
  title: string;
  filteredProducts: Product[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const cardWidth = current.firstElementChild?.clientWidth || 0;
      const gap = 16;

      const moveDistance =
        direction === 'left' ? -(cardWidth + gap) : cardWidth + gap;

      current.scrollBy({
        left: moveDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="flex gap-6 flex-col">
      {/* temporary padding */}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="flex justify-center items-center size-8 border border-gray-400"
          >
            <img
              src="../../../public/img/icons/Vector (Stroke) left.svg"
              alt="previous"
            />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex justify-center items-center size-8 border border-gray-400"
          >
            <img
              src="../../../public/img/icons/Vector (Stroke) right.svg"
              alt="next"
            />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex slider-container flex-row gap-4 overflow-auto"
      >
        {filteredProducts.map(selectedProduct => {
          return (
            <ProductCard key={selectedProduct.id} product={selectedProduct} />
          );
        })}
      </div>
    </section>
  );
};

export default ProductSlider;
