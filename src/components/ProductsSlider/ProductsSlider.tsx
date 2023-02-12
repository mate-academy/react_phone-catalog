import React, { useState } from 'react';
import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';

type Props = {
  title: string,
  products: Product[] | null,
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [firstProduct, setFirstProduct] = useState(0);
  const [lastProduct, setLastProduct] = useState(4);
  const visibleProducts = products?.slice(firstProduct, lastProduct);

  const onShowNext = () => {
    if (products) {
      if (lastProduct < products.length - 1) {
        setFirstProduct(prev => prev + 1);
        setLastProduct(prev => prev + 1);

        return;
      }

      setFirstProduct(products.length - 5);
      setLastProduct(products.length - 1);
    }
  };

  const onShowPrev = () => {
    if (products) {
      if (firstProduct > 0) {
        setFirstProduct(prev => prev - 1);
        setLastProduct(prev => prev - 1);

        return;
      }

      setFirstProduct(0);
      setLastProduct(4);
    }
  };

  return (
    <section>
      <div className="products-slider__top">
        <h1 className="title__h1 title__h1--primary">
          {title}
        </h1>
        <div className="products-slider__buttons">
          <button
            type="button"
            className="button products-slider__button"
            onClick={() => onShowPrev()}
            disabled={firstProduct === 0}
          >
            <img src="./assets/arrow-prev.svg" alt="prev" />
          </button>
          <button
            type="button"
            className="button products-slider__button"
            onClick={() => onShowNext()}
            disabled={
              (products && lastProduct === products.length - 1) || false
            }
          >
            <img src="./assets/arrow-next.svg" alt="prev" />
          </button>
        </div>
      </div>
      <div className="products-slider__content">
        {!visibleProducts ? (
          <Loader />
        ) : (
          visibleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
    </section>
  );
};
