import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ProductSlider } from '../ProductSlider/ProductSlider';

import leftArrow from '../../assets/l_arrow.svg';
import rightArrow from '../../assets/r_arrow.svg';
import img1 from '../../assets/images/banner/banner-phones.png';
import img2 from '../../assets/images/banner/banner-accessories.png';
import img3 from '../../assets/images/banner/banner-tablets.png';

import './Banner.scss';

const bannerImages = [img1, img2, img3];

export const Banner = () => {
  const [page, setPage] = useState(1);

  const handleClick = (operation: 1 | -1) => {
    setPage(prevPage => {
      if (operation === 1) {
        return prevPage + 1 > 2 ? 0 : prevPage + 1;
      }

      return prevPage - 1 < 0 ? 2 : prevPage - 1;
    });
  };

  useEffect(() => {
    const intId = setInterval(() => handleClick(1), 5000);

    return () => clearInterval(intId);
  }, []);

  return (
    <section className="banner">
      <div className="banner__wrapper">
        <button
          type="button"
          className="banner__button"
          onClick={() => handleClick(-1)}
        >
          <img src={leftArrow} alt="Banners left arrow button" />
        </button>
        <div className="banner__slider">
          <ProductSlider page={page}>
            {bannerImages.map((image) => (
              <img
                key={image}
                className="banner__image"
                src={image}
                alt="Banner element"
              />
            ))}
          </ProductSlider>
        </div>
        <button
          type="button"
          className="banner__button"
          onClick={() => handleClick(1)}
        >
          <img src={rightArrow} alt="Banners left arrow button" />
        </button>
      </div>

      <div className="banner__indicator-container">
        {bannerImages.map((img, i) => (
          <div
            key={img}
            className={classNames('banner__indicator', {
              'banner__indicator--active': page === i,
            })}
          />
        ))}
      </div>

    </section>
  );
};
