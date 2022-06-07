/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Pagination } from '../Pagination';
import { ProductCard } from '../ProductCard';
import './ProductSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = React.memo(({
  title, products,
}) => {
  const [indexOfStart, setIndexOfStart] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(4);

  const viewportWidth = window.visualViewport.width;

  useEffect(() => {
    switch (true) {
      case viewportWidth > 990:
        setNumberOfItems(4);
        break;
      case viewportWidth <= 990 && viewportWidth > 768:
        setNumberOfItems(3);
        break;
      case viewportWidth <= 768 && viewportWidth > 475:
        setNumberOfItems(2);
        break;
      default:
        setNumberOfItems(1);
        break;
    }
  }, []);

  return (
    <div className="product-slider">
      <div className="container">
        <div className="block-header product-slider__block-header">
          <h2 className="title product-slider__title">
            {title}
          </h2>
          <Pagination
            length={products.length}
            indexOfStart={indexOfStart}
            setIndexOfStart={setIndexOfStart}
            numberOfItems={numberOfItems}
          />
        </div>

        <div className="product-slider__inner">
          <ul
            className="product-slider__list"
          >
            {products.slice(
              indexOfStart, indexOfStart + numberOfItems,
            ).map((product) => (
              <li
                key={product.id}
                className="product-slider__list-item"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
});
