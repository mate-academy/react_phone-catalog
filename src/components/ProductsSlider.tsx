import { FC, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../types/Product';
import '../styles/productsSlider.scss';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider: FC<Props> = ({ products, title }) => {
  const [startValue, setStartValue] = useState(0);

  const leftButton = () => {
    let point = startValue - 1;

    if (point < 0) {
      point = 0;
    }

    setStartValue(point);
  };

  const rightButton = () => {
    let point = startValue + 1;

    if (point > products.length - 4) {
      point = products.length - 4;
      if (point < 0) {
        point = 0;
      }
    }

    setStartValue(point);
  };

  return (
    <div className="products-slider container">
      <div className="products-slider__header">
        <h2 className="products-slider__title">
          {title}
        </h2>
        <div className="products-slider__buttons">
          <button
            type="button"
            className={classNames('products-slider__button', {
              'products-slider__button--active': startValue > 0,
            })}
            onClick={leftButton}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            type="button"
            className={classNames('products-slider__button', {
              'products-slider__button--active':
                startValue < products.length - 4,
            })}
            onClick={rightButton}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
      <div className="products-slider__content">
        {products.slice(startValue, startValue + 4).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
