import { useState } from 'react';
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

  return (
    <div className="slider__header">
      <h1 className="slider__header--title h1">{title}</h1>

      <button
        type="button"
        className="slider__header--arrow buttons"
        onClick={prevProducts}
      >
        <img
          alt="arrowLeft"
          src="./img/arrowLeft.svg"
          className="slider__arrow--image"
        />
      </button>
      <button
        type="button"
        className="slider__header--arrow buttons"
        onClick={nextProducts}
      >
        <img
          alt="arrowLeft"
          src="./img/arrowRight.svg"
          className="slider__arrow--image "
        />
      </button>
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
