import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { CARD_GAP } from '../../constants';
import { ProductCard } from '../ProductCard';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { useTranslation } from 'react-i18next';

type Props = {
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation();
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const sliderItem = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (cardWidth !== sliderItem.current?.offsetWidth) {
      setCardWidth(sliderItem.current ? sliderItem.current.offsetWidth : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const isDisabledNext = orderIndex >= products.length - 1;
  const isDisabledPrev = orderIndex <= 0;

  return (
    <div className="product-slider">
      <div className="product-slider__buttons">
        <button
          type="button"
          className={classNames('btn btn--slider btn--square-sm', {
            'btn--disabled': isDisabledPrev,
          })}
          onClick={() => setOrderIndex(prev => prev - 1)}
          disabled={isDisabledPrev}
          aria-label={t(TRANSLATIONS.products.slider.button.prev.ariaLabel)}
        >
          <span className="icon icon--arrow-left"></span>
        </button>

        <button
          type="button"
          className={classNames('btn btn--slider btn--square-sm', {
            'btn--disabled': isDisabledNext,
          })}
          onClick={() => setOrderIndex(prev => prev + 1)}
          disabled={isDisabledNext}
          aria-label={t(TRANSLATIONS.products.slider.button.next.ariaLabel)}
        >
          <span className="icon icon--arrow-right"></span>
        </button>
      </div>

      <div className="product-slider__container">
        <ul
          ref={sliderItem}
          className="product-slider__list"
          style={{ translate: `${-(cardWidth + CARD_GAP) * orderIndex}px` }}
        >
          {products.map(product => {
            const { id } = product;

            return (
              <li className="product-slider__item" key={id}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
