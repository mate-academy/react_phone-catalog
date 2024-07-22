import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { CARD_GAP } from '../../constants';
import { ProductCard } from '../ProductCard';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { useTranslation } from 'react-i18next';
import styles from './ProductSlider.module.scss';
import btnStyles from '../../styles/buttons.module.scss';
import iconStyles from '../../styles/icons.module.scss';

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
    <div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={classNames(
            `${btnStyles.block} ${btnStyles.slider} ${btnStyles.squareSm}`,
            {
              [btnStyles.disabled]: isDisabledPrev,
            },
          )}
          onClick={() => setOrderIndex(prev => prev - 1)}
          disabled={isDisabledPrev}
          aria-label={t(TRANSLATIONS.products.slider.button.prev.ariaLabel)}
        >
          <span
            className={`${iconStyles.block} ${iconStyles.arrowLeft}`}
          ></span>
        </button>

        <button
          type="button"
          className={classNames(
            `${btnStyles.block} ${btnStyles.slider} ${btnStyles.squareSm}`,
            {
              [btnStyles.disabled]: isDisabledNext,
            },
          )}
          onClick={() => setOrderIndex(prev => prev + 1)}
          disabled={isDisabledNext}
          aria-label={t(TRANSLATIONS.products.slider.button.next.ariaLabel)}
        >
          <span
            className={`${iconStyles.block} ${iconStyles.arrowRight}`}
          ></span>
        </button>
      </div>

      <div className={styles.content}>
        <ul
          ref={sliderItem}
          className={styles.list}
          style={{ translate: `${-(cardWidth + CARD_GAP) * orderIndex}px` }}
        >
          {products.map(product => {
            const { id } = product;

            return (
              <li className={styles.item} key={id}>
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
