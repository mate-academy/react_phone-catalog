import classNames from 'classnames';
import React, { useContext } from 'react';
import { CatalogContext } from '../../CatalogContext';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

type Props = {
  products: Phone[] | Tablet[] | Accessory[];
  section: string;
  slides: number;
};

export const ProductSliderButtons: React.FC<Props> = ({
  products,
  section,
  slides,
}) => {
  const { activeIndex } = useContext(CatalogContext);

  return (
    <div className={`${section}__slider-buttons product-slider__buttons`}>
      <button
        className={classNames(
          `${section}__slider-btn product-slider__btn product-slider__btn--prev ${section}__slider-btn--prev arrow-btn `,
          {
            _disable: activeIndex === 0,
          },
        )}
        disabled={activeIndex === 0}
      ></button>
      <button
        className={classNames(
          `${section}__slider-btn product-slider__btn product-slider__btn--next ${section}__slider-btn--next arrow-btn `,
          {
            _disable:
              products !== undefined &&
              activeIndex === products.length - slides,
          },
        )}
        disabled={
          products !== undefined && activeIndex === products.length - slides
        }
      ></button>
    </div>
  );
};
