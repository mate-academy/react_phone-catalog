/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';
import { ProductsList } from '../ProductsList';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsCount = 4;
  const stepLimit = products.length - itemsCount;

  const getVisibleProducts = () => {
    return [...products].splice(startIndex, itemsCount);
  };

  const visibleProducts = useMemo(
    getVisibleProducts,
    [startIndex, products],
  );

  const nextHandler = () => {
    setStartIndex(
      startIndex > stepLimit ? stepLimit : startIndex + itemsCount,
    );
  };

  const prevHandler = () => {
    setStartIndex(
      startIndex < 0 ? 0 : startIndex - itemsCount,
    );
  };

  return (
    <div className="productsSlider">
      <div className="productsSlider__top">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__buttons">
          <button
            type="button"
            className="productsSlider__button productsSlider__button--prev"
            disabled={startIndex === 0}
            onClick={prevHandler}
          />
          <button
            type="button"
            className="productsSlider__button productsSlider__button--next"
            disabled={startIndex === stepLimit}
            onClick={nextHandler}
          />
        </div>
      </div>
      <ProductsList products={visibleProducts} />
    </div>
  );
};
