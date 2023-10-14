import classNames from 'classnames';
import { FC, memo, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';
import arrowLeft from '../../assets/svg/arrowLeft.svg';
import arrowRigth from '../../assets/svg/arrowRigth.svg';
import './products-slider.scss';

type Props = {
  title: string;
  products: Product[];
};

const visibleCount = 4;

export const ProductsSlider: FC<Props> = memo(({ title, products }) => {
  const [start, setStart] = useState(0);
  const end = start + visibleCount;

  return (
    <div className="products-slider">
      <div className="products-slider__top-row">
        <h2 className="products-slider__title title">{title}</h2>
        <div className="products-slider__navigate ">
          <button
            aria-label="navigate"
            type="button"
            className={classNames('products-slider__button button-square', {
              'button-square--disabled': start <= 0,
            })}
            onClick={() => setStart((prev) => prev - 1)}
          >
            <img src={arrowLeft} alt="arrowLeft" />
          </button>
          <button
            aria-label="navigate"
            type="button"
            className={classNames('products-slider__button button-square', {
              'button-square--disabled': end > products.length - 1,
            })}
            onClick={() => setStart((prev) => prev + 1)}
          >
            <img src={arrowRigth} alt="arrowRigth" />
          </button>
        </div>
      </div>
      <div className="products-slider__products grid">
        {products.slice(start, end).map((product: Product) => (
          <ProductItem product={product} key={product.itemId} />
        ))}
      </div>
    </div>
  );
});
