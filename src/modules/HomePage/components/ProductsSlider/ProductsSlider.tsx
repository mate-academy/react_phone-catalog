// src/components/ProductsSlider/ProductsSlider.tsx
import { useRef } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) {
      return;
    }

    const scrollAmount = 300;

    if (direction === 'left') {
      sliderRef.current.scrollLeft -= scrollAmount;
    } else {
      sliderRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section>
      <h2>{title}</h2>

      <button onClick={() => scroll('left')}>{'<'}</button>
      <button onClick={() => scroll('right')}>{'>'}</button>

      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
        }}
      >
        {products.map(product => (
          <div key={product.itemId} style={{ minWidth: '250px' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
