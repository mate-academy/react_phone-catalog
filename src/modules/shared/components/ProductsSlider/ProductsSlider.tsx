import React, { useEffect, useRef, useState } from 'react';

import styles from './ProductsSlider.module.scss';
import { Products } from '../../../../types/Products';
import { ProductCard } from '../productCard';
import { AppButton } from '../appButton';
import { ArrowLeftSvg } from '../../svg/ArrowLeftSvg';
import { ArrowRightSvg } from '../../svg/ArrowRightSvg';

type Props = {
  products: Products[];
  title?: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, title = '' }) => {
  const [maxVisibleProduct, setMaxVisibleProduct] = useState(0);
  const [startProduct, setStartProduct] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const countProduct = 4;

  const visibleProducts = products.slice(
    startProduct,
    startProduct + countProduct,
  );

  const slider = useRef<HTMLDivElement | null>(null);
  const card = useRef<HTMLDivElement | null>(null);

  const hanndlerBodySize = (e: UIEvent) => {
    setWindowWidth((e.currentTarget as Window).innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', hanndlerBodySize);

    const result = Math.floor(
      (slider.current?.clientWidth || 0) / (card.current?.offsetWidth || 0),
    );

    setMaxVisibleProduct(result);

    return () => {
      window.removeEventListener('resize', hanndlerBodySize);
    };
  }, [windowWidth]);

  function showNextProduct() {
    const newStartProduct = Math.min(
      startProduct + (maxVisibleProduct - 1 || 1),
      products.length - maxVisibleProduct,
    );

    setStartProduct(newStartProduct);

    if (!slider.current || !card.current) {
      return;
    }
  }

  function showPrevProduct() {
    const newStartProduct = Math.max(
      startProduct - (maxVisibleProduct - 1 || 1),
      0,
    );

    setStartProduct(newStartProduct);

    if (!slider.current) {
      return;
    }
  }

  //#region TouchScreen
  const [touchStartPositionX, setTouchStartPositionX] = useState(0);
  const [touchStartPositionY, setTouchStartPositionY] = useState(0);

  const touchStart = (e: TouchEvent) => {
    setTouchStartPositionX(e.touches[0].pageX);
    setTouchStartPositionY(e.touches[0].pageY);
  };

  const touchMove = (e: TouchEvent) => {
    const positionX = e.touches[0].pageX;
    const positionY = e.touches[0].pageY;
    const diffX = positionX - touchStartPositionX;
    const diffY = positionY - touchStartPositionY;

    if (e.cancelable && Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
    }
  };

  const touchEnd = (e: TouchEvent) => {
    const endPositionX = e.changedTouches[0].pageX;
    const diffX = endPositionX - touchStartPositionX;

    if (Math.abs(diffX) >= document.body.clientWidth / 5 && diffX < 0) {
      showNextProduct();
    } else if (Math.abs(diffX) >= document.body.clientWidth / 5 && diffX > 0) {
      showPrevProduct();
    }
  };

  useEffect(() => {
    const sliderEl = slider.current;

    if (!sliderEl) {
      return;
    }

    sliderEl.addEventListener('touchstart', touchStart, {
      passive: true,
    });
    sliderEl.addEventListener('touchmove', touchMove, {
      passive: false,
    });
    sliderEl.addEventListener('touchend', touchEnd, {
      passive: true,
    });

    return () => {
      sliderEl.removeEventListener('touchstart', touchStart);
      sliderEl.removeEventListener('touchmove', touchMove);
      sliderEl.removeEventListener('touchend', touchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchStartPositionX]);
  //#endregion

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.topElements}>
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.buttons}>
          <AppButton buttonName={'prev product'} onClick={showPrevProduct}>
            <ArrowLeftSvg style={{ color: 'var(--active-arrow-svg)' }} />
          </AppButton>
          <AppButton buttonName={'next product'} onClick={showNextProduct}>
            <ArrowRightSvg style={{ color: 'var(--active-arrow-svg)' }} />
          </AppButton>
        </div>
      </div>

      <div ref={slider} className={styles.slider}>
        {visibleProducts.map(product => (
          <div ref={card} key={product.id} className={styles.sliderElement}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
