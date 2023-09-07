import React, { useEffect, useRef } from 'react';

import ProductCard from './ProductCard';

import { Product } from '../../types/Phone';

import { transformStyle } from '../../utils/transformStyle';

interface Props {
  visibleProducts: Product[];
  index: number;
}

const BrowseProducts: React.FC<Props> = ({ visibleProducts, index }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="slider-wrapper" ref={wrapperRef}>
      <div
        className="browse-products"
        style={transformStyle(index)}
      >
        {visibleProducts?.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default BrowseProducts;
