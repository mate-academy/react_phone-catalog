import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import slides from '../../helpers/bannerData.json';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/ProductType';
import {
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../helpers/products';

export const HomePage: React.FC = () => {
  const [slideId, setSlideId] = useState(1);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    getHotPriceProducts()
      .then((data) => {
        setHotProducts(data);
      });
  }, []);

  useEffect(() => {
    getBrandNewProducts()
      .then((data) => {
        setBrandNew(data);
      });
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 0 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (
      prevSlide === hotProducts.length - 4 ? prevSlide : prevSlide + 1
    ));
  };

  const nextSlide = useCallback(() => {
    setSlideId(
      (prevSlideId) => (prevSlideId === slides.length ? 1 : prevSlideId + 1),
    );
  }, []);

  const prevSlide = useCallback(() => {
    setSlideId(
      (prevSlideId) => (prevSlideId === 1 ? slides.length : prevSlideId - 1),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <>
      <div className="container">
        <div className="carousel">
          <button
            type="button"
            className="arrow arrow--left"
            onClick={prevSlide}

          >
            <img
              src="/icons/buttons-icons/Left-arrow-long.svg"
              alt="left"
            />
          </button>

          <div className="carousel__box">
            {slides.map((item) => {
              return (
                <img
                  className={slideId === item.id ? 'slide' : 'slide-hidden'}
                  src={item.src}
                  alt={item.alt}
                  key={item.id}
                />
              );
            })}
          </div>

          <button
            type="button"
            className="arrow arrow--left"
            onClick={nextSlide}
          >
            <img
              src="/icons/buttons-icons/Right-arrow-long.svg"
              alt="right"
            />
          </button>
        </div>

        <span className="indicators">
          {slides.map(item => {
            return (
              <button
                key={item.id}
                type="button"
                className="indicator"
                onClick={() => setSlideId(item.id)}
              >
                {slideId === item.id ? (
                  <img
                    src="/icons/buttons-icons/IndicatorFocus.svg"
                    alt="hov"
                  />
                ) : (
                  <img
                    src="/icons/buttons-icons/IndicatorDef.svg"
                    alt="hov"
                  />
                )}
              </button>
            );
          })}
        </span>
      </div>

      <div className="container">
        <div className="bloc hot-prices">
          <div className="slider-top">
            <h1 className="title">Hot prices</h1>
            <div className="cuple-buttons">
              <button
                type="button"
                className="arrow arrow--left"
                onClick={handlePrevSlide}
              >
                {currentSlide === 0 ? (
                  <img
                    src="/icons/buttons-icons/ChevronDisabled(Left).svg"
                    alt="left"
                    className="icon icon__disabled"
                  />
                ) : (
                  <img
                    src="/icons/buttons-icons/ChevronDef(Left).svg"
                    alt="left"
                    className="icon "
                  />
                )}
              </button>
              <button
                type="button"
                className="arrow arrow--left"
                onClick={handleNextSlide}
              >
                {currentSlide === hotProducts.length - 4 ? (
                  <img
                    src="/icons/buttons-icons/ChevronDisabled(Right).svg"
                    alt="right"
                    className="icon icon__disabled"
                  />
                ) : (
                  <img
                    src="/icons/buttons-icons/ChevronDef(Right).svg"
                    alt="left"
                    className="icon"
                  />
                )}

              </button>
            </div>
          </div>
          <ProductsSlider
            products={hotProducts}
            currentSlide={currentSlide}
          />
        </div>

        <div className="bloc category">
          <h1 className="title category__title">Shop by category</h1>

          <div
            className="category__container"
            data-cy="categoryLinksContainer"
          >
            <Link to="phones" className="category__card">
              <div className="category__photo category__photo--phones">
                <img
                  className="category__img"
                  src="/_new/img/category-phones.png"
                  alt="phones"
                />
              </div>

              <p className="category__name">Mobile phones</p>
              <p className="category__amount">95 models</p>
            </Link>
            <Link to="tablets" className="category__card">
              <div className="category__photo category__photo--tablets">
                <img
                  className="category__img"
                  src="/_new/img/category-tablets.png"
                  alt="tablets"
                />
              </div>

              <p className="category__name">Tablets</p>
              <p className="category__amount">24 models</p>

            </Link>
            <Link to="/" className="category__card">
              <div className="category__photo category__photo--accessories">
                <img
                  className="category__img category__img--acces"
                  src="/_new/img/category-accessories.png"
                  alt="accessories"
                />
              </div>

              <p className="category__name">Accessories</p>
              <p className="category__amount">100 models</p>
            </Link>

          </div>
        </div>

        <div className="bloc brand-new">
          <div className="slider-top">
            <h1 className="title">Brand new models</h1>
            <div className="cuple-buttons">
              <button
                type="button"
                className="arrow arrow--left"
                onClick={handlePrevSlide}
              >
                {currentSlide === 0 ? (
                  <img
                    src="/icons/buttons-icons/ChevronDisabled(Left).svg"
                    alt="left"
                    className="icon icon__disabled"
                  />
                ) : (
                  <img
                    src="/icons/buttons-icons/ChevronDef(Left).svg"
                    alt="left"
                    className="icon "
                  />
                )}
              </button>
              <button
                type="button"
                className="arrow arrow--left"
                onClick={handleNextSlide}
              >
                {currentSlide === hotProducts.length - 4 ? (
                  <img
                    src="/icons/buttons-icons/ChevronDisabled(Right).svg"
                    alt="right"
                    className="icon icon__disabled"
                  />
                ) : (
                  <img
                    src="/icons/buttons-icons/ChevronDef(Right).svg"
                    alt="left"
                    className="icon"
                  />
                )}

              </button>
            </div>
          </div>
          <ProductsSlider products={brandNew} currentSlide={currentSlide} />
        </div>
      </div>
    </>
  );
};
