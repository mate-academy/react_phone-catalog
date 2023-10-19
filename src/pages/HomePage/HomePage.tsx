import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ProductsContext } from '../../context/ProductsProvider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const {
    products,
    phones,
    tablets,
    accessories,
  } = useContext(ProductsContext);
  const screenWidth = window.screen.width;

  let bannerWidth = 1040;
  let disabledPoint = (-2080);

  if (screenWidth > 500 && screenWidth < 767) {
    bannerWidth = 384;
    disabledPoint = (-768);
  }

  const hotPriceProducts = [...products].sort(
    (a: Product, b: Product) => b.discount - a.discount,
  );

  const newModels = [...products].sort(
    (a: Product, b: Product) => b.age - a.age,
  );

  const [offset, setOffset] = useState(0);

  const handlerLeftArrowClick = () => {
    setOffset((prevState) => prevState + bannerWidth);
  };

  const handlerRightArrowClick = () => {
    setOffset((prevState) => prevState - bannerWidth);
  };

  return (
    <div className="HomePage">
      <div className="HomePage__carousel">
        <div className="HomePage__carousel-banners">
          <button
            type="button"
            className="HomePage__bannersArrow"
            disabled={offset === 0}
            onClick={handlerLeftArrowClick}
          >
            &#60;
          </button>
          <div className="HomePage__banners-block">
            <div
              className="HomePage__visibleBanner"
              style={{
                transform: `translateX(${offset}px)`,
              }}
            >
              <div className="HomePage__banner HomePage__banner--1" />
              <div className="HomePage__banner HomePage__banner--2" />
              <div className="HomePage__banner HomePage__banner--3" />
            </div>
          </div>
          <button
            type="button"
            className="HomePage__bannersArrow"
            onClick={handlerRightArrowClick}
            disabled={offset === disabledPoint}
          >
            &#62;
          </button>
        </div>
        <div className="HomePage__carousel-labels">
          <div
            className={classNames(`HomePage__carousel-label + ${offset === 0
              ? 'HomePage__carousel-label--active'
              : ''
            }`)}
          />
          <div
            className={classNames(`HomePage__carousel-label + ${offset === disabledPoint / 2
              ? 'HomePage__carousel-label--active'
              : ''
            }`)}
          />
          <div
            className={classNames(`HomePage__carousel-label + ${offset === disabledPoint
              ? 'HomePage__carousel-label--active'
              : ''
            }`)}
          />
        </div>
      </div>

      <ProductsSlider
        title="Hot prices"
        sortProducts={hotPriceProducts}
      />

      <div className="HomePage__shopByCategory">
        <h1 className="HomePage__block-title">Shop by category</h1>
        <div className="HomePage__categories">
          <NavLink
            className="HomePage__category"
            to="/phones"
            data-cy="categoryLinksContainer"
          >
            <div
              className="HomePage__categoryImg HomePage__categoryImg--phones"
            />
            <h3 className="HomePage__category-name">Mobile phones</h3>
            <p className="HomePage__category-quantity">
              {phones.length}
              {' '}
              models
            </p>
          </NavLink>
          <NavLink
            className="HomePage__category"
            to="/tablets"
            data-cy="categoryLinksContainer"
          >
            <div
              className="HomePage__categoryImg HomePage__categoryImg--tablets"
            />
            <h3 className="HomePage__category-name">Tablets</h3>
            <p className="HomePage__category-quantity">
              {tablets.length}
              {' '}
              models
            </p>
          </NavLink>
          <NavLink
            className="HomePage__category"
            to="/accessories"
            data-cy="categoryLinksContainer"
          >
            <div
              className="HomePage__categoryImg HomePage__categoryImg--acces"
            />
            <h3 className="HomePage__category-name">Accessories</h3>
            <p className="HomePage__category-quantity">
              {accessories.length}
              {' '}
              models
            </p>
          </NavLink>
        </div>
      </div>

      <ProductsSlider
        title="Brand new models"
        sortProducts={newModels}
      />
    </div>
  );
};
