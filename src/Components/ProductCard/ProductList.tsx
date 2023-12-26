import { useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import './Product.scss';
import { Loader } from '../Loader/Loader';

type Props = {
  products: Product[];
  title: string;
  loaded: boolean;
};

export const ProductList: React.FC<Props> = ({ products, title, loaded }) => {
  const itemWidth = 272;
  const gap = 16;

  const [position, setPosition] = useState(0);

  const nextButton = () => {
    setPosition(() => {
      return position - (itemWidth + gap);
    });
  };

  const prevButton = () => {
    setPosition(() => {
      return position + (itemWidth + gap);
    });
  };

  const maxPosition = (products?.length - 4) * (itemWidth + gap);

  const canScrollNext = position > maxPosition * -1;
  const canScrollPrev = position < 0;

  return (
    <div className="product__foremost-container">
      <div>
        <div className="product-second-container">
          <h1 className="product__title">{title}</h1>
          <div className="product__button-arrow-container">
            <button
              type="button"
              aria-label="prevButton"
              className="product__button"
              onClick={prevButton}
              disabled={!canScrollPrev}
            >
              <div className="product__button-arrow product__button-arrow-1" />
            </button>
            <button
              type="button"
              aria-label="nextButton"
              className="product__button"
              onClick={nextButton}
              disabled={!canScrollNext}
            >
              <div className="product__button-arrow product__button-arrow-2" />
            </button>
          </div>
        </div>

        <div className="product-container">
          <div className="product__list">
            {loaded ? <Loader />
              : products.map(product => {
                return (
                  <li
                    key={product?.id}
                    style={{
                      listStyle: 'none',
                      transform: `translateX(${position}px)`,
                      transition: '0.5s',
                    }}
                  >
                    <ProductCard
                      key={product?.id}
                      product={product}
                    />
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
