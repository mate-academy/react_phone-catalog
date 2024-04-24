import React from 'react';

import { ButtonsLeft, ButtonsRight } from '../Buttons/Button';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

type Props = {
  title: string;
  product: Product[];
};

const HotPrices: React.FC<Props> = ({ title, product }) => {
  return (
    <div className="hot margin__top details__also">
      <div className="hot__top">
        <h1 className="hot__title">{title}</h1>

        <div className="hot__button">
          <ButtonsLeft />
          <ButtonsRight />
        </div>
      </div>

      <div className="hot__list">
        {product.map(item => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default HotPrices;
