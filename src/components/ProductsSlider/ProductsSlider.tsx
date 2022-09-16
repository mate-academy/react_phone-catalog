import React, { useState } from 'react';

import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [firstProduct, setFirstProduct] = useState<number>(0);
  const [lastProduct, setLastProduct] = useState<number>(3);

  const countPage = Math.ceil(products.length / 4) * 4;

  const handlerForward = () => {
    if (lastProduct !== products.length - 1) {
      setFirstProduct(firstProduct + 4);
      setLastProduct(
        lastProduct >= products.length - 1
          ? (products.length - 1)
          : lastProduct + 4,
      );
    }
  };

  const handlerBack = () => {
    if (firstProduct !== 0) {
      setFirstProduct((firstProduct - 4) < 0 ? 0 : firstProduct - 4);
      setLastProduct(lastProduct - 4);
    }
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__header">
        <h3 className="ProductsSlider__title">{title}</h3>
        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className="ProductsSlider__button"
            disabled={firstProduct === 0}
            onClick={handlerBack}
          >
            <i className="icon-Chevron-Arrow-Left" />
          </button>
          <button
            type="button"
            className="ProductsSlider__button"
            disabled={lastProduct + 1 === countPage}
            onClick={handlerForward}
          >
            <i className="icon-Chevron-Arrow-Right" />
          </button>
        </div>
      </div>
      <div className="ProductsSlider__body">
        {products.filter((product, index) => {
          if (index >= firstProduct && index <= lastProduct) {
            return product;
          }

          return false;
        })
          .map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};
