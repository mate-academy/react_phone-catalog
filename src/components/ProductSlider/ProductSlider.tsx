import React, { useState } from 'react';
import './ProductSlider.scss';
import { Product } from '../../types/Product';

import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  products: Product[],
  title: string,
};

export const ProductSlider: React.FC<Props> = ({ products, title }) => {
  const [scroll, setScroll] = useState(0);
  const step = 4;
  const frameSize = 4;
  const itemWidth = 288;
  const animationDuration = 1000;

  const slideNextProduct = (length: number) => {
    if (scroll === length - frameSize) {
      setScroll(0);
    } else if (scroll + step >= length - frameSize) {
      setScroll(length - frameSize);
    } else {
      setScroll((prevState) => {
        return prevState + step;
      });
    }
  };

  const slidePreviousProduct = (length: number) => {
    if (scroll === 0) {
      setScroll(length - frameSize);
    } else if (scroll - step < 0) {
      setScroll(0);
    } else {
      setScroll((prevState) => {
        return prevState - step;
      });
    }
  };

  const productSliderList = {
    marginLeft: `-${scroll * itemWidth}px`,
    transition: `${animationDuration}ms`,
  };

  return (
    <>
      <div className="slider">
        <div>
          <p className="title">{title}</p>
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="button-slider"
            onClick={() => slidePreviousProduct(products.length)}
            disabled={scroll <= 0}
          >
            <i className="fa-solid fa-angle-left" />
          </button>
          <button
            type="button"
            className="button-slider"
            onClick={() => slideNextProduct(products.length)}
            disabled={scroll + frameSize >= products.length}
          >
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
      <div className="products-slider-container" data-cy="cardsContainer">
        <div
          className="products-slider-list"
          style={productSliderList}
        >
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};
