/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './HomePage.scss';
import { useSwipeable } from 'react-swipeable';
import { Slider } from '../../Slider';
import { Category, PageName, PageTitle, Product } from '../../../types';
import { Images } from '../../../images';
import { Categories } from './Categories/Category';
import { getProducts } from '../../../api/api';
import { Loader } from '../../Loader';
import * as Service from '../../../utils/service';

export const HomePage = () => {
  const page = document.querySelector<HTMLElement>('.page');
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = PageName.Home;
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const [newProductsData, hotPricesProductsData] = await Promise.all([
          getProducts().then(products => Service.getNewProducts(products)),
          getProducts().then(products => Service.getHotProducts(products)),
        ]);

        setNewProducts(newProductsData);
        setHotPricesProducts(hotPricesProductsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [bannerImgs, setBannerImgs] = useState(
    Object.values(Images.Banner.Big),
  );
  const [bannerData, setBannerData] = useState({
    itemWidth: 0,
    translate: 0,
    currentButton: 0,
  });
  const { itemWidth, translate, currentButton } = bannerData;

  useEffect(() => {
    const updateData = () => {
      const item = document.querySelector('.welcome__banner--item');

      if (page && item) {
        setBannerData(currentData => ({
          ...currentData,
          translate: -itemWidth * currentButton,
          itemWidth: item.clientWidth,
        }));
        setBannerImgs(Service.getBunnerImages(page.clientWidth));
      }
    };

    const timer = setInterval(() => {
      setBannerData(currentData => {
        return translate > itemWidth * -2
          ? {
            ...currentData,
            translate: translate * itemWidth,
            currentButton: currentButton + 1,
          }
          : { ...currentData, translate: 0, currentButton: 0 };
      });
    }, 3500);

    updateData();
    window.addEventListener('resize', updateData);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', updateData);
    };
  }, [currentButton, itemWidth, page, translate]);

  const handlePrevClick = () => {
    setBannerData(currentData => {
      return translate < 0
        ? {
          ...currentData,
          translate: translate + itemWidth,
          currentButton: currentButton - 1,
        }
        : { ...currentData, translate: 0, currentButton: 2 };
    });
  };

  const handleNextClick = () => {
    setBannerData(currentData => {
      return translate > itemWidth * -2
        ? {
          ...currentData,
          translate: translate - itemWidth,
          currentButton: currentButton + 1,
        }
        : { ...currentData, currentButton: 0 };
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
    trackMouse: true,
  });

  return (
    <main className="homepage">
      <section className="homepage__welcome welcome">
        <div className="container">
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>

        <div className="welcome__banner selection-off">
          <div className="welcome__banner--button">
            <button
              className="button button__big-slider"
              onClick={handlePrevClick}
            >
              <img
                src={Images.Button.Slider}
                alt="leftButton"
                className="button__image-rotate"
              />
            </button>
          </div>

          <ul className="welcome__banner--list" {...handlers}>
            {bannerImgs.map(img => (
              <li
                key={img}
                className="welcome__banner--item"
                style={{ transform: `translateX(${translate}px)` }}
              >
                <img
                  src={img}
                  alt="bannerImg"
                  className="welcome__banner--image selection-off"
                />
              </li>
            ))}
          </ul>

          <div className="welcome__banner--button">
            <button
              className="button button__big-slider"
              onClick={handleNextClick}
            >
              <img src={Images.Button.Slider} alt="rightButton" />
            </button>
          </div>
        </div>

        <div className="welcome__bunner-bottom container">
          {[0, 1, 2].map(buttonCount => (
            <button
              key={buttonCount}
              className={classNames('welcome__bunner-bottom--button', {
                'welcome__bunner-bottom--button-active':
                  currentButton === buttonCount,
              })}
              onClick={() => {
                setBannerData(currentData => ({
                  ...currentData,
                  translate: -itemWidth * buttonCount,
                  currentButton: buttonCount,
                }));
              }}
            />
          ))}
        </div>
      </section>

      <section className="homepage__new container">
        {isLoading ? (
          <Loader selectedProduct={false} />
        ) : (
          <Slider title={PageTitle.NewModels} products={newProducts} />
        )}
      </section>

      <section className="homepage__categories categories container">
        <h2>Shop by category</h2>

        <article className="categories__block">
          <Categories path={Category.Phones} />
          <Categories path={Category.Tablets} />
          <Categories path={Category.Accessories} />
        </article>
      </section>

      <section className="homepage__prices container">
        {isLoading ? (
          <Loader selectedProduct={false} />
        ) : (
          <Slider title={PageTitle.HotPrices} products={hotPricesProducts} />
        )}
      </section>
    </main>
  );
};
