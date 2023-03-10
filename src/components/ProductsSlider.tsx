import classNames from 'classnames';
import { FC, useState } from 'react';
import { Product } from '../types/Product';
import { ProductItem } from './ProductItem';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: FC<Props> = ({ title, products }) => {
  const visibleCount = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCount;

  return (
    <div className="products-slider">
      <div className="products-slider__top-row">
        <h2 className="products-slider__title title">{title}</h2>
        <div className="products-slider__nagigate ">
          <button
            aria-label="nagigate"
            type="button"
            className={classNames(
              'products-slider__button button-square button-square--prev',
              {
                'button-square--disabled': start <= 0,
              },
            )}
            onClick={() => setStart((prev) => prev - 1)}
          />
          <button
            aria-label="nagigate"
            type="button"
            className={classNames(
              'products-slider__button button-square button-square--next',
              {
                'button-square--disabled': end > products.length - 1,
              },
            )}
            onClick={() => setStart((prev) => prev + 1)}
          />
        </div>
      </div>
      <div className="products-slider__products grid">
        {products.slice(start, end).map((product: Product) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
};
