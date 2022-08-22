import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.scss';
import { Product } from '../../types/Product';
import homePage1 from '../../img/home-page-img.png';
import homePage2 from '../../img/home-page-img-2.jpeg';
import homePage3 from '../../img/home-page-img-3.jpeg';
import mobileExample from '../../img/mobile-img-example.jpg';
import tabletExample from '../../img/tablet-img-example.jpg';
import accessoriesExample from '../../img/accessories-img-example.jpeg';
import * as request from '../../api/request';

import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ProductsContext } from '../../helpers/ProductContext';

export const HomePage: React.FC = () => {
  const bannerImages = [homePage1, homePage2, homePage3];

  const { products } = useContext(ProductsContext);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [brandNewModels, setBrandNewModels] = useState([]);
  const [scroll, setScroll] = useState(0);

  const step = 1;
  const frameSize = 1;
  const itemWidth = 1040;
  const animationDuration = 750;

  const phonesQuantity = products
    .filter(product => product.type === 'phone').length;
  const tabletsQuantity = products
    .filter(product => product.type === 'tablet').length;
  const accessoriesQuantity = products
    .filter(product => product.type === 'accessorie').length;

  useEffect(() => {
    request.getHotPriceProducts()
      .then(result => setDiscountProducts(result.sort(
        (a: Product, b: Product) => (b.price / b.discount)
          - (a.price / a.discount),
      )));
  }, []);

  useEffect(() => {
    request.getBrandNewProducts()
      .then(result => setBrandNewModels(result.sort(
        (a: Product, b: Product) => a.age - b.age,
      )));
  }, []);

  const slideNextBanner = () => {
    if (scroll === bannerImages.length - frameSize) {
      setScroll(0);
    } else if (scroll + step >= bannerImages.length - frameSize) {
      setScroll(bannerImages.length - frameSize);
    } else {
      setScroll((prevState) => {
        return prevState + step;
      });
    }
  };

  const slidePreviousBanner = () => {
    if (scroll === 0) {
      setScroll(bannerImages.length - frameSize);
    } else if (scroll - step < 0) {
      setScroll(0);
    } else {
      setScroll((prevState) => {
        return prevState - step;
      });
    }
  };

  const bannerSliderList = {
    marginLeft: `-${scroll * itemWidth}px`,
    transition: `${animationDuration}ms`,
  };

  return (
    <>
      <div className="home-page">
        <div className="home-page-wrapper">
          <div className="banner">
            <button
              type="button"
              className="banner-button-left"
              onClick={slidePreviousBanner}
            >
              <i className="fa-solid fa-angle-left" />
            </button>
            <div className="banner-container">
              <div className="banner-img-list" style={bannerSliderList}>
                {bannerImages.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt="banner-img"
                    className="img"
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              className="banner-button-right"
              onClick={slideNextBanner}
            >
              <i className="fa-solid fa-angle-right" />
            </button>
          </div>

          <div className="hot-prices">
            <ProductSlider
              products={discountProducts}
              title="Hot prices"
            />
          </div>
          <div className="shop-category">
            <div>
              <h1 className="title">Shop by category</h1>
            </div>
            <div className="category-container">
              <NavLink to="phones" data-cy="categoryLinksContainer">
                <div className="category">
                  <div className="img-category-container">
                    <img
                      src={mobileExample}
                      alt="mobile-img"
                      className="category-img"
                    />
                  </div>
                  <div className="category-description">
                    <p className="category-title">Mobile phones</p>
                    <p className="category-quantity">{`${phonesQuantity} models`}</p>
                  </div>
                </div>
              </NavLink>
              <NavLink to="tablets" data-cy="categoryLinksContainer">
                <div className="category">
                  <div className="img-category-container">
                    <img
                      src={tabletExample}
                      alt="tablet-img"
                      className="category-img"
                    />
                  </div>
                  <div className="category-description">
                    <p className="category-title">Tablets</p>
                    <p className="category-quantity">{`${tabletsQuantity} models`}</p>
                  </div>
                </div>
              </NavLink>
              <NavLink to="accessories" data-cy="categoryLinksContainer">
                <div className="category">
                  <div className="img-category-container">
                    <img
                      src={accessoriesExample}
                      alt="accessories-img"
                      className="category-img"
                    />
                  </div>
                  <div className="category-description">
                    <p className="category-title">Accessories</p>
                    <p className="category-quantity">{`${accessoriesQuantity} models`}</p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="new-models">
            <ProductSlider
              products={brandNewModels}
              title="Brand new models"
            />
          </div>
        </div>
      </div>
    </>
  );
};
