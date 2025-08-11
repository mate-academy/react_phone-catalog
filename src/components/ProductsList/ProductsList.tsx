import React, { useRef } from 'react';
import './ProductsList.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  title: string;
};

export const ProductsList: React.FC<Props> = ({ products, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 272 + 16;

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="header-row">
        <h2>{title}</h2>
        <div className="arrow">
          <button className="arrow__button" onClick={scrollLeft}>
            <img
              className="arrow__image"
              src="/img/icons/arrow-left.svg"
              alt="arrow left"
            />
          </button>

          <button className="arrow__button" onClick={scrollRight}>
            <img
              className="arrow__image"
              src="/img/icons/arrow-right.svg"
              alt="arrow right"
            />
          </button>
        </div>
      </div>
      <div className="products-list" ref={containerRef}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
