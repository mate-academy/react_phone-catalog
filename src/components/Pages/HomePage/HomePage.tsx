/* eslint-disable @typescript-eslint/indent */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Slider } from '../../slider';
import { Product, ProductCategory, SliderTitle } from '../../../types/types';
import { ScrollToTop } from '../../../utils/scrollWindowTop';
import { getProducts } from '../../../api';
import { getHotPricesProducts } from '../../../utils/getHotPricesProducts';
import { getBrandNewProducts } from '../../../utils/getBrandNewProducts';
import { getProductsByCategory } from '../../../utils/getProductsByCategory';
import { images } from '../../../images';

import './HomePage.scss';
import { SliderSkeleton } from '../../skeletons/SliderSkeleton';

export const HomePage: React.FC = () => {
  const pageSizeRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [buttonActive, setButtonActive] = useState(0);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const [buttonHeight, setButtonHeight] = useState(0);

  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [bannerItems, setBannerItems] = useState([
    images.bannerPhoneDesktop,
    images.bannerTabletDesktop,
    images.bannerAccessoriesDesktop,
  ]);

  useEffect(() => {
    document.title = `Nice Gadgets (UA)`;
  }, []);

  useEffect(() => {
    const updateItemWidth = () => {
      const item = document.querySelector('.welcome__banner--list-item');

      if (item) {
        setItemWidth(item.clientWidth);
        setCurrentTranslate(-itemWidth * buttonActive);
      }
    };

    const updateImg = () => {
      const pageSize = pageSizeRef.current;

      if (pageSize) {
        setBannerItems(
          pageSize.clientWidth > 640
            ? [
                images.bannerPhoneDesktop,
                images.bannerTabletDesktop,
                images.bannerAccessoriesDesktop,
              ]
            : [
                images.bannerPhonePhone,
                images.bannerTabletPhone,
                images.bannerAccessoriesPhone,
              ],
        );
      }
    };

    const updateButtonHeight = () => {
      const imageSize = bannerImgRef.current;

      if (imageSize) {
        setButtonHeight(imageSize.clientHeight);
      }
    };

    const timer = setInterval(() => {
      if (currentTranslate > itemWidth * -2) {
        setCurrentTranslate(currentTranslate - itemWidth);
        setButtonActive(val => val + 1);
      } else {
        setCurrentTranslate(0);
        setButtonActive(0);
      }
    }, 4500);

    updateItemWidth();
    updateImg();
    updateButtonHeight();

    window.addEventListener('resize', updateItemWidth);
    window.addEventListener('resize', updateImg);
    window.addEventListener('resize', updateButtonHeight);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', updateItemWidth);
      window.removeEventListener('resize', updateImg);
      window.removeEventListener('resize', updateButtonHeight);
    };
  }, [buttonActive, currentTranslate, itemWidth]);

  useEffect(() => {
    setIsLoader(true);

    getProducts()
      .then(products => {
        setPhones(getProductsByCategory(products, ProductCategory.Phones));
        setTablets(getProductsByCategory(products, ProductCategory.Tablets));
        setAccessories(
          getProductsByCategory(products, ProductCategory.Accessories),
        );
        setHotPricesProducts(getHotPricesProducts(products));
        setBrandNewProducts(getBrandNewProducts(products));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  const handleNextClick = () => {
    if (currentTranslate > itemWidth * -2) {
      setCurrentTranslate(currentTranslate - itemWidth);
      setButtonActive(val => val + 1);
    } else {
      setButtonActive(0);
    }
  };

  const handlePrevClick = () => {
    if (currentTranslate < 0) {
      setCurrentTranslate(currentTranslate + itemWidth);
      setButtonActive(val => val - 1);
    } else {
      setButtonActive(2);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  return (
    <main className="homePage" {...handlers}>
      <section ref={pageSizeRef} className="homePage__welcome welcome">
        <div className="container">
          <h1>Welcome to Nice Gadgets store!</h1>
        </div>

        <div className="welcome__banner">
          <button
            className="
                button
                welcome__banner--button
                welcome__banner--button-prev
              "
            onClick={handlePrevClick}
            style={{ height: buttonHeight }}
          >
            <img
              src={images.sliderButton}
              alt="bannerButton"
              className="
                    welcome__banner--leftImg
                    welcome__banner--button-img
                  "
            />
          </button>

          <ul className="welcome__banner--list">
            {bannerItems.map(img => (
              <li
                key={img}
                className="welcome__banner--list-item"
                style={{ transform: `translateX(${currentTranslate}px)` }}
              >
                <img
                  src={img}
                  alt="bannerImg"
                  className="welcome__banner--list-img selection-off"
                  ref={bannerImgRef}
                />
              </li>
            ))}
          </ul>

          <button
            className="
                button
                welcome__banner--button
                welcome__banner--button-next
              "
            onClick={handleNextClick}
            style={{ height: buttonHeight }}
          >
            <img
              src={images.sliderButton}
              alt="bannerButton"
              className="welcome__banner--button-img"
            />
          </button>
        </div>

        <div className="welcome__banner-bottom">
          {[0, 1, 2].map(buttonInd => (
            <button
              key={buttonInd}
              className={classNames('welcome__banner-bottom--buttons', {
                'welcome__banner-bottom--buttons-active':
                  buttonActive === buttonInd,
              })}
              onClick={() => {
                setCurrentTranslate(-itemWidth * buttonInd);
                setButtonActive(buttonInd);
              }}
            />
          ))}
        </div>
      </section>

      <section className="homePage__new">
        {isError || isLoader ? (
          <SliderSkeleton />
        ) : (
          <Slider title={SliderTitle.NewModels} products={brandNewProducts} />
        )}
      </section>

      <section className="homePage__category category">
        <div className="container">
          <h2>Shop by category</h2>
          <div className="category__block">
            <NavLink
              onClick={ScrollToTop}
              to="/phones"
              className="category__block--phones"
            >
              <div
                className="
                  category__block--container
                  category__block--container-phone
                "
              >
                <img
                  src={images.categoryPhones}
                  alt="phones"
                  className="category__block--photo"
                />
              </div>
              <div>
                <div className="category__block--title">
                  <h4>Mobile phones</h4>
                </div>
                <p className="category__itemsCounter">{`${phones.length} models`}</p>
              </div>
            </NavLink>

            <NavLink
              onClick={ScrollToTop}
              to="/phones"
              className="category__block--tablets"
            >
              <div
                className="
                  category__block--container
                  category__block--container-tablet
                "
              >
                <img
                  src={images.categoryTablets}
                  alt="tablets"
                  className="category__block--photo"
                />
              </div>
              <div>
                <div className="category__block--title">
                  <h4>Tablets</h4>
                </div>
                <p className="category__itemsCounter">{`${tablets.length} models`}</p>
              </div>
            </NavLink>

            <NavLink
              onClick={ScrollToTop}
              to="/phones"
              className="category__block--accessories"
            >
              <div
                className="
                  category__block--container
                  category__block--container-accessory
                "
              >
                <img
                  src={images.categoryAccessories}
                  alt="accessories"
                  className="category__block--photo"
                />
              </div>
              <div>
                <div className="category__block--title">
                  <h4>Accessories</h4>
                </div>
                <p className="category__itemsCounter">{`${accessories.length} models`}</p>
              </div>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="homePage__prices">
        {isError || isLoader ? (
          <SliderSkeleton />
        ) : (
          <Slider title={SliderTitle.HotPrices} products={hotPricesProducts} />
        )}
      </section>
    </main>
  );
};
