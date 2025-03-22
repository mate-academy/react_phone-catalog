import React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { ProductsSlider } from '../ProductsSlider';
import './SuggestedProducts.scss';
import { Product } from '../../types/Product';

type Props = {
  errorMessage: string;
  sortedProducts?: Product[];
};

export const SuggestedProducts: React.FC<Props> = ({
  errorMessage,
  sortedProducts,
}) => {
  return (
    <>
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        sortedProducts && (
          <div className="recomandation">
            <div className="recomandation__top">
              <h2 className="recomandation__title">You may also like</h2>
              <div className="recomandation__buttons">
                {/* eslint-disable-next-line max-len */}
                <button className="recomandation__button recomandation__button--prev"></button>
                {/* eslint-disable-next-line max-len */}
                <button className="recomandation__button recomandation__button--next"></button>
              </div>
            </div>
            <ProductsSlider
              products={sortedProducts}
              blockClass={'recomandation'}
            />
          </div>
        )
      )}
    </>
  );
};
