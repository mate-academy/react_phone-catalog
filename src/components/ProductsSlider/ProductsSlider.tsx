import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleProducts = products.slice(startIndex, startIndex + 4);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + 4 < products.length;

  return (
    <section className="products-slider">
      <div className="products-slider__top">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__buttons">
          <button
            type="button"
            className="products-slider__button"
            disabled={!canGoPrev}
            onClick={() => setStartIndex(current => current - 1)}
          >
            ‹
          </button>

          <button
            type="button"
            className="products-slider__button"
            disabled={!canGoNext}
            onClick={() => setStartIndex(current => current + 1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="products-slider__list">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
