import React, { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { products } = useProducts();

  const [visibleProducts, setVisibleProducts] = useState(products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);
  const [sliderOne, setSliderOne] = useState(0);
  const [sliderTwo, setSliderTwo] = useState(0);

  useEffect(() => {
    setVisibleProducts(products);
  }, [products]);

  const handleNext = () => setCurrentSlide(prev => (prev + 1) % 3);
  const handlePrev = () => setCurrentSlide(prev => (prev + 2) % 3);

  useEffect(() => {
    if (!isAnimated) {
      return;
    }

    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval);
  }, [isAnimated]);

  const categoryCounts = useMemo(() => {
    const phonesQ = visibleProducts.filter(p => p.category === 'phones').length;
    const tabletsQ = visibleProducts.filter(
      p => p.category === 'tablets',
    ).length;
    const accessoriesQ = visibleProducts.filter(
      p => p.category === 'accessories',
    ).length;

    return { phonesQ, tabletsQ, accessoriesQ };
  }, [visibleProducts]);

  const newestProducts = useMemo(() => {
    return [...visibleProducts].sort((a, b) => b.year - a.year);
  }, [visibleProducts]);

  const discountedProducts = useMemo(() => {
    return [...visibleProducts].sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  }, [visibleProducts]);

  return (
    <main className="main">
      <section className="welcome">
        <h1 className="welcome__title">Product Catalog</h1>
        <div className="welcome__wrapper">
          <button
            className="button welcome__button"
            onClick={() => {
              handlePrev();
              setIsAnimated(false);
              setTimeout(() => setIsAnimated(true), 2000);
            }}
          >
            <div className="icon icon--left"></div>
          </button>

          <div className="welcome__image-wrapper">
            <div
              className="welcome__image-slider"
              style={{ transform: `translateX(-${currentSlide}00%)` }}
            >
              <img
                src={`${import.meta.env.BASE_URL}img/banner.png`}
                alt="banner"
                className="welcome__banner"
              />
              <img
                src={`${import.meta.env.BASE_URL}img/banner.png`}
                alt="banner"
                className="welcome__banner"
              />
              <img
                src={`${import.meta.env.BASE_URL}img/banner.png`}
                alt="banner"
                className="welcome__banner"
              />
            </div>
          </div>

          <button
            className="button welcome__button"
            onClick={() => {
              handleNext();
              setIsAnimated(false);
              setTimeout(() => setIsAnimated(true), 2000);
            }}
          >
            <div className="icon icon--right"></div>
          </button>
        </div>

        <ul className="welcome__slider">
          {[0, 1, 2].map(idx => (
            <li
              key={idx}
              className="welcome__slider-item"
              onClick={() => {
                setCurrentSlide(idx);
                setIsAnimated(false);
                setTimeout(() => setIsAnimated(true), 2000);
              }}
            >
              <div
                className={classNames(
                  'welcome__slider-icon',
                  currentSlide === idx ? 'is-active' : '',
                )}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="slider">
        <h2 className="slider__title slider__pc">Brand new models</h2>
        <button
          className="slider__button button slider__pc"
          onClick={() => sliderOne > 0 && setSliderOne(s => s - 1)}
        >
          <div className="icon icon--left"></div>
        </button>
        <button
          className="slider__button button slider__pc"
          disabled={sliderOne >= newestProducts.length - 4}
          onClick={() => setSliderOne(s => s + 1)}
        >
          <div className="icon icon--right"></div>
        </button>

        <div className="slider__mobile">
          <h2 className="slider__title">Brand new models</h2>
          <button
            className="slider__button button"
            onClick={() => sliderTwo > 0 && setSliderTwo(s => s - 1)}
          >
            <div className="icon icon--left"></div>
          </button>
          <button
            className="slider__button button"
            disabled={sliderTwo >= discountedProducts.length - 4}
            onClick={() => setSliderTwo(s => s + 1)}
          >
            <div className="icon icon--right"></div>
          </button>
        </div>

        <div className="slider__wrapper-wrap">
          <div
            className="slider__wrapper"
            style={{
              transform: `translateX(calc(-${sliderOne} * var(--card-width) - ${sliderOne} * var(--gap)))`,
            }}
          >
            {newestProducts.map(p => (
              <ProductCard key={p.id} product={p} discounted={false} />
            ))}
          </div>
        </div>
      </section>

      <section className="categories">
        <h2 className="categories__title">Shop by category</h2>

        <Link
          to="/phones"
          className="categories__card"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="categories__card-img-wrapper categories--gray">
            <img
              src={`${import.meta.env.BASE_URL}img/category-phones.webp`}
              alt="phones"
              className="categories__card-img"
            />
          </div>
          <h4 className="categories__card-title">Mobile phones</h4>
          <div className="categories__card-quantity body-text">
            {categoryCounts.phonesQ} models
          </div>
        </Link>

        <Link
          to="/tablets"
          className="categories__card"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="categories__card-img-wrapper categories--light">
            <img
              src={`${import.meta.env.BASE_URL}img/category-tablets.webp`}
              alt="tablets"
              className="categories__card-img"
            />
          </div>
          <h4 className="categories__card-title">Tablets</h4>
          <div className="categories__card-quantity body-text">
            {categoryCounts.tabletsQ} models
          </div>
        </Link>

        <Link
          to="/accessories"
          className="categories__card"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="categories__card-img-wrapper categories--pink">
            <img
              src={`${import.meta.env.BASE_URL}img/category-accessories.webp`}
              alt="accessories"
              className="categories__card-img"
            />
          </div>
          <h4 className="categories__card-title">Accessories</h4>
          <div className="categories__card-quantity body-text">
            {categoryCounts.accessoriesQ} models
          </div>
        </Link>
      </section>

      <section className="slider">
        <h2 className="slider__title slider__pc">Discounted products</h2>
        <button
          className="slider__button button slider__pc"
          onClick={() => sliderTwo > 0 && setSliderTwo(s => s - 1)}
        >
          <div className="icon icon--left"></div>
        </button>
        <button
          className="slider__button button slider__pc"
          disabled={sliderTwo >= discountedProducts.length - 4}
          onClick={() => setSliderTwo(s => s + 1)}
        >
          <div className="icon icon--right"></div>
        </button>

        <div className="slider__mobile">
          <h2 className="slider__title">Discounted products</h2>
          <button
            className="slider__button button"
            onClick={() => sliderTwo > 0 && setSliderTwo(s => s - 1)}
          >
            <div className="icon icon--left"></div>
          </button>
          <button
            className="slider__button button"
            disabled={sliderTwo >= discountedProducts.length - 4}
            onClick={() => setSliderTwo(s => s + 1)}
          >
            <div className="icon icon--right"></div>
          </button>
        </div>

        <div className="slider__wrapper-wrap">
          <div
            className="slider__wrapper"
            style={{
              transform: `translateX(calc(-${sliderTwo} * var(--card-width) - ${sliderTwo} * var(--gap)))`,
            }}
          >
            {discountedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                discounted={true}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
