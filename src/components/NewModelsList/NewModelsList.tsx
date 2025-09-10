import React from 'react';
import './NewModelsList.scss';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[];
  errorMessage: string;
};

export const NewModelsList: React.FC<Props> = ({ products, errorMessage }) => {
  const sortedProducts = [...products].sort((a, b) => {
    return b.year - a.year;
  });

  return (
    <div className="home__new-models new-models">
      <div className="new-models__top">
        <h2 className="new-models__title">Brand new models</h2>
        <div className="new-models__buttons">
          {/* eslint-disable-next-line max-len */}
          <button className="new-models__button new-models__button--prev"></button>
          {/* eslint-disable-next-line max-len */}
          <button className="new-models__button new-models__button--next"></button>
        </div>
      </div>
      {errorMessage ? (
        errorMessage
      ) : (
        <ProductsSlider products={sortedProducts} blockClass={'new-models'} />
      )}
    </div>
  );
};
