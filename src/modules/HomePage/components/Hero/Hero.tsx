/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.scss';

const SLIDES = 3;

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  const normalize = (n: number) => ((n % SLIDES) + SLIDES) % SLIDES;

  const go = (n: number) => {
    const el = ref.current;

    if (!el || !el.clientWidth) {
      return;
    }

    const idx = normalize(n);

    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    let t = window.setTimeout(function tick() {
      const idx = Math.round(el.scrollLeft / el.clientWidth);

      go(idx + 1);
      t = window.setTimeout(tick, 5000);
    }, 5000);

    const indexFromScroll = () => Math.round(el.scrollLeft / el.clientWidth || 0);

    const onScroll = () => setI(indexFromScroll());

    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <div className={styles.hero__container}>
      <div className={styles.hero__featured}>
        <button className={styles.hero__button__left} onClick={() => go(i - 1)}></button>
        <div className={styles.hero__banner} ref={ref}>
          <div className={styles.hero__banner__track}>
            <Link
              key={'banner_01'}
              to={{ pathname: '/phones' }}
              className={`${styles.banner__container} ${styles.banner__container__1}`}
            >
              <div className={styles.banner__offer__1}>
                <div className={styles.banner__offer__title__1}>
                  Now available in our store!
                  <span className={styles.banner__offer__emoji__1}>👌</span>
                </div>
                <div className={styles.banner__offer__description__1}>Be the first!</div>
                <button className={styles.banner__offer__button__1}>Order now</button>
              </div>
              <div className={styles.banner__graphyc__1}>
                <div className={styles.banner__graphyc__title__1}>iPhone 14 Pro</div>
                <div className={styles.banner__graphyc__description__1}>Pro. Beyond.</div>
                <div className={styles.banner__graphyc__image__1}></div>
              </div>
            </Link>
            <Link
              key={'banner_02'}
              to={{ pathname: '/phones' }}
              className={`${styles.banner__container} ${styles.banner__container__1}`}
            >
              <div className={styles.banner__offer__1}>
                <div className={styles.banner__offer__title__1}>
                  Now unavailable in our store!
                  <span className={styles.banner__offer__emoji__1}>👌</span>
                </div>
                <div className={styles.banner__offer__description__1}>Be the first!</div>
                <button className={styles.banner__offer__button__1}>Order now</button>
              </div>
              <div className={styles.banner__graphyc__1}>
                <div className={styles.banner__graphyc__title__1}>iPhone 14 Pro</div>
                <div className={styles.banner__graphyc__description__1}>Pro. Beyond.</div>
                <div className={styles.banner__graphyc__image__1}></div>
              </div>
            </Link>
            <Link
              key={'banner_03'}
              to={{ pathname: '/phones' }}
              className={`${styles.banner__container} ${styles.banner__container__1}`}
            >
              <div className={styles.banner__offer__1}>
                <div className={styles.banner__offer__title__1}>
                  Now available in our store!
                  <span className={styles.banner__offer__emoji__1}>👌</span>
                </div>
                <div className={styles.banner__offer__description__1}>Be the first!</div>
                <button className={styles.banner__offer__button__1}>Order now</button>
              </div>
              <div className={styles.banner__graphyc__1}>
                <div className={styles.banner__graphyc__title__1}>iPhone 14 Pro</div>
                <div className={styles.banner__graphyc__description__1}>Pro. Beyond.</div>
                <div className={styles.banner__graphyc__image__1}></div>
              </div>
            </Link>
          </div>
        </div>
        <button className={styles.hero__button__right} onClick={() => go(i + 1)}></button>
      </div>
      <div className={styles.hero__sliders}>
        {[0, 1, 2].map(b => (
          <button
            key={b}
            className={`${styles.slider__icon} ${i === b ? styles.slider__icon__active : ''}`}
            onClick={() => go(b)}
          ></button>
        ))}
      </div>
    </div>
  );
};
