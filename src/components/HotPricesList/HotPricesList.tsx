import React from 'react';
import './HotPricesList.scss';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider';

type Props = {
  products: Product[];
  errorMessage: string;
};

export const HotPricesList: React.FC<Props> = ({ products, errorMessage }) => {
  const sortedProducts = [...products].sort((a, b) => {
    const discountA = a.fullPrice - (a.price || a.fullPrice);
    const discountB = b.fullPrice - (b.price || b.fullPrice);

    return discountB - discountA;
  });

  return (
    <div className="home__hot-prices hot-prices">
      <div className="hot-prices__top">
        <h2 className="hot-prices__title">Hot prices</h2>
        <div className="hot-prices__buttons">
          {/* eslint-disable-next-line max-len */}
          <button className="hot-prices__button hot-prices__button--prev"></button>
          {/* eslint-disable-next-line max-len */}
          <button className="hot-prices__button hot-prices__button--next"></button>
        </div>
      </div>
      {errorMessage ? (
        errorMessage
      ) : (
        <ProductsSlider products={sortedProducts} blockClass={'hot-prices'} />
      )}
    </div>
  );
};
