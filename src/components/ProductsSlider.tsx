import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../helpers/Types';
import { ProductCard } from './ProductCard';

export type ProductsSliderProps = {
  products: Product[]
  title: string
};

export const ProductsSlider = (
  {
    products, title,
  }: ProductsSliderProps,
) => {
  const [productSlider, setProductSlider] = useState<number>(0);

  const ProductSlider: React.CSSProperties = {
    transform: `translateX(${-productSlider * 288}px)`,
    transition: 'transform 300ms ease-in-out',
  };

  const prevProducts = () => {
    const min = 0;
    const tmp = productSlider - 1;

    if (tmp < min) {
      setProductSlider(0);
    } else {
      setProductSlider(tmp);
    }
  };

  const nextProducts = () => {
    const max = products.length - 4;
    const tmp = productSlider + 1;

    if (tmp > max) {
      setProductSlider(max);
    } else {
      setProductSlider(tmp);
    }
  };

  const disablePaginationRight = (): boolean => {
    const max = products.length - 4;

    if (productSlider < max) {
      return false;
    }

    return true;
  };

  const disablePaginationLeft = (): boolean => {
    const min = 0;

    if (productSlider !== min) {
      return false;
    }

    return true;
  };

  return (
    <div className="slider__header">
      <h1 className="slider__header--title h1">{title}</h1>

      <button
        type="button"
        className={classNames(
          'slider__header--arrow buttons buttons__arrow--left',
          { 'buttons__arrow--left-disabled': disablePaginationLeft() },
        )}
        onClick={prevProducts}
        aria-label="arrow--left"
        disabled={disablePaginationLeft()}
      />

      <button
        type="button"
        className={classNames(
          'slider__header--arrow buttons buttons__arrow--right',
          { 'buttons__arrow--right-disabled': disablePaginationRight() },
        )}
        onClick={nextProducts}
        aria-label="arrow--right"
        disabled={disablePaginationRight()}
      />

      <ul className="slider" data-cy="cardsContainer">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            ProductSlider={ProductSlider}
          />
        ))}
      </ul>

    </div>
  );
};
