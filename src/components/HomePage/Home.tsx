/* eslint-disable max-len */

import { ProductList } from '../Product/ProductList/ProductList';
import { Banner } from './Banner/Banner';
import './Home.scss';
import productFromServer from '../../../public/api/products.json';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const filterBrandNew = () => {
  const products = productFromServer;

  return products
    .sort((product1, product2) => product1.year - product2.year)
    .filter(product => product.year === 2022);
};

const categories = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Home = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const hotPricesRef = useRef<HTMLDivElement>(null);
  const [isHotAtStart, setIsHotAtStart] = useState(true);
  const [isHotAtEnd, setIsHotAtEnd] = useState(false);

  const getCardWidth = () => {
    const slider = sliderRef.current;

    if (!slider) {
      return 0;
    }

    const cards = slider.querySelectorAll('.product-card');

    if (cards.length < 2) {
      return cards[0]?.getBoundingClientRect().width || 0;
    }

    const firstCard = cards[0].getBoundingClientRect();
    const secondCard = cards[1].getBoundingClientRect();

    return secondCard.left - firstCard.left;
  };

  const getHotCardWidth = () => {
    const slider = hotPricesRef.current;

    if (!slider) {
      return 0;
    }

    const cards = slider.querySelectorAll('.product-card');

    if (cards.length < 2) {
      return cards[0]?.getBoundingClientRect().width || 0;
    }

    const firstCard = cards[0].getBoundingClientRect();
    const secondCard = cards[1].getBoundingClientRect();

    return secondCard.left - firstCard.left;
  };

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    setIsAtStart(scrollLeft <= 1);

    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const handleNext = () => {
    sliderRef.current?.scrollBy({
      left: getCardWidth(),
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    sliderRef.current?.scrollBy({
      left: -getCardWidth(),
      behavior: 'smooth',
    });
  };

  const handleHotScroll = () => {
    if (!hotPricesRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = hotPricesRef.current;

    setIsHotAtStart(scrollLeft <= 1);
    setIsHotAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const handleHotNext = () => {
    hotPricesRef.current?.scrollBy({
      left: getHotCardWidth(),
      behavior: 'smooth',
    });
  };

  const handleHotPrev = () => {
    hotPricesRef.current?.scrollBy({
      left: -getHotCardWidth(),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();
    handleHotScroll();
  }, []);

  return (
    <main className="home-main">
      <h1 className="home-main__title title">Welcome to Nice Gadgets store!</h1>

      <Banner />

      <section className="brand-new">
        <div className="brand-new__top">
          <h2 className="brand-new__title section-title">Brand new models</h2>

          <div className="brand-new__buttons">
            <button
              className={`button__prev ${isAtStart ? 'button--disabled' : ''}`}
              onClick={() => handlePrev()}
              disabled={isAtStart}
            >
              <svg
                className="button__prev-img"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M5.13799 0.195262C4.87764 -0.0650874 4.45553 -0.0650874 4.19518 0.195262L0.195181 4.19526C-0.0651689 4.45561 -0.0651689 4.87772 0.195181 5.13807L4.19518 9.13807C4.45553 9.39842 4.87764 9.39842 5.13799 9.13807C5.39834 8.87772 5.39834 8.45561 5.13799 8.19526L1.60939 4.66667L5.13799 1.13807C5.39834 0.877722 5.39834 0.455612 5.13799 0.195262Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={isAtStart ? '#4A4D58' : '#F1F2F9'}
                />
              </svg>
            </button>
            <button
              className={`button__next ${isAtEnd ? 'button--disabled' : ''}`}
              onClick={() => handleNext()}
              disabled={isAtEnd}
            >
              <svg
                className="button__next-img"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={isAtEnd ? '#4A4D58' : '#F1F2F9'}
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="brand-new__slider"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          <ProductList
            products={
              filterBrandNew() as React.ComponentProps<
                typeof ProductList
              >['products']
            }
            column={false}
          />
        </div>
      </section>

      <section className="home-categories">
        <h2 className="home-categories__title section-title">
          Shop by category
        </h2>
        <div className="home-category">
          {Object.entries(categories).map(([key, value]) => (
            <>
              <div key={key} className={`home-category__${key}`}>
                <Link to={`/${key}`} className={`home-category__${key}__link`}>
                  <img
                    className={`home-category__${key}__img`}
                    src={`/img/category-${key}.webp`}
                    alt=""
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }
                  />
                </Link>
                <div className={`home-category__${key}__title`}>
                  {value}

                  <div className={`home-category__${key}__total`}>
                    {`${productFromServer.filter(product => product.category === key).length} models`}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>

      <section className="home-hot-prices">
        <div className="home-hot-prices__top">
          <h2 className="home-hot-prices__title section-title">Hot prices</h2>

          <div className="home-hot-prices__buttons">
            <button
              className={`button__prev ${isHotAtStart ? 'button--disabled' : ''}`}
              onClick={() => handleHotPrev()}
              disabled={isHotAtStart}
            >
              <svg
                className="button__prev-img"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M5.13799 0.195262C4.87764 -0.0650874 4.45553 -0.0650874 4.19518 0.195262L0.195181 4.19526C-0.0651689 4.45561 -0.0651689 4.87772 0.195181 5.13807L4.19518 9.13807C4.45553 9.39842 4.87764 9.39842 5.13799 9.13807C5.39834 8.87772 5.39834 8.45561 5.13799 8.19526L1.60939 4.66667L5.13799 1.13807C5.39834 0.877722 5.39834 0.455612 5.13799 0.195262Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={isHotAtStart ? '#4A4D58' : '#F1F2F9'}
                />
              </svg>
            </button>
            <button
              className={`button__next ${isHotAtEnd ? 'button--disabled' : ''}`}
              onClick={() => handleHotNext()}
              disabled={isHotAtEnd}
            >
              <svg
                className="button__next-img"
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
              >
                <path
                  d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L5.13807 4.19526C5.39842 4.45561 5.39842 4.87772 5.13807 5.13807L1.13807 9.13807C0.877722 9.39842 0.455612 9.39842 0.195262 9.13807C-0.0650874 8.87772 -0.0650874 8.45561 0.195262 8.19526L3.72386 4.66667L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill={isHotAtEnd ? '#4A4D58' : '#F1F2F9'}
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="home-hot-prices__slider"
          ref={hotPricesRef}
          onScroll={handleHotScroll}
        >
          <ProductList
            products={
              productFromServer as React.ComponentProps<
                typeof ProductList
              >['products']
            }
            column={false}
            hotPrices={true}
          />
        </div>
      </section>
    </main>
  );
};
