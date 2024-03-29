import { FC, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../../types/Product';

import './ProductSlider.scss';
import { ProductItem } from '../ProductItem/ProductItem';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: FC<Props> = ({ title, products }) => {
  const visibleCount = 4;
  const [start, setStart] = useState(0);
  const end = start + visibleCount;
  const prevDisabled = start === 0;
  const nextDisabled = start === products.length - 4;

  const handleArrowLeft = () => setStart(prevState => prevState - 1);
  const handleArrowRight = () => setStart(prevState => prevState + 1);

  return (
    <div className="product-slider">
      <div className="product-slider__top-row">
        <h2 className="product-slider__title title">{title}</h2>
        <div className="product-slider__navigate">
          <button
            aria-label="navigate"
            className={classNames('button__small button__small--left', {
              'button__small--disabled': start <= 0,
            })}
            type="button"
            onClick={handleArrowLeft}
            disabled={prevDisabled}
          />
          <button
            aria-label="navigate"
            className={classNames('button__small', {
              'button__small--disabled': end > products.length - 1,
            })}
            type="button"
            onClick={handleArrowRight}
            disabled={nextDisabled}
          />
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
