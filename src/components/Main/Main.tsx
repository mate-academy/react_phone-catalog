import '../_variables.scss';
import './Main.scss';
import banner1 from '../../images/image-16.png';
import banner2 from '../../images/banner2.png';
import banner3 from '../../images/banner3.png';
import bannerTablet1 from '../../images/banner-tablet.png';
import bannerTablet2 from '../../images/banner-tablet2.png';
import bannerTablet3 from '../../images/banner-tablet3.png';
import buttonSliderRight from '../../images/icons/button-right.png';
import buttonSliderLeft from '../../images/icons/button-left.png';
import phonesImage from '../../images/phones.png';
import tabletsImage from '../../images/tablets.png';
import accessoriesImage from '../../images/accessories.png';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DevicesContext, DevicesContextType } from '../../DevicesContext';
import { Device } from '../../types/Device';
import { ProductCard } from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const Main: React.FC = () => {
  const context = useContext<DevicesContextType | undefined>(DevicesContext);
  const cardRef = useRef<HTMLDivElement>(null);

  const [indexForNewModelsPhones, setIndexForNewModelsPhones] = useState(0);
  const [indexForHotPrices, seIndexForHotPrices] = useState(0);
  const [shiftForNewModelsPhones, setShiftForNewModelsPhones] = useState(0);
  const [shiftForHotPrices, setShiftForHotPrices] = useState(0);

  const banners1 = [banner1, banner2, banner3];
  const banners2 = [bannerTablet1, bannerTablet2, bannerTablet3];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setShiftForNewModelsPhones(
        (cardRef.current.offsetWidth + 16) * indexForNewModelsPhones,
      );

      setShiftForHotPrices(
        (cardRef.current.offsetWidth + 16) * indexForHotPrices,
      );
    }
  }, [indexForNewModelsPhones, indexForHotPrices]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { tablets, accessories, phones, newModelsPhones, hotPrices, isMobile } =
    context;

  const hadleShift = (n: number, sectionName: string) => {
    if (n > 0) {
      if (
        sectionName === 'new models' &&
        indexForNewModelsPhones < newModelsPhones.length - 1
      ) {
        setIndexForNewModelsPhones(indexForNewModelsPhones + 1);
      }

      if (
        sectionName === 'hot prices' &&
        indexForHotPrices < hotPrices.length - 1
      ) {
        seIndexForHotPrices(indexForHotPrices + 1);
      }
    }

    if (n < 0) {
      if (sectionName === 'new models' && indexForNewModelsPhones > 0) {
        setIndexForNewModelsPhones(indexForNewModelsPhones - 1);
      }

      if (sectionName === 'hot prices' && indexForHotPrices > 0) {
        seIndexForHotPrices(indexForHotPrices - 1);
      }
    }

    return;
  };

  const handleChangingTheBannerImage = (direction: string) => {
    if (currentBanner < 2 && direction === 'right') {
      return setCurrentBanner(currentBanner + 1);
    }

    if (currentBanner > 0 && direction === 'left') {
      return setCurrentBanner(currentBanner - 1);
    }
  };

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
              <img
                src={banners1[currentBanner]}
                className="main__header__banner__content"
              />
            </div>

            <div className="main__header__dots">
              {banners1.map((_, ind) => (
                <div className="main__header__dots__dot" key={ind}>
                  <div
                    className={classNames('main__header__dots__dot__content', {
                      active: ind === currentBanner,
                    })}
                    onClick={() => setCurrentBanner(ind)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={isMobile ? 'mobile-header' : 'tablet-header'}>
            <div className="main__header__banner-tablet">
              <button
                className="main__header__banner-tablet__banner-slider-left"
                onClick={() => handleChangingTheBannerImage('left')}
                disabled={currentBanner === 0}
              >
                <img src={buttonSliderLeft} className="banner-slide" />
              </button>

              <div className="main__header__banner-tablet__image">
                <img
                  src={banners2[currentBanner]}
                  className="main__header__banner__content"
                />
              </div>

              <button
                className="main__header__banner-tablet__banner-slider-right"
                onClick={() => handleChangingTheBannerImage('right')}
                disabled={currentBanner === 2}
              >
                <img src={buttonSliderRight} className="banner-slide" />
              </button>
            </div>

            <div className="main__header__dots">
              {banners2.map((_, ind) => (
                <div className="main__header__dots__dot" key={ind}>
                  <div
                    className={classNames('main__header__dots__dot__content', {
                      active: ind === currentBanner,
                    })}
                    onClick={() => setCurrentBanner(ind)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="main__section">
        <section className="new-models">
          <div className="new-models__container">
            <div className="new-models__text">Brand new models</div>

            <div className="new-models__buttons-slider">
              <button
                className="new-models__buttons-slider__left"
                onClick={() => hadleShift(-1, 'new models')}
                disabled={indexForNewModelsPhones === 0}
              >
                <img src={buttonSliderLeft} className="buttons-slider"></img>
              </button>

              <button
                className="new-models__buttons-slider__right"
                onClick={() => hadleShift(1, 'new models')}
                disabled={indexForNewModelsPhones > newModelsPhones.length - 2}
              >
                <img src={buttonSliderRight} className="buttons-slider"></img>
              </button>
            </div>
          </div>

          <div className="new-models__content">
            {newModelsPhones.map(model => (
              <div
                ref={cardRef}
                className="productCard-content slider-track"
                style={{
                  transform: `translateX(-${shiftForNewModelsPhones}px)`,
                }}
                key={model.id}
              >
                <ProductCard model={model} brandNewModels={true} />
              </div>
            ))}
          </div>
        </section>

        <section className="categories">
          <div className="categories__title">Shop by category</div>

          <div className="categories__container">
            <div className="categories__phones">
              <Link to={'/phones'} className="categories__phones__image">
                <img
                  src={phonesImage}
                  alt="phones"
                  className="category-image"
                />
              </Link>

              <div className="categories__info">
                <div className="category-name">Mobile phones</div>

                <div className="quantity-of-goods">
                  {`${phones.length} models`}
                </div>
              </div>
            </div>

            <div className="categories__tablets">
              <Link to={'/tablets'} className="categories__tablets__image">
                <img
                  src={tabletsImage}
                  alt="tablets"
                  className="category-image"
                />
              </Link>

              <div className="categories__info">
                <div className="category-name">Tablets</div>

                <div className="quantity-of-goods">
                  {`${tablets.length} models`}
                </div>
              </div>
            </div>

            <div className="categories__accessories">
              <Link
                to={'/accessories'}
                className="categoriesy__accessories__image"
              >
                <img
                  src={accessoriesImage}
                  alt="accessories"
                  className="category-image"
                />
              </Link>

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
              <button
                className="hot-prices__buttons-slider__left"
                onClick={() => hadleShift(-1, 'hot prices')}
                disabled={indexForHotPrices === 0}
              >
                <img src={buttonSliderLeft} className="buttons-slider"></img>
              </button>

              <button
                className="hot-prices__buttons-slider__right"
                onClick={() => hadleShift(1, 'hot prices')}
                disabled={indexForHotPrices === hotPrices.length - 1}
              >
                <img src={buttonSliderRight} className="buttons-slider"></img>
              </button>
            </div>
          </div>

          <div className="hot-prices__content">
            {hotPrices.map((model: Device) => (
              <div
                className="productCard-content slider-track"
                style={{
                  transform: `translateX(-${shiftForHotPrices}px)`,
                }}
                key={model.id}
              >
                <ProductCard model={model} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
