import React, { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.scss';
import bannerMobileFirst from './components/img/banner-mobile-first.png';
import categoryPhones from './components/img/category-phones.png';
import categoryTablets from './components/img/category-tablets.png';
import categoryAccessories from './components/img/category-accsesories.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../api';
// eslint-disable-next-line max-len
import arrowRight__slider from '../ProductDeatils/components/img/arrow-right-slider.png';
// eslint-disable-next-line max-len
import arrowLeft from '../ProductDeatils/components/img/arrow-left.png';
import bannerTablet from './components/img/banner-tablets.png';
import bannerDekstop from './components/img/banner-desktop.png';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/getAssetUrl';

export const HomePage = () => {
  const slides = [
    {
      image: bannerMobileFirst,
      link: '/product/apple-iphone-14-pro-128gb-spaceblack',
      imageTablet: bannerTablet,
      imageDesktop: bannerDekstop,
    },
    {
      image: getAssetUrl('img/banner-accessories.png'),
      imageTablet: getAssetUrl('img/banner-accessories.png'),
      link: '/accessories',
      imageDesktop: getAssetUrl('img/banner-accessories.png'),
    },
    {
      image: getAssetUrl('img/banner-tablets.png'),
      imageTablet: getAssetUrl('img/banner-tablets.png'),
      link: '/tablets',
      imageDesktop: getAssetUrl('img/banner-tablets.png'),
    },
  ];

  const categories = [
    {
      name: 'Mobile phones',
      category: 'phones',
      image: categoryPhones,
      bgClass: 'category__imageWrapPhones',
    },
    {
      name: 'Tablets',
      category: 'tablets',
      image: categoryTablets,
      bgClass: 'category__imageWrapTablets',
    },
    {
      name: 'Accessories',
      category: 'accessories',
      image: categoryAccessories,
      bgClass: 'category__imageWrapAccessories',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [canScrollLeftNew, setCanScrollLeftNew] = useState(false);
  const [canScrollRightNew, setCanScrollRightNew] = useState(false);

  const [canScrollLeftHot, setCanScrollLeftHot] = useState(false);
  const [canScrollRightHot, setCanScrollRightHot] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const newModelsRef = useRef<HTMLDivElement>(null);
  const hotPricesRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = (ref: React.RefObject<HTMLDivElement>) => {
    const slider = ref.current;

    if (!slider) {
      return;
    }

    const canScrollLeft = slider.scrollLeft > 0;
    const canScrollRight =
      slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1;

    if (ref === newModelsRef) {
      setCanScrollLeftNew(canScrollLeft);
      setCanScrollRightNew(canScrollRight);
    }

    if (ref === hotPricesRef) {
      setCanScrollLeftHot(canScrollLeft);
      setCanScrollRightHot(canScrollRight);
    }
  };

  const scrollSlider = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
  ) => {
    const slider = ref.current;

    if (!slider) {
      return;
    }

    const track = slider.querySelector<HTMLElement>(`.${styles.track}`);
    const card = track?.firstElementChild as HTMLElement | null;
    const gap = track ? parseInt(getComputedStyle(track).gap, 10) : 16;
    const scrollAmount = (card?.offsetWidth || 212) + gap;

    slider.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => updateScrollButtons(ref), 300);
  };

  useEffect(() => {
    updateScrollButtons(newModelsRef);
    updateScrollButtons(hotPricesRef);
  }, [brandNewProducts, hotPriceProducts]);

  useEffect(() => {
    getAllProducts().then(product => {
      setProducts(product);

      const brandNew = [...product]
        .sort((a, b) => b.year - a.year)
        .slice(0, 10);

      const hotPrices = [...product]
        .sort((a, b) => {
          const discountA = a.fullPrice - a.price;
          const discountB = b.fullPrice - b.price;

          return discountB - discountA;
        })
        .slice(0, 10);

      setBrandNewProducts(brandNew);
      setHotPriceProducts(hotPrices);
    });
  }, []);

  const goPrevSlide = () => {
    setActiveSlide(current =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const goNextSlide = () => {
    setActiveSlide(current =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(current =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles.page}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <section className={styles.slider__banner}>
        <button onClick={goPrevSlide} className={styles.banner__button}>
          <img
            src={arrowLeft}
            alt="arrowLeft"
            className={styles.banner__button_img}
          />
        </button>

        <div className={styles.banner__viewport}>
          <div
            className={styles.slider__banner__track}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map(slide => (
              <div className={styles.slide__banner} key={slide.image}>
                <Link to={slide.link || '/'} key={slide.image}>
                  <picture>
                    {slide.imageDesktop && (
                      <source
                        media="(min-width: 1200px)"
                        srcSet={slide.imageDesktop}
                      />
                    )}

                    {slide.imageTablet && (
                      <source
                        media="(min-width: 640px)"
                        srcSet={slide.imageTablet}
                      />
                    )}

                    <img
                      src={slide.image}
                      className={styles.slide__banner__img}
                      alt="slideImage"
                    />
                  </picture>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button onClick={goNextSlide} className={styles.banner__button}>
          <img
            src={arrowRight__slider}
            alt="arrowLeft"
            className={styles.banner__button_img}
          />
        </button>
      </section>

      <div className={styles.banner__dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === activeSlide ? styles.dotActive : styles.dot}
            onClick={() => setActiveSlide(index)}
          ></button>
        ))}
      </div>

      <div className={styles.content}>
        <section className={styles.slider}>
          <div className={styles.slider__top}>
            <h2 className={styles.slider__title}>Brand new models</h2>
            <div className={styles.slider__buttons}>
              <button
                type="button"
                className={styles.slider__arrow}
                onClick={() => scrollSlider(newModelsRef, 'left')}
                disabled={!canScrollLeftNew}
              >
                <img
                  className={styles.slider__arrow__img}
                  src={arrowLeft}
                  alt="arrowleft"
                />
              </button>
              <button
                type="button"
                className={styles.slider__arrow}
                onClick={() => scrollSlider(newModelsRef, 'right')}
                disabled={!canScrollRightNew}
              >
                <img
                  className={styles.slider__arrow__img}
                  src={arrowRight__slider}
                  alt="arrowRight"
                />
              </button>
            </div>
          </div>

          <div
            className={styles.viewport}
            ref={newModelsRef}
            onScroll={() => updateScrollButtons(newModelsRef)}
          >
            <div className={styles.track}>
              {brandNewProducts.map(recommendedProduct => (
                <ProductCard
                  key={recommendedProduct.id}
                  product={recommendedProduct}
                  variant="slider"
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.category}>
          <h1 className={styles.category__title}>Shop by category</h1>

          <div className={styles.category__list}>
            {categories.map(category => {
              const count = products.filter(
                product => product.category === category.category,
              ).length;

              return (
                <Link
                  to={`/${category.category}`}
                  className={styles.category__card}
                  key={category.category}
                >
                  <div
                    className={`${styles.category__imageWrap} ${styles[category.bgClass]}`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className={styles.category__image}
                    />
                  </div>

                  <h3 className={styles.category__name}>{category.name}</h3>
                  <p className={styles.category__count}>{count} models</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={styles.slider__prices}>
          <div className={styles.slider__top}>
            <h2 className={styles.slider__title}>Hot prices</h2>
            <div className={styles.slider__buttons}>
              <button
                type="button"
                className={styles.slider__arrow}
                onClick={() => scrollSlider(hotPricesRef, 'left')}
                disabled={!canScrollLeftHot}
              >
                <img
                  className={styles.slider__arrow__img}
                  src={arrowLeft}
                  alt="arrowleft"
                />
              </button>
              <button
                type="button"
                className={styles.slider__arrow}
                onClick={() => scrollSlider(hotPricesRef, 'right')}
                disabled={!canScrollRightHot}
              >
                <img
                  className={styles.slider__arrow__img}
                  src={arrowRight__slider}
                  alt="arrowRight"
                />
              </button>
            </div>
          </div>

          <div
            className={styles.viewport}
            ref={hotPricesRef}
            onScroll={() => updateScrollButtons(hotPricesRef)}
          >
            <div className={styles.track}>
              {hotPriceProducts.map(recommendedProduct => (
                <ProductCard
                  key={recommendedProduct.id}
                  product={recommendedProduct}
                  variant="slider"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
