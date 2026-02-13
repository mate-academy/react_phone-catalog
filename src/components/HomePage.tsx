import React, { useState, useEffect } from 'react';
import './HomePage.scss';
import phones from '../../public/api/phones.json';
import accessories from '../../public/api/accessories.json';
import tablets from '../../public/api/tablets.json';
import banner1 from '../img/Banner.png';
import banner2 from '../img/BannerImage2.png';
import banner3 from '../img/BannerImage3.png';
import phonePro from '../img/phone-pro.png';
import tabletsImg from '../img/tablets.png';
import phonesCases from '../img/phones-cases.png';
import classNames from 'classnames';
import { BrandNewModelsSlider } from './BrandNewModelsSlider';
import { Link, useNavigate } from 'react-router-dom';

const phonesForSlider = [...phones];

const bannerImages = [banner1, banner2, banner3];
const hotModels = [...phonesForSlider.slice(0, 12)];
const newModels = [...phonesForSlider.reverse().slice(0, 16)];

export const HomePage = () => {
  // Состояние для баннера
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Автоматическое переключение баннера
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => {
        return prevIndex < bannerImages.length - 1 ? prevIndex + 1 : 0;
      });
    }, 32323000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>

      {/* Слайдер баннера */}
      <button
        className="banner__button banner__button-left"
        onClick={() =>
          setCurrentBannerIndex(index => {
            return index > 0 ? index - 1 : bannerImages.length - 1;
          })
        }
      >{`<`}</button>
      <img
        src={bannerImages[currentBannerIndex]}
        alt="banner"
        className="banner-image"
        onClick={() => navigate('/product/apple-iphone-14-pro-1tb-spaceblack')}
      />
      <button
        className="banner__button banner__button-right"
        onClick={() =>
          setCurrentBannerIndex(index => {
            return index < bannerImages.length - 1 ? index + 1 : 0;
          })
        }
      >{`>`}</button>
      <div className="marker-container">
        <div
          onClick={() => setCurrentBannerIndex(0)}
          className={classNames('viseble-banner-marker', {
            'viseble-banner-marker__active': currentBannerIndex === 0,
          })}
        ></div>
        <div
          onClick={() => setCurrentBannerIndex(1)}
          className={classNames('viseble-banner-marker', {
            'viseble-banner-marker__active': currentBannerIndex === 1,
          })}
        ></div>
        <div
          onClick={() => setCurrentBannerIndex(2)}
          className={classNames('viseble-banner-marker', {
            'viseble-banner-marker__active': currentBannerIndex === 2,
          })}
        ></div>
      </div>

      {/* Слайдер "Brand new models" */}

      <BrandNewModelsSlider phones={newModels} name={'Brand new models'} />

      {/* Категории товаров */}
      <div className="categories">
        <h2 className="slider-h2">Shop By category</h2>
        <div className="categories-content">
          <div className="categories-content-card">
            <Link to={'/phones'}>
              <img src={phonePro} alt="Mobile phones" />
            </Link>
            <div className="categories-content-card__h3">Mobile phones</div>
            <div className="categories-content-card__small">{`${phones.length} models`}</div>
          </div>
          <div className="categories-content-card">
            <Link to={'/tablets'}>
              <img src={tabletsImg} alt="Tablets" />
            </Link>
            <div className="categories-content-card__h3">Tablets</div>
            <div className="categories-content-card__small">{`${tablets.length} models`}</div>
          </div>
          <div className="categories-content-card">
            <Link to={'/accessories'}>
              <img src={phonesCases} alt="Accessories" />
            </Link>
            <div className="categories-content-card__h3">Accessories</div>
            <div className="categories-content-card__small">
              {`${accessories.length} models`}
            </div>
          </div>
        </div>
      </div>

      {/* Слайдер "Hot prices" (можно повторить логику, как для "Brand new models") */}
      <BrandNewModelsSlider phones={hotModels} name={'Hot prices'} />
    </>
  );
};
