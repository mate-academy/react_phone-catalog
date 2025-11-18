import '../_variables.scss';
import './Main.scss';
import banner from '../../images/image-16.png';
import bannerTablet from '../../images/banner-tablet.png';
import buttonSliderRight from '../../images/icons/button-right.png';
import buttonSliderLeft from '../../images/icons/button-left.png';
import phonesImage from '../../images/phones.png';
import tabletsImage from '../../images/tablets.png';
import accessoriesImage from '../../images/accessories.png';
import React, { useContext } from 'react';
import { DevicesContext, DevicesContextType } from '../../DevicesContext';
import { Device } from '../../types/Device';
import { ProductCard } from '../ProductCard/ProductCard';
// import { Link } from 'react-router-dom';

export const Main: React.FC = () => {
  const context = useContext<DevicesContextType | undefined>(DevicesContext);

  if (!context) {
    return null;
  }

  const { tablets, accessories, phones, newModelsPhones, hotPrices, isMobile } =
    context;

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header__title">
          <h1 className="main__header__title__content">
            Welcome to Nice Gadgets store!
          </h1>
        </div>

        {isMobile ? (
          <div className={isMobile ? 'mobile-header' : 'tablet-header'}>
            <div className="main__header__banner">
              <img src={banner} className="main__header__banner__content" />
            </div>

            <div className="main__header__dots">
              <div className="main__header__dots__dot">
                <div className="main__header__dots__dot__content active"></div>
              </div>

              <div className="main__header__dots__dot">
                <div className="main__header__dots__dot__content"></div>
              </div>

              <div className="main__header__dots__dot">
                <div className="main__header__dots__dot__content"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className={isMobile ? 'mobile-header' : 'tablet-header'}>
            <div className="main__header__banner-tablet">
              <div className="main__header__banner-tablet__banner-slider-left">
                <img src={buttonSliderLeft} className="banner-slide" />
              </div>

              <div className="main__header__banner-tablet__image">
                <img
                  src={bannerTablet}
                  className="main__header__banner__content"
                />
              </div>

              <div className="main__header__banner-tablet__banner-slider-right">
                <img src={buttonSliderRight} className="banner-slide" />
              </div>
            </div>

            <div className="main__header__dots">
              <div className="main__header__dots__dot">
                <div className="main__header__dots__dot__content active"></div>
              </div>

              <div className="main__header__dots__dot">
                <div className="main__header__dots__dot__content"></div>
              </div>

              <div className="main__header__dots__dot">
                <div className="main__header__dots__dot__content"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="main__section">
        <section className="new-models">
          <div className="new-models__container">
            <div className="new-models__text">Brand new models</div>

            <div className="new-models__buttons-slider">
              <div className="new-models__buttons-slider__left">
                <img src={buttonSliderLeft} className="buttons-slider"></img>
              </div>

              <div className="new-models__buttons-slider__right">
                <img src={buttonSliderRight} className="buttons-slider"></img>
              </div>
            </div>
          </div>

          <div className="new-models__content">
            {newModelsPhones.map(model => (
              <div className="productCard-content" key={model.id}>
                <ProductCard model={model} />
              </div>
            ))}
          </div>
        </section>

        <section className="categories">
          <div className="categories__title">Shop by category</div>

          <div className="categories__container">
            <div className="categories__phones">
              <div className="categories__phones__image">
                <img
                  src={phonesImage}
                  alt="phones"
                  className="category-image"
                />
              </div>

              <div className="categories__info">
                <div className="category-name">Mobile phones</div>

                <div className="quantity-of-goods">
                  {`${phones.length} models`}
                </div>
              </div>
            </div>

            <div className="categories__tablets">
              <div className="categories__tablets__image">
                <img
                  src={tabletsImage}
                  alt="tablets"
                  className="category-image"
                />
              </div>

              <div className="categories__info">
                <div className="category-name">Tablets</div>

                <div className="quantity-of-goods">
                  {`${tablets.length} models`}
                </div>
              </div>
            </div>

            <div className="categories__accessories">
              <div className="categoriesy__accessories__image">
                <img
                  src={accessoriesImage}
                  alt="accessories"
                  className="category-image"
                />
              </div>

              <div className="categories__info">
                <div className="category-name">Accessories</div>

                <div className="quantity-of-goods">
                  {`${accessories.length} models`}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hot-prices">
          <div className="hot-prices__container">
            <div className="hot-prices__text">Hot prices</div>

            <div className="hot-prices__buttons-slider">
              <div className="hot-prices__buttons-slider__left">
                <img src={buttonSliderLeft} className="buttons-slider"></img>
              </div>

              <div className="hot-prices__buttons-slider__right">
                <img src={buttonSliderRight} className="buttons-slider"></img>
              </div>
            </div>
          </div>

          <div className="hot-prices__content">
            {hotPrices.map((model: Device) => (
              <div className="productCard-content" key={model.id}>
                <ProductCard model={model} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
