import { FC, useState, useMemo } from 'react';
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
  const widthItem = 272 + 16;
  const [offset, setOffset] = useState(0);
  const isLeftDisabled = offset === 0;
  const isRightDisabled = useMemo(() => {
    return offset === -(widthItem * (products.length - visibleCount));
  }, [offset, widthItem, products, visibleCount]);

  const onClickRight = () => {
    setOffset(currOffset => currOffset - widthItem);
  };

  const onClickLeft = () => {
    setOffset(currOffset => currOffset + widthItem);
  };

  return (
    <div className="product-slider">
      <div className="product-slider__top-row">
        <h2 className="product-slider__title title">{title}</h2>
        <div className="product-slider__navigate">
          <button
            aria-label="navigate"
            className={classNames(
              'products-slider__button button-square',
              { 'button-square--disabled': isLeftDisabled },
            )}
            type="button"
            onClick={onClickLeft}
          >
            <img src={arrowLeft} alt={arrowLeft} />
          </button>
          <button
            aria-label="navigate"
            className={classNames(
              'products-slider__button button-square',
              { 'button-square--disabled': isRightDisabled },
            )}
            type="button"
            onClick={onClickRight}
          >
            <img src={arrowRigth} alt={arrowRigth} />
          </button>
        </div>
      </div>
      <div
        className="product-slider__products grid"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {products.map((product: Product) => (
          <ProductItem key={product.itemId} product={product} />
        ))}
      </div>
    </div>
  );
};
