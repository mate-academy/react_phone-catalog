import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { ProductSlider } from '../../components/ProductSlider';
import { Slider } from '../../components/Slider';
import { Footer } from '../../components/Footer';

import telephones from '../../images/category/phones.jpg';
import tablets from '../../images/category/tablets.jpg';
import accessories from '../../images/category/accessories.jpg';

import './HomePage.scss';

type Props = {
  hotProducts: Product[],
  newProducts: Product[],
};

export const HomePage: React.FC<Props> = ({ hotProducts, newProducts }) => {
  const [indexHotPrices, setIndexHotPrices] = useState(0);
  const [indexNewPrices, setIndexNewPrices] = useState(0);

  const telCount = newProducts.filter(
    (product) => product.type === 'phone',
  ).length;

  const tabletCount = newProducts.filter(
    (product) => product.type === 'tablet',
  ).length;

  const accesoriesCount = newProducts.filter(
    (product) => product.type === 'accesories',
  ).length;

  const handleClickBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === 'hotBack'
         && indexHotPrices >= 4) {
      return (
        setIndexHotPrices(indexHotPrices - 4)
      );
    }

    if (event.currentTarget.name === 'newBack'
         && indexNewPrices >= 4) {
      return (
        setIndexNewPrices(indexNewPrices - 4)
      );
    }

    return (
      setIndexNewPrices(indexNewPrices),
      setIndexHotPrices(indexHotPrices)
    );
  };

  const handleClickForward = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === 'hotForward') {
      if (indexHotPrices + 4 <= hotProducts.length) {
        return (
          setIndexHotPrices(indexHotPrices + 4)
        );
      }

      return (
        setIndexHotPrices(hotProducts.length - 4)
      );
    }

    if (event.currentTarget.name === 'newForward') {
      if (indexNewPrices + 4 <= newProducts.length) {
        return (
          setIndexNewPrices(indexNewPrices + 4)
        );
      }

      return (
        setIndexNewPrices(newProducts.length - 4)
      );
    }

    return (
      setIndexNewPrices(indexNewPrices),
      setIndexHotPrices(indexHotPrices)
    );
  };

  return (
    <div className="HomePage">
      <Header />
      <div className="wrapper">

        <div className="HomePage__slider" hidden>
          <Slider />
        </div>

        <div className="HomePage__hot-prices">
          <div className="HomePage__hot-prices-info">
            <h1 className="HomePage__hot-prices-info-title">Hot prices</h1>
            <div className="HomePage__hot-prices-nav">
              <button
                className="button"
                type="button"
                name="hotBack"
                onClick={handleClickBack}
                disabled={indexHotPrices === 0}
              >
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="inherit"
                    clipRule="inherit"
                    d="M5.47136 0.528606C5.21101 0.268256 4.7889
                  0.268256 4.52855 0.528606L0.528555
                  4.52861C0.268205 4.78896 0.268205
                  5.21107 0.528555 5.47141L4.52855
                  9.47141C4.7889 9.73176 5.21101
                  9.73176 5.47136 9.47141C5.73171
                  9.21107 5.73171 8.78896 5.47136
                  8.52861L1.94277 5.00001L5.47136
                  1.47141C5.73171 1.21107 5.73171
                  0.788955 5.47136 0.528606Z"
                  />
                </svg>
              </button>
              <button
                className="button button--right"
                type="button"
                name="hotForward"
                onClick={handleClickForward}
                disabled={indexHotPrices + 4 >= hotProducts.length}
              >
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="inherit"
                    clipRule="inherit"
                    d="M5.47136 0.528606C5.21101 0.268256 4.7889
                  0.268256 4.52855 0.528606L0.528555
                  4.52861C0.268205 4.78896 0.268205
                  5.21107 0.528555 5.47141L4.52855
                  9.47141C4.7889 9.73176 5.21101
                  9.73176 5.47136 9.47141C5.73171
                  9.21107 5.73171 8.78896 5.47136
                  8.52861L1.94277 5.00001L5.47136
                  1.47141C5.73171 1.21107 5.73171
                  0.788955 5.47136 0.528606Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="HomePage__hot-prices-products">
            <ProductSlider
              products={hotProducts}
              index={indexHotPrices}
            />
          </div>
        </div>

        <div className="HomePage__category">
          <h1 className="HomePage__category-title">Shop by category</h1>
          <div className="HomePage__category-products">
            <div className="HomePage__category-card">
              <NavLink to="/phones" className="HomePage__category-link">
                <img
                  src={telephones}
                  alt="telephones"
                  className="HomePage__category-img HomePage__category-img--tel"
                />
                <p className="HomePage__category-descrition">Mobile phones</p>
              </NavLink>
              <p className="HomePage__category-count">{`${telCount} models`}</p>
            </div>
            <div className="HomePage__category-card">
              <NavLink to="/tablets" className="HomePage__category-link">
                <img
                  src={tablets}
                  alt="tablets"
                  className="HomePage__category-img HomePage__category-img--tab"
                />
                <p className="HomePage__category-descrition">Tablets</p>
              </NavLink>
              <p className="HomePage__category-count">{`${tabletCount} models`}</p>
            </div>
            <div className="HomePage__category-card">
              <NavLink to="/tablets" className="HomePage__category-link">
                <img
                  src={accessories}
                  alt="accessories"
                  className="HomePage__category-img HomePage__category-img--acc"
                />
                <p className="HomePage__category-descrition">Accessories</p>
              </NavLink>
              <p className="HomePage__category-count">{`${accesoriesCount} models`}</p>
            </div>
          </div>
        </div>

        <div className="HomePage__new">
          <div className="HomePage__new-info">
            <h1 className="HomePage__new-info-title">Brand new models</h1>
            <div className="HomePage__new-nav">
              <button
                className="button"
                type="button"
                name="newBack"
                onClick={handleClickBack}
                disabled={indexNewPrices === 0}
              >
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="inherit"
                    clipRule="inherit"
                    d="M5.47136 0.528606C5.21101 0.268256 4.7889
                  0.268256 4.52855 0.528606L0.528555
                  4.52861C0.268205 4.78896 0.268205
                  5.21107 0.528555 5.47141L4.52855
                  9.47141C4.7889 9.73176 5.21101
                  9.73176 5.47136 9.47141C5.73171
                  9.21107 5.73171 8.78896 5.47136
                  8.52861L1.94277 5.00001L5.47136
                  1.47141C5.73171 1.21107 5.73171
                  0.788955 5.47136 0.528606Z"
                  />
                </svg>
              </button>
              <button
                className="button button--right"
                type="button"
                name="newForward"
                onClick={handleClickForward}
                disabled={indexNewPrices + 4 >= newProducts.length}
              >
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="inherit"
                    clipRule="inherit"
                    d="M5.47136 0.528606C5.21101 0.268256 4.7889
                  0.268256 4.52855 0.528606L0.528555
                  4.52861C0.268205 4.78896 0.268205
                  5.21107 0.528555 5.47141L4.52855
                  9.47141C4.7889 9.73176 5.21101
                  9.73176 5.47136 9.47141C5.73171
                  9.21107 5.73171 8.78896 5.47136
                  8.52861L1.94277 5.00001L5.47136
                  1.47141C5.73171 1.21107 5.73171
                  0.788955 5.47136 0.528606Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="HomePage__new-products">
            <ProductSlider
              products={newProducts}
              index={indexNewPrices}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
