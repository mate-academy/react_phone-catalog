/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './HotPrice.module.scss';
import products from '../../../../../public/api/products.json';
import { ThemeContext } from '../../../../utils/themeContext';
import { Theme } from '../../../../../public/api/types/theme';
import { ProductCart } from '../../../../components/ProductCart';

export const HotPrices = () => {
  const [offset, setOffset] = useState(0);
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);

  const hotModels = useMemo(() => {
    return products.filter(
      p => (p.fullPrice > 0 ? (p.fullPrice - p.price) / p.fullPrice : 0) >= 0.1,
    );
  }, []);

  const lastIndex = Math.max(hotModels.length - 1, 0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext);

  const computePerView = () => {
    const w = window.innerWidth;

    if (w >= 1200) {
      return 3;
    }

    if (w >= 640) {
      return 2;
    }

    return 1;
  };

  useEffect(() => {
    const onResize = () => setPerView(computePerView());

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, hotModels.length - perView);
  const step = perView;

  const prev = () => setCurrent(c => Math.max(0, c - step));
  const next = () => setCurrent(c => Math.min(maxIndex, c + step));

  useEffect(() => {
    setCurrent(c => Math.min(c, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const recalc = () => {
      if (!trackRef.current || !viewportRef.current) {
        return;
      }

      const cards = Array.from(
        trackRef.current.querySelectorAll('article'),
      ) as HTMLElement[];
      const card = cards[current];

      if (card) {
        setOffset(card.offsetLeft);
      }
    };

    recalc();
    window.addEventListener('resize', recalc);

    return () => window.removeEventListener('resize', recalc);
  }, [current, perView]);

  return (
    <div
      className={[
        styles.models,
        theme === Theme.LIGHT ? styles['models--light'] : '',
      ].join(' ')}
    >
      <div className={styles.models__content}></div>
      <div className={styles.models__header}>
        <p className={styles.models__title}>Hot prices</p>
        <div className={styles.models__buttons}>
          <button
            className={`${styles.models__button} ${styles['models__button--left']}`}
            onClick={prev}
            disabled={current === 0}
          >
            ❮
          </button>
          <button
            className={`${styles.models__button} ${styles['models__button--right']}`}
            onClick={next}
            disabled={current === lastIndex}
          >
            ❯
          </button>
        </div>
      </div>

      <div ref={viewportRef} className={styles.models__viewport}>
        <div
          ref={trackRef}
          className={styles.models__track}
          style={{ transform: `translateX(-${offset}px)` }}
        >
          <div className={styles.models__products}>
            {hotModels.map(item => (
              <ProductCart key={item.itemId} product={item} priceMode="both" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
