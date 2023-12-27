import React, { useState } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import { itemsOnScreen } from '../../helpers/mediaHelper';
import { MediaWidth } from '../../types/Media';
import './ProductsSlider.scss';
import { Slider } from '../Slider';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
}) => {
  const [crntItemIndx, setCrntItemIndx] = useState(0);
  const visibleProducts = products;
  const isFirst = !(crntItemIndx);
  const isLast = !(crntItemIndx < visibleProducts.length - itemsOnScreen());

  const handleNextClick = () => {
    setCrntItemIndx(Math.min(
      crntItemIndx + 1,
      visibleProducts.length - itemsOnScreen(),
    ));
  };

  const handlePrevClick = () => {
    setCrntItemIndx(Math.max(crntItemIndx - 1, 0));
  };

  return (
    <div
      data-cy="cardsContainer"
      className="ProductsSlider ProductsSlider__container"
    >
      <div className="ProductsSlider__top">
        <h2 className="ProductsSlider__title">{title}</h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className={cn('ProductsSlider__button', {
              'ProductsSlider__button--defualt': !isFirst,
              'ProductsSlider__button--disabled': isFirst,
            })}
            disabled={isFirst}
            onClick={handlePrevClick}
            aria-label="Previous"
          >
            <i className="ProductsSlider__icon icon--arrow-left" />
          </button>
          <button
            type="button"
            className={cn('ProductsSlider__button', {
              'ProductsSlider__button--defualt': !isLast,
              'ProductsSlider__button--disabled': isLast,
            })}
            disabled={isLast}
            onClick={handleNextClick}
            aria-label="Next"
          >
            <i className="ProductsSlider__icon icon--arrow-right" />
          </button>
        </div>
      </div>

      <Slider
        products={visibleProducts}
        itemWidth={MediaWidth.mobileWidth + MediaWidth.productCardGap - 0.5}
        crntItemIndx={crntItemIndx}
        gap={MediaWidth.productCardGap - 0.5}
      />
    </div>
  );
};
