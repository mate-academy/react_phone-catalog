import React, { useContext, useMemo, useState } from 'react';
import { ProductGeneral } from '../../types/ProductGeneral';
import { ProductCard } from '../ProductCard';
import { useWidth } from '../../hooks/useWidth';
import { MobileSwiper } from '../MobileSwiper/MobileSwiper';
import { getItemsPerScroll } from '../../utils/utils';
import styles from './ProductSlider.module.scss';
import classNames from 'classnames';
import { ProductContext } from '../../store/ProductContext';
import { getButtonClass } from '../../utils/getButtonClass';

type Props = {
  products: ProductGeneral[];
  sectionTitle: string;
  displayFullPrize: boolean;
};

export const ProductSlider: React.FC<Props> = ({
  products,
  sectionTitle,
  displayFullPrize,
}) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const { darkTheme } = useContext(ProductContext);
  const width = useWidth();
  const buttonClass = `${getButtonClass.secondary(darkTheme)} button--small`;
  const maxLastIndex = useMemo(
    () => products.length - getItemsPerScroll(width),
    [width, products],
  );

  const step = useMemo(
    () => (getItemsPerScroll(width) === 1 ? 1 : getItemsPerScroll(width) - 1),
    [width],
  );

  const onTablets = width > 640 && width < 1200;

  const getTransformValue = `translateX(calc((-100% * ${displayIndex} - 16px * ${displayIndex} - ${onTablets && displayIndex !== 0 ? '8px' : '0px'}))`;

  const handleIncrease = (step1 = step) => {
    setDisplayIndex(prevIndex =>
      prevIndex + step1 >= maxLastIndex ? maxLastIndex : prevIndex + step1,
    );
  };

  //#region handlers and on swipe
  const handleDecrease = (step1 = step) => {
    setDisplayIndex(prevIndex =>
      prevIndex - step1 < 0 ? 0 : prevIndex - step1,
    );
  };

  const onSwipe = (diff: number) => {
    if (diff > 50) {
      handleDecrease(diff / 150);
    }

    if (diff < -50) {
      handleIncrease(3);
    }
  };

  //#endregion

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className="text--section-title">{sectionTitle}</h2>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${buttonClass}`}
            onClick={() => handleDecrease()}
            disabled={displayIndex <= 0}
          >
            <div
              className={classNames('icon icon--arrow', {
                'icon--notActive': displayIndex <= 0,
              })}
            ></div>
          </button>
          <button
            className={buttonClass}
            onClick={() => handleIncrease()}
            disabled={displayIndex >= maxLastIndex}
          >
            <div
              className={classNames('icon icon--arrow', {
                'icon--notActive': displayIndex >= maxLastIndex,
              })}
            ></div>
          </button>
        </div>
      </div>
      <MobileSwiper onSwipe={onSwipe}>
        <div className={styles.container}>
          {products.map(item => {
            return (
              <div
                key={item.id}
                style={
                  {
                    transition: 'transform 3s',
                    transform: `${getTransformValue}`,
                  } as React.CSSProperties
                }
              >
                <div className={styles.item}>
                  <ProductCard
                    product={item}
                    displayFullPrice={displayFullPrize}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </MobileSwiper>
    </section>
  );
};
