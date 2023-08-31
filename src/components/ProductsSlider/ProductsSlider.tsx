import React, { useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import { IconButton } from '../../bits';
import { IconButtonType } from '../../types/enums/IconButtonType';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const visibleProducts = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleProducts;

  const handleVisibleProducts = (action: string | null) => () => {
    return action === 'dec'
      ? setStart(prev => prev - visibleProducts)
      : setStart(prev => prev + visibleProducts);
  };

  return (
    <div className="products-slider">
      <div className="products-slider__upper">
        <h2 className="products-slider__title">{title}</h2>
        <div className="products-slider__buttons">
          <IconButton
            type={IconButtonType.arrowBack}
            disabled={start === 0}
            handler={handleVisibleProducts('dec')}
          />

          <IconButton
            type={IconButtonType.arrowNext}
            handler={handleVisibleProducts(null)}
            disabled={end === products.length}
          />
        </div>
      </div>

      <div
        className="products-slider__list"
      >
        {products.slice(start, end).map(prod => (
          <ProductCard product={prod} />
        ))}
      </div>

    </div>
  );
};
