import React, { useState } from 'react';
import { IconButtonType, Product } from 'types';
import { IconButton } from 'components/ui-kit';
import { ProductCard } from 'components';
import './ProductsSlider.scss';

type Props = {
  products: Product[],
  title: string,
};

enum Action {
  Dec = 'dec',
}

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const visibleProducts = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleProducts;

  const handleVisibleProducts = (action: string | null) => () => {
    return action === Action.Dec
      ? setStart(prev => prev - visibleProducts)
      : setStart(prev => prev + visibleProducts);
  };

  return (
    <div
      className="products-slider"
      data-cy="cardsContainer"
    >
      <div className="products-slider__upper">
        <h2 className="products-slider__title">{title}</h2>
        <div className="products-slider__buttons">
          <IconButton
            type={IconButtonType.arrowBack}
            disabled={!start}
            onClickHandler={handleVisibleProducts(Action.Dec)}
          />

          <IconButton
            type={IconButtonType.arrowNext}
            onClickHandler={handleVisibleProducts(null)}
            disabled={end >= products.length}
          />
        </div>
      </div>

      <div
        className="products-slider__list"
      >
        {products.slice(start, end).map(product => (
          <ProductCard
            product={product}
            key={product.id}
          />
        ))}
      </div>

    </div>
  );
};
