/* eslint-disable @typescript-eslint/no-redeclare */
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './NewModels.module.scss';
import products from '../../../../../public/api/products.json';
import { ThemeContext } from '../../../../utils/themeContext';
import { Theme } from '../../../../../public/api/types/theme';
import { ProductCart } from '../../../../components/ProductCart';

export const NewModels = () => {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);
  const models2022 = products.filter(product => product.year === 2022);
  const lastIndex = models2022.length - 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
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

  const maxIndex = Math.max(0, models2022.length - perView);
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
        <p className={styles.models__title}>Brand new models</p>
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
            {models2022.map(item => (
              <ProductCart key={item.id} product={item} priceMode="full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
