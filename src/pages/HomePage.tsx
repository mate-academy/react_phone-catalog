/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

import { ProductsSlider } from './components/ProductsSlider';
import '../styles/styles.scss';

import { PreviewSlider } from './components/PreviewSlider';
// import { ProductCard } from './components/ProductCard';
import { getPhones } from '../api/phone';
import { Phone } from '../types/Phone';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  const images = [
    { imgUrl: 'images/BannerHomePage.png', id: '01' },
    { imgUrl: 'images/BannerHomePage.png', id: '02' },
    { imgUrl: 'images/BannerHomePage.png', id: '03' },
  ];

  // const products = [
  //   { id: '1', value: <ProductCard /> },
  //   { id: '2', value: <ProductCard /> },
  //   { id: '3', value: <ProductCard /> },
  //   { id: '4', value: <ProductCard /> },
  //   { id: '5', value: <ProductCard /> },
  //   { id: '6', value: <ProductCard /> },
  //   { id: '7', value: <ProductCard /> },
  //   { id: '8', value: <ProductCard /> },
  // ];

  async function loadedPhones() {
    try {
      const result = await getPhones();

      setPhones(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  useEffect(() => {
    loadedPhones();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-page__preview-slider preview-slider">
          <PreviewSlider>
            {images.map((img, index) => (
              <img
                className={`picture-${index}`}
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
          <ProductsSlider>
            {phones.map(product => {
              return (
                <div key={product.id}>
                  {product}
                </div>
              );
            })}
          </ProductsSlider>
        </div>

        <div className="home-page__shop-by-category shop-by-category">
          <h2 className="shop-by-category__title">Shop by category</h2>
          <div className="shop-by-category__container">
            <div className="shop-by-category__category category">
              <a href="http://" className="category__link">
                <img
                  src="images/preview-category-phone.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </a>
              <h3 className="category__title">
                Mobile phones
              </h3>
              <p className="category__description">95 models</p>
            </div>
            <div className="shop-by-category__category category">
              <a href="http://" className="category__link">
                <img
                  src="images/preview-category-tablets.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </a>
              <h3 className="category__title">
                Tablets
              </h3>
              <p className="category__description">24 models</p>
            </div>
            <div className="shop-by-category__category category">
              <a href="http://" className="category__link">
                <img
                  src="images/preview-category-accessories.png"
                  alt="Phone Category"
                  className="category__img"
                />
              </a>
              <h3 className="category__title">
                Accessories
              </h3>
              <p className="category__description">100 models</p>
            </div>
          </div>
        </div>

        <div className="home-page__brand-new brand-new">
          <h1 className="brand-new__title">
            Brand new models
          </h1>
          {/* <ProductsSlider>
            {products.map(product => (
              <div key={product.id}>
                {product.value}
              </div>
            ))}
          </ProductsSlider> */}
        </div>
      </div>

    </>
  );
};
