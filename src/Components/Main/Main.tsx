/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Products } from '../../types/Products';
import { getDiscountedProducts, getProducts } from '../../api/api';
import { Product } from '../Products/Products';
import React from 'react';
import { Discount } from '../Discouned/Discounted';
import { Discounted } from '../../types/Discounted';

import welcomeTablet from '../../images/Banner-tablet.png';
import welcomePhone from '../../images/banner-phone.png';

enum Rectangles {
  first = 'first',
  second = 'second',
  third = 'third',
}

export const Main: React.FC = () => {
  const [activeRec, setActiveRec] = useState<Rectangles>(Rectangles.first);
  const [activePic, setActivePic] = useState<Rectangles>(Rectangles.first);
  const pics = [Rectangles.first, Rectangles.second, Rectangles.third];
  const [picIndex, setPicIndex] = useState(0);

  const [products, setProducts] = useState<Products[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<Discounted[]>(
    [],
  );
  const [, setLoading] = useState(true);
  const [, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage(`Couldn't load any tablets`))
      .finally(() => setLoading(false));

    getDiscountedProducts()
      .then(setDiscountedProducts)
      .catch(() => setErrorMessage(`Couldn't load any discounted products`))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    {
      id: '/phones',
      img: './img/category-phones.webp',
      title: 'Mobile phones',
      subTitle: '95 models',
      categoryClass: 'category-pink',
      categoryClassImg: 'category-pink-img',
    },
    {
      id: '/tablets',
      img: './img/category-tablets.webp',
      title: 'Tablets',
      subTitle: '24 models',
      categoryClass: 'category-grey',
      categoryClassImg: 'category-grey-img',
    },
    {
      id: '/accessories',
      img: './img/category-accessories.webp',
      title: 'Accessories',
      subTitle: '100 models',
      categoryClass: 'category-purple',
      categoryClassImg: 'category-purple-img',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(4);
  const activeRect = activeRec;

  const [discountedActiveIndex, setDiscountedActiveIndex] = useState(0);

  const getProductsPerSlide = (width: number) =>
    width >= 1200 ? 4 : width >= 768 ? 3 : width >= 480 ? 2 : 1;

  useEffect(() => {
    const handleResize = () => {
      setProductsPerSlide(getProductsPerSlide(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveIndex(prev => {
      const maxStart = Math.max(0, products.length - productsPerSlide);

      return prev > maxStart ? maxStart : prev;
    });
  }, [products.length, productsPerSlide]);

  useEffect(() => {
    setDiscountedActiveIndex(prev => {
      const maxStart = Math.max(
        0,
        discountedProducts.length - productsPerSlide,
      );

      return prev > maxStart ? maxStart : prev;
    });
  }, [discountedProducts.length, productsPerSlide]);

  const handlePicChange = useCallback(
    (direction: 'next' | 'prev') => {
      setPicIndex(prev =>
        direction === 'next'
          ? (prev + 1) % pics.length
          : (prev - 1 + pics.length) % pics.length,
      );

      setActiveRec(pics[picIndex]);
      setActivePic(pics[picIndex]);
    },
    [picIndex, pics],
  );

  const handleProductChange = useCallback(
    (direction: 'next' | 'prev') => {
      setActiveIndex(prev => {
        const lastIndex = Math.max(0, products.length - productsPerSlide);

        if (direction === 'next') {
          return Math.min(prev + 1, lastIndex);
        }

        return Math.max(0, prev - 1);
      });
    },
    [products.length, productsPerSlide],
  );

  const handleDiscountedChange = useCallback(
    (direction: 'next' | 'prev') => {
      setDiscountedActiveIndex(prev => {
        if (direction === 'next') {
          return prev + 1 < discountedProducts.length ? prev + 1 : 0;
        }

        const next = prev - 1;

        if (next >= 0) {
          return next;
        }

        return Math.max(0, discountedProducts.length - productsPerSlide);
      });
    },
    [discountedProducts.length, productsPerSlide],
  );

  const currentDiscountedProducts = discountedProducts.slice(
    discountedActiveIndex,
    discountedActiveIndex + productsPerSlide,
  );

  const arrowLeft = new URL(
    '../../images/icons/Chevron (Arrow Left).svg',
    import.meta.url,
  ).href;

  const arrowRight = new URL(
    '../../images/icons/Chevron (Arrow Right).svg',
    import.meta.url,
  ).href;

  const welcomeImage = new URL('../../images/Banner.png', import.meta.url).href;

  useEffect(() => {
    const id = setInterval(() => setPicIndex(p => (p + 1) % pics.length), 5000);

    return () => clearInterval(id);
  }, [pics.length]);

  return (
    <main className="main">
      <div className="main__container">
        <div className="main__content">
          <section className="welcome__block">
            <div className="welcome__block-text">
              <h1 className="welcome__block-title">
                Welcome to Nice Gadgets store!
              </h1>
            </div>

            <div className="welcome__block-sliders">
              <button
                type="button"
                className="welcome__block-slider"
                onClick={() => handlePicChange('prev')}
              >
                <img src={arrowLeft} className="icon-slider" alt="" />
              </button>
              <Link to="/phones">
                <div className="welcome__block-img">
                  {activePic === Rectangles.first && (
                    <picture>
                      <source
                        media="(min-width: 1200px)"
                        srcSet={welcomeImage}
                      />
                      <source
                        media="(min-width: 640px)"
                        srcSet={welcomeTablet}
                      />
                      <img
                        className="welcome__block-image"
                        src={welcomePhone}
                        alt="Welcome Image"
                      />
                    </picture>
                  )}
                  {activePic === Rectangles.second && (
                    <picture>
                      <source
                        media="(min-width: 1200px)"
                        srcSet={welcomeImage}
                      />
                      <source
                        media="(min-width: 640px)"
                        srcSet={welcomeTablet}
                      />
                      <img
                        className="welcome__block-image"
                        src={welcomePhone}
                        alt="Welcome Image"
                      />
                    </picture>
                  )}
                  {activePic === Rectangles.third && (
                    <picture>
                      <source
                        media="(min-width: 1200px)"
                        srcSet={welcomeImage}
                      />
                      <source
                        media="(min-width: 640px)"
                        srcSet={welcomeTablet}
                      />
                      <img
                        className="welcome__block-image"
                        src={welcomePhone}
                        alt="Welcome Image"
                      />
                    </picture>
                  )}
                </div>
              </Link>
              <button
                type="button"
                className="welcome__block-slider"
                onClick={() => handlePicChange('next')}
              >
                <img src={arrowRight} className="icon-slider" alt="" />
              </button>
            </div>
            <div className="welcome__block-rectangles">
              {activeRect === Rectangles.first ? (
                // eslint-disable-next-line max-len
                <div className="welcome__block-rectangle welcome__block-rectangle-active">
                  <Link to=""></Link>
                </div>
              ) : (
                <div
                  onClick={() => setActiveRec(Rectangles.first)}
                  className="welcome__block-rectangle"
                >
                  <Link to=""></Link>
                </div>
              )}
              {activeRect === Rectangles.second ? (
                // eslint-disable-next-line max-len
                <div className="welcome__block-rectangle welcome__block-rectangle-active">
                  <Link to=""></Link>
                </div>
              ) : (
                <div
                  onClick={() => setActiveRec(Rectangles.second)}
                  className="welcome__block-rectangle"
                >
                  <Link to=""></Link>
                </div>
              )}
              {activeRect === Rectangles.third ? (
                // eslint-disable-next-line max-len
                <div className="welcome__block-rectangle welcome__block-rectangle-active">
                  <Link to=""></Link>
                </div>
              ) : (
                <div
                  onClick={() => setActiveRec(Rectangles.third)}
                  className="welcome__block-rectangle "
                >
                  <Link to=""></Link>
                </div>
              )}
            </div>
            <div />
          </section>
          <section className="new__models section">
            <div className="new__models-arr">
              <h2 className="section-title new__models-title">
                Brand new models
              </h2>
              <div className="new__models-arrows">
                <Link to="" className="new__models-arrow-left">
                  <button
                    className={`new__models-arrow ${activeIndex === 0 ? 'new__models-arrow-disabled' : ''}`}
                    onClick={() => {
                      handleProductChange('prev');
                    }}
                    disabled={activeIndex === 0}
                  >
                    <img src={arrowLeft} alt="" className="icon-arrow" />
                  </button>
                </Link>
                <Link to="" className="new__models-arrow-right">
                  <button
                    className={`new__models-arrow ${activeIndex + productsPerSlide >= products.length ? 'new__models-arrow-disabled' : ''}`}
                    onClick={() => {
                      handleProductChange('next');
                    }}
                    disabled={activeIndex + productsPerSlide >= products.length}
                  >
                    <img src={arrowRight} alt="" className="icon-arrow" />
                  </button>
                </Link>
              </div>
            </div>
            <Product
              currentSlide={activeIndex}
              products={products}
              visibleCount={productsPerSlide}
            />
          </section>
          <section className="categories section">
            <div className="categories__container">
              <div className="section-title categories__title">
                Shop by category
              </div>
              <div className="categories__blocks">
                {categories.map(category => (
                  <div key={category.id} className="category">
                    <div
                      className={`category__image ${category.categoryClass}`}
                    >
                      <Link to={category.id}>
                        <img
                          src={category.img}
                          className={`category__img`}
                          alt="Mobile Phones"
                        />
                      </Link>
                    </div>
                    <p className="category__title">{category.title}</p>
                    <p className="category__sub-title">{category.subTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="new__models section">
            <div className="new__models-arr">
              <h2 className="section-title">Hot prices</h2>
              <div className="new__models-arrows">
                <Link to="" className="new__models-arrow-link">
                  <button
                    className={`new__models-arrow ${discountedActiveIndex === 0 ? 'new__models-arrow-disabled' : ''}`}
                    onClick={() => handleDiscountedChange('prev')}
                    disabled={discountedActiveIndex === 0}
                  >
                    <img src={arrowLeft} alt="" className="icon-arrow" />
                  </button>
                </Link>
                <Link to="" className="new__models-arrow-link">
                  <button
                    className={`new__models-arrow ${discountedActiveIndex + productsPerSlide >= discountedProducts.length ? 'new__models-arrow-disabled' : ''}`}
                    onClick={() => handleDiscountedChange('next')}
                    disabled={
                      discountedActiveIndex + productsPerSlide >=
                      discountedProducts.length
                    }
                  >
                    <img src={arrowRight} alt="" className="icon-arrow" />
                  </button>
                </Link>
              </div>
            </div>
            <Discount
              DiscountedProducts={currentDiscountedProducts}
              visibleCount={productsPerSlide}
            />
          </section>
        </div>
      </div>
    </main>
  );
};
