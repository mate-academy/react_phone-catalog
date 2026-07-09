import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '../ProductCard';
import styles from './Main.module.scss';
import { Product } from '../../types/types';
import productsData from '../../../public/api/products.json';

const products = productsData as Product[];

export const Main: React.FC = () => {
  const { t } = useTranslation();

  const brandNewProducts = [...products]
    .sort((a, b) => b.year - a.year)
    .slice(0, 12);

  const hotPricesProducts = [...products]
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 12);

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  const banners = [
    { src: '/images/banner1.jpg', link: '/tablets' },
    { src: '/images/banner2.png', link: '/phones' },
    { src: '/images/banner3.png', link: '/accessories' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (isHovered) {
      return;
    }

    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const useSlider = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({ left: false, right: true });

    const check = useCallback(() => {
      const el = ref.current;

      if (!el) {
        return;
      }

      setState({
        left: el.scrollLeft > 10,
        right: el.scrollLeft < el.scrollWidth - el.clientWidth - 10,
      });
    }, []);

    useEffect(() => {
      const el = ref.current;

      if (!el) {
        return;
      }

      check();
      el.addEventListener('scroll', check);
      window.addEventListener('resize', check);

      return () => {
        el.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      };
    }, [check]);

    const scroll = (dir: 'left' | 'right') => {
      const el = ref.current;

      if (!el) {
        return;
      }

      const children = Array.from(el.children) as HTMLElement[];

      if (!children.length) {
        return;
      }

      const step = children[0].offsetWidth + 16;
      const targetScroll =
        dir === 'right' ? el.scrollLeft + step : el.scrollLeft - step;

      el.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    return { ref, state, scroll };
  };

  const newSlider = useSlider();
  const hotSlider = useSlider();

  return (
    <div className={styles.main__container}>
      <h1 className={styles['is-hidden']}>Product Catalog</h1>

      <section className={styles.main__section}>
        <h2 className={styles.main__title}>{t('main.title')}</h2>
        <div
          className={styles.banner}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={styles['banner__main-row']}>
            <button
              type="button"
              className={`${styles.banner__arrow} ${styles['banner__arrow--left']}`}
              onClick={prevSlide}
            />

            <div className={styles.banner__content}>
              <div className={styles.banner__promo}>
                <p className={styles['banner__promo-title']}>
                  {t('main.promo_title')}
                </p>
                <p className={styles['banner__promo-text']}>
                  {t('main.promo_text')}
                </p>
                <Link to={banners[currentIndex].link}>
                  <button className={styles['banner__promo-btn']}>
                    {t('main.checkout')}
                  </button>
                </Link>
              </div>

              <div
                className={styles.banner__track}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {banners.map((banner, i) => (
                  <div key={i} className={styles.banner__slide}>
                    <img
                      src={banner.src}
                      alt={`Banner ${i}`}
                      className={styles.banner__image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={styles.banner__arrow}
              onClick={nextSlide}
            />
          </div>

          <div className={styles.banner__pagination}>
            {banners.map((_, i) => (
              <div
                key={i}
                className={`${styles.banner__dot} ${i === currentIndex ? styles['banner__dot--active'] : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.main__section}>
        <div className={styles['main__section-header']}>
          <h2>{t('main.brand_new')}</h2>
          <div className={styles['main__nav-buttons']}>
            <button
              type="button"
              aria-label="Previous"
              className={`${styles['main__nav-btn']} ${styles['main__nav-btn--left']}`}
              disabled={!newSlider.state.left}
              onClick={() => newSlider.scroll('left')}
            />
            <button
              type="button"
              aria-label="Next"
              className={styles['main__nav-btn']}
              disabled={!newSlider.state.right}
              onClick={() => newSlider.scroll('right')}
            />
          </div>
        </div>
        <div className={styles.main__slider}>
          <div className={styles.main__track} ref={newSlider.ref}>
            {brandNewProducts.map(p => (
              <ProductCard key={p.id} product={p} hasDiscount={false} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.main__section}>
        <h2>{t('main.categories_title')}</h2>
        <div className={styles.categories__container}>
          <Link to="/phones" className={styles.categories__item}>
            <div className={styles['categories__img-wrapper']}>
              <img src="/images/Phones.svg" alt="Phones" />
            </div>
            <p className={styles.categories__name}>
              {t('main.category_phones')}
            </p>
            <span className={styles.categories__count}>
              {t('main.models_count', { count: phonesCount })}
            </span>
          </Link>
          <Link to="/tablets" className={styles.categories__item}>
            <div className={styles['categories__img-wrapper']}>
              <img src="/images/Tablets.svg" alt="Tablets" />
            </div>
            <p className={styles.categories__name}>
              {t('main.category_tablets')}
            </p>
            <span className={styles.categories__count}>
              {t('main.models_count', { count: tabletsCount })}
            </span>
          </Link>
          <Link to="/accessories" className={styles.categories__item}>
            <div className={styles['categories__img-wrapper']}>
              <img src="/images/Accessories.svg" alt="Accessories" />
            </div>
            <p className={styles.categories__name}>
              {t('main.category_accessories')}
            </p>
            <span className={styles.categories__count}>
              {t('main.models_count', { count: accessoriesCount })}
            </span>
          </Link>
        </div>
      </section>

      <section className={styles.main__section}>
        <div className={styles['main__section-header']}>
          <h2>{t('main.hot_prices')}</h2>
          <div className={styles['main__nav-buttons']}>
            <button
              type="button"
              aria-label="Previous"
              className={`${styles['main__nav-btn']} ${styles['main__nav-btn--left']}`}
              disabled={!hotSlider.state.left}
              onClick={() => hotSlider.scroll('left')}
            />
            <button
              type="button"
              aria-label="Next"
              className={styles['main__nav-btn']}
              disabled={!hotSlider.state.right}
              onClick={() => hotSlider.scroll('right')}
            />
          </div>
        </div>
        <div className={styles.main__slider}>
          <div className={styles.main__track} ref={hotSlider.ref}>
            {hotPricesProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
