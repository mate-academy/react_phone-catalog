import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../type/Product';
import { getBanners, getProducts } from '../../server/fetchJson';
import Card from '../Card';
import './PageHome.scss';
import { Banner } from '../../type/Banner';
import Loader from '../Loader';
import PageError from '../PageError';

export const PageHome = () => {
  const [countBanner, setCountBanner] = useState(0);
  const [countBrand, setCountBrand] = useState(0);
  const [slidHot, setSlidHot] = useState(0);

  const [banners, setBanners] = useState<Banner[]>([]);
  const [hotPriceProduct, setHotPriceProduct] = useState<Product[]>([]);
  const [brandProduct, setBrandProduct] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [isLoader, setLoader] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const copyProduct = [...products];
    const FilterBrand = copyProduct.filter(item => item.discount === 0)
      .sort((item1, item2) => item2.price - item1.price);

    setBrandProduct(FilterBrand);
  }, [products]);

  useEffect(() => {
    const copyProduct = [...products];
    const filterHotPrice = copyProduct.filter(item => item.discount > 0)
      .sort((item1, item2) => ((item2.price / 100) * item2.discount)
        - ((item1.price / 100) * item1.discount));

    setHotPriceProduct(filterHotPrice);
  }, [products]);

  const nextSlide = (
    set:React.Dispatch<React.SetStateAction<number>>,
    arr:Product[] | Banner[],
  ) => {
    set((count) => {
      return count === arr.length - 1 ? 0 : count + 1;
    });
  };

  const prevSlide = (
    set:React.Dispatch<React.SetStateAction<number>>,
    arr:Product[] | Banner[],
  ) => {
    set((count) => {
      return count === 0 ? arr.length - 1 : count - 1;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide(setCountBanner, banners);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [countBanner]);

  useEffect(() => {
    getBanners()
      .then(bannerItems => setBanners(bannerItems));

    getProducts()
      .then(prodItems => {
        setProducts(prodItems);
        setLoader(false);
      })
      .catch(() => {
        setError(true);
        setLoader(false);
      });
  }, []);

  let blockWidth = 0;
  let mediaV = 0;

  for (let i = 1; i < 10; i += 1) {
    mediaV += 288;

    if (window.matchMedia(`(min-width: ${mediaV}px)`).matches) {
      blockWidth = i;
    }
  }

  if (isLoader) {
    return (
      <Loader />
    );
  }

  if (!isLoader && isError) {
    return (
      <PageError />
    );
  }

  return (
    <>
      <section className="slider main__section">
        <button
          className="slider__btn slider__btn--left"
          onClick={() => prevSlide(setCountBanner, banners)}
          aria-label="btn"
          type="button"
        />
        <div className="slider__block-img">
          <div
            className="slider__wrapper"
            style={{ transform: `translateX(${-100 * countBanner}%)` }}
          >
            {banners.map(b => (
              <img
                src={b.img}
                key={b.img}
                alt="banner"
                className="slider__img"
              />
            ))}
          </div>
        </div>

        <button
          className="slider__btn slider__btn--right"
          onClick={() => nextSlide(setCountBanner, banners)}
          aria-label="btn"
          type="button"
        />
      </section>

      <section className="hot-price main__section">
        <div className="hot-price__content">
          <div className="main__head">
            <h1 className="main__section--title">Hot prices</h1>

            <div className="btn__block">
              <button
                className={classNames(
                  'btn',
                  'btn--prev',
                  { disabled: slidHot === 0 },
                )}
                onClick={() => prevSlide(setSlidHot, products)}
                disabled={slidHot === 0}
                aria-label="btn-prev"
                type="button"
              />

              <button
                className={classNames(
                  'btn',
                  'btn--next',
                  { disabled: slidHot === hotPriceProduct.length - blockWidth },
                )}
                onClick={() => nextSlide(setSlidHot, products)}
                disabled={slidHot === hotPriceProduct.length - blockWidth}
                aria-label="btn-next"
                type="button"
              />
            </div>
          </div>

          <div className="card__wrapper">
            <div className="card__block">
              <ul className="card__list" style={{ transform: `translateX(-${slidHot * 288}px)` }} data-cy="cardContainer">
                {hotPriceProduct && hotPriceProduct.map(prod => (
                  <Card product={prod} key={prod.id} />
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section className="category main__section">
        <div className="category__head">
          <h2 className="main__section--title">Shop by category</h2>
        </div>

        <nav className="category__wrapper">
          <ul className="category__list">
            <li className="category__item">
              <Link
                to="/phones"
                className="category__link category__link--phones"
              />

              <h3 className="category__title">Mobile phones</h3>

              <span className="page__count">{`${products.filter(p => p.type === 'phone').length} models`}</span>
            </li>

            <li className="category__item">
              <Link
                to="/tablets"
                className="category__link category__link--tablets"
              />

              <h3 className="category__title">Tablets</h3>

              <span className="page__count">{`${products.filter(p => p.type === 'tablet').length} models`}</span>
            </li>

            <li className="category__item">
              <Link
                to="/accessories"
                className="category__link category__link--accessories"
              />

              <h3 className="category__title">Accessories</h3>

              <span className="page__count">{`${0 + products.filter(p => p.type === 'accessories').length} accessories`}</span>
            </li>
          </ul>
        </nav>
      </section>

      <section className="brand main__section">
        <div className="main__head">
          <h2 className="main__section--title">Brand new models</h2>

          <div className="btn__block">
            <button
              className={classNames(
                'btn',
                'btn--prev',
                { disabled: countBrand === 0 },
              )}
              onClick={() => prevSlide(setCountBrand, brandProduct)}
              disabled={countBrand === 0}
              aria-label="btn-prev"
              type="button"
            />

            <button
              className={classNames(
                'btn',
                'btn--next',
                { disabled: countBrand === brandProduct.length - blockWidth },
              )}
              onClick={() => nextSlide(setCountBrand, brandProduct)}
              disabled={countBrand === brandProduct.length - blockWidth}
              aria-label="btn-next"
              type="button"
            />
          </div>
        </div>
        <div className="card__wrapper">
          <div className="card__block">
            <ul className="card__list" style={{ transform: `translateX(-${countBrand * 288}px)` }} data-cy="cardContainer">
              {brandProduct && brandProduct.map(prod => (
                <Card product={prod} key={prod.id} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
