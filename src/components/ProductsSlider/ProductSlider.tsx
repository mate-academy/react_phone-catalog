import { FC, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRigth from '../../assets/svg/arrowRight.svg';

import './productSlider.scss';
import { ProductItem } from '../ProductItem';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: FC<Props> = ({
  title,
  products,
}) => {
  const visibleCount = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCount;

  return (
    <div className="product-slider">
      <div className="product-slider__top-row">
        <h2 className="product-slider__title title">{title}</h2>
        <div className="product-slider__navigate">
          <button
            aria-label="navigate"
            className={classNames(
              'products-slider__button button-square',
              { 'button-square--disabled': start <= 0 },
            )}
            type="button"
            onClick={() => setStart((prev) => prev - 1)}
          >
            <img src={arrowLeft} alt={arrowLeft} />
          </button>
          <button
            aria-label="navigate"
            className={classNames(
              'products-slider__button button-square',
              { 'button-square--disabled': end > products.length - 1 },
            )}
            type="button"
            onClick={() => setStart((prev) => prev + 1)}
          >
            <img src={arrowRigth} alt={arrowRigth} />
          </button>
        </div>
      </div>
      <div className="product-slider__products grid">
        {products.slice(start, end).map((product: Product) => (
          <ProductItem key={product.itemId} product={product} />
        ))}
      </div>
    </div>
  );
};
