import React, { useRef } from 'react';
import './ProductsList.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import { ButtonScroll } from '../ButtonScroll';

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
          <ButtonScroll
            buttonText="/img/icons/arrow-left.svg"
            clickFunc={scrollLeft}
          />

          <ButtonScroll
            buttonText="/img/icons/arrow-right.svg"
            clickFunc={scrollRight}
          />
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
