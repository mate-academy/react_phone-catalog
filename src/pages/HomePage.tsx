/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.scss';
import { ProductsSlider } from './components/ProductsSlider';
import { PreviewSlider } from './components/PreviewSlider';
import { Product } from '../types/Product';
import { useAppSelector } from '../app/hooks';
import { AsyncStatus } from '../types/AsyncStatus';
import { Loader } from './components/Loader';
import {
  phonesSelector,
  phonesStatusSelector,
  productsSelector,
} from '../app/selector';

export const HomePage: React.FC = () => {
  const phones: Product[] = useAppSelector(phonesSelector);
  const statusLadingPhones = useAppSelector(phonesStatusSelector);
  const tabletsAmount = useAppSelector(productsSelector).filter(
    p => p.type === 'tablet',
  ).length;
  const accessoryAmount = useAppSelector(productsSelector).filter(
    p => p.type === 'accessory',
  ).length;

  const hotPricePhones = [...phones].sort(
    (a: Product, b: Product) => {
      const aValue = (a.fullPrice - a.price) / a.fullPrice;
      const bValue = (b.fullPrice - b.price) / b.fullPrice;

      return aValue - bValue;
    },
  );

  const brandNewModels = [...phones].sort(
    (a: Product, b: Product) => +b.year - +a.year,
  );

  const images = [
    { imgUrl: 'images/banner-phones.png', id: '01' },
    { imgUrl: 'images/banner-phones.png', id: '02' },
    { imgUrl: 'images/banner-phones.png', id: '03' },
  ];

  return (
    <>
      <div className="home-page">
        <div className="home-page__preview-slider preview-slider">
          <PreviewSlider>
            {images.map(img => (
              <img
                className="pictures__picture"
                src={img.imgUrl}
                alt="Banner"
                key={img.id}
              />
            ))}
          </PreviewSlider>
        </div>

        <div className="home-page__hot-prices hot-prices">
          <h1 className="hot-prices__title">
            Hot prices
          </h1>
          {statusLadingPhones === AsyncStatus.LOADING ? (
            <Loader />
          ) : (
            <ProductsSlider phones={hotPricePhones} />
          )}
        </div>

        <div className="home-page__shop-by-category shop-by-category">
          <h2 className="shop-by-category__title">Shop by category</h2>
          <div className="shop-by-category__container">
            <div className="shop-by-category__category category">
              <Link to="phones" className="category__link">
                <img
                  src="images/preview-category-phone.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </Link>
              <h3 className="category__title">
                Mobile phones
              </h3>
              <p className="category__description">{`${phones.length} models`}</p>
            </div>
            <div className="shop-by-category__category category">
              <Link to="tablets" className="category__link">
                <img
                  src="images/preview-category-tablets.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </Link>
              <h3 className="category__title">
                Tablets
              </h3>
              <p className="category__description">{`${tabletsAmount} models`}</p>
            </div>
            <div className="shop-by-category__category category">
              <Link to="accessories" className="category__link">
                <img
                  src="images/preview-category-accessories.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </Link>
              <h3 className="category__title">
                Accessories
              </h3>
              <p className="category__description">{`${accessoryAmount} models`}</p>
            </div>
          </div>
        </div>

        <div className="home-page__brand-new brand-new">
          <h1 className="brand-new__title">
            Brand new models
          </h1>
          {statusLadingPhones === AsyncStatus.LOADING ? (
            <Loader />
          ) : (
            <ProductsSlider phones={brandNewModels} />
          )}
        </div>
      </div>

    </>
  );
};
