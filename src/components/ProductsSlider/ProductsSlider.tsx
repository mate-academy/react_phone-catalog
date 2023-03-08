import React, { useState } from 'react';
import './ProductsSlider.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ButtonLeft } from '../ButtonLeft/ButtonLeft';
import { ButtonRight } from '../ButtonRight/ButtonRight';

type Props = {
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ products }) => {
  const [transform, setTransform] = useState(0);

  const handleNext = () => {
    if (transform !== -(products.length - 4) * 288) {
      setTransform(transform - 288);
    }
  };

  const handlePrev = () => {
    if (transform !== 0) {
      setTransform(transform + 288);
    }
  };

  return (
    <div className="products-slider">
      <div className="products-slider__buttons-wrapper">

        <ButtonLeft
          handleClick={handlePrev}
          transform={transform}
        />

        <ButtonRight
          handleClick={handleNext}
          transform={transform}
          productsNumber={products.length}
        />
      </div>

      <div
        className="products-slider__slides"
        style={{ transform: `translateX(${transform}px)` }}
      >
        {products.map(product => (
          <ProductCard
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};
