/* eslint-disable no-mixed-operators */
import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { Product, Type } from '../types/product';
import '../styles/blocks/HomePage.scss';
import { Loader } from '../components/Loader/Loader';
import { Cart } from '../types/cart';

type Props = {
  products: Product[];
  updatePageHeight: () => void;
  isLoading: boolean;
  handleSetCarts: (value:Product) => void;
  carts:Cart[];
  handleSetFavorites: (value:Product) => void;
  favorites: Product[],
};

const ActiveSlideClassName = (
  currentBanner: number, slides: number[], bannerMove: number,
) => cn(
  {
    img: !(currentBanner === slides[0] && bannerMove === 0)
  && !(currentBanner === slides[1] && bannerMove > 0)
  && !(currentBanner === slides[2] && bannerMove < 0),
  },
);

export const HomePage: React.FC<Props> = ({
  products, updatePageHeight, isLoading, handleSetCarts, carts,
  handleSetFavorites, favorites,
}) => {
  const [banners] = useState(
    ['./img/banner-phones.png',
      './img/banner-tablets.png',
      './img/banner-accessories.png'],
  );
  const [currentBanner, setCurrentBanner] = useState(0);
  const [bannerMove, setBannerMove] = useState(0);

  useEffect(() => updatePageHeight(), []);

  const changeBanner = (side: string) => {
    let bannerWidth = 0;

    if (window.innerWidth >= 1138) {
      bannerWidth = 1040;
    } else if (window.innerWidth >= 744) {
      bannerWidth = 520;
    } else {
      bannerWidth = 358.391;
    }

    setBannerMove(side === 'right' ? -bannerWidth : bannerWidth);

    setTimeout(() => {
      if (side === 'right') {
        setCurrentBanner(currentBanner === 2 ? 0 : currentBanner + 1);
      } else {
        setCurrentBanner(currentBanner === 0 ? 2 : currentBanner - 1);
      }

      setBannerMove(0);
    }, 410);
  };

  useEffect(() => {
    const intervalId = setInterval(() => changeBanner('right'), 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentBanner]);

  const hotPricesProducts = useMemo(() => {
    return products
      .filter(product => product.discount > 0)
      .sort((a, b) => b.price * b.discount / 100 - a.price * a.discount / 100);
  }, [products]);

  const newModelsProducts = useMemo(() => {
    return products
      .filter(product => product.discount === 0)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <div className="home-page-container">
      <div className="banner-container home-page-container__banner-container ">
        <button
          type="button"
          className="button-navigation-banner"
          onClick={() => changeBanner('left')}
        >
          <img
            className="img"
            src="./img/icons/arrowleft.svg"
            alt="#move-left"
          />
        </button>
        <div
          className="banner-img-container"
        >
          <img
            className="banner-img"
            src={banners[currentBanner === 0 ? '2' : currentBanner - 1]}
            alt="#banner"
            style={bannerMove !== 0 ? {
              transform: `translateX(${bannerMove}px)`,
              transition: 'all 400ms ease-out',
            } : {}}
          />
          <img
            className="banner-img"
            src={banners[currentBanner]}
            alt="#banner"
            style={bannerMove !== 0 ? {
              transform: `translateX(${bannerMove}px)`,
              transition: 'all 400ms ease-out',
            } : {}}
          />
          <img
            className="banner-img"
            src={banners[currentBanner === 2 ? '0' : currentBanner + 1]}
            alt="#banner"
            style={bannerMove !== 0 ? {
              transform: `translateX(${bannerMove}px)`,
              transition: 'all 400ms ease-out',
            } : {}}
          />
        </div>
        <button
          type="button"
          className="button-navigation-banner"
          onClick={() => changeBanner('right')}
        >
          <img
            className="img"
            src="./img/icons/arrowright.svg"
            alt="#move-left"
          />
        </button>
      </div>

      <div className="banner-icons home-page-container__banner-icons">
        <img
          className={ActiveSlideClassName(currentBanner, [0, 1, 2], bannerMove)}
          src="./img/icons/minus.svg"
          alt="#minus"
        />
        <img
          className={ActiveSlideClassName(currentBanner, [1, 2, 0], bannerMove)}
          src="./img/icons/minus.svg"
          alt="#minus"
        />
        <img
          className={ActiveSlideClassName(currentBanner, [2, 0, 1], bannerMove)}
          src="./img/icons/minus.svg"
          alt="#minus"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="home-page-container__hot-prices"
          data-cy="cardsContainer"
        >
          <ProductSlider
            products={hotPricesProducts}
            title="Hot prices"
            handleSetCarts={handleSetCarts}
            carts={carts}
            handleSetFavorites={handleSetFavorites}
            favorites={favorites}
          />
        </div>
      )}
      <div
        className="category-container home-page-container__category-container"
      >
        <h1 className="title home-page-container__title">Shop by category</h1>

        <div className="categories-images categories-images__categories-link">
          <NavLink
            to="/phones"
            data-cy="categoryLinksContainer"
            className="category-container categories-images__category-container"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <div className="categories-image-container">
              <img
                className="categories-image"
                src="./img/category-phones.png"
                alt="#phones"
              />
            </div>

            <h2
              className="categories-link categories-images__categories-link"

            >
              Mobile phones
            </h2>
            <p className="models-number">
              {`${products.filter(product => product.type === Type.phone).length} models`}
            </p>
          </NavLink>

          <NavLink
            to="/tablets"
            data-cy="categoryLinksContainer"
            className="category-container categories-images__category-container"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <div className="categories-image-container
             categories-image-container--tablets"
            >
              <img
                className="categories-image--tablets"
                src="./img/category-tablets.png"
                alt="#tablets"
              />
            </div>
            <h2
              className="categories-link categories-images__categories-link"
            >
              Tablets
            </h2>
            <p className="models-number">
              {`${products.filter(product => product.type === Type.tablet).length} models`}
            </p>
          </NavLink>

          <NavLink
            to="/accessories"
            data-cy="categoryLinksContainer"
            className="category-container categories-images__category-container"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <div className="categories-image-container
              categories-image-container--accessories"
            >
              <img
                className="categories-image--accessories"
                src="./img/category-accessories.png"
                alt="#accessories"
              />
            </div>
            <h2
              className="categories-link categories-images__categories-link"
            >
              Accessories
            </h2>
            <p className="models-number">
              {`${products.filter(product => product.type === Type.accessory).length} models`}
            </p>
          </NavLink>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="home-page-container__new-models">
          <ProductSlider
            products={newModelsProducts}
            title="Brand news models"
            handleSetCarts={handleSetCarts}
            carts={carts}
            handleSetFavorites={handleSetFavorites}
            favorites={favorites}
          />
        </div>
      )}
    </div>
  );
};
