import React, { useEffect, useState } from 'react';
import {
  getBrandNewProducts, getHotPriceProducts, getProducts, getSuggestedProducts,
} from '../../api/products';
import { Product } from '../../types/Product';
import { ProductList } from '../SliderList';
import { SliderButtons } from '../SliderButtons';
import './ProductSlider.scss';

type Props = {
  title: string
};

export const ProductSlider: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [current, setCurrent] = useState(0);
  const firstProduct = current * 4;

  const listToRender = products.slice(firstProduct, firstProduct + 4);

  useEffect(() => {
    let fetch;

    switch (title) {
      case 'Hot prices':
        fetch = getHotPriceProducts;
        break;
      case 'Brand new models':
        fetch = getBrandNewProducts;
        break;
      case 'You may also like':
        fetch = getSuggestedProducts;
        break;
      default:
        fetch = getProducts;
        break;
    }

    fetch()
      .then(setProducts);
  }, [title]);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h1 className="product-slider__title">
          {title}
        </h1>

        <SliderButtons
          changePage={(page: number) => setCurrent(page)}
          current={current}
        />
      </div>

      {products.length && (
        <ProductList
          products={listToRender}
        />
      )}
    </div>
  );
};
