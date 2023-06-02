import { useState } from 'react';

import { ProductSlider } from '../ProductSlider/ProductSlider';
import leftArrow from '../../assets/banner/l_arrow.svg';
import rightArrow from '../../assets/banner/r_arrow.svg';

import './Banner.scss';

const bannerImages = [
  './_new/img/banner-phones.png',
  './_new/img/banner-accessories.png',
  './_new/img/banner-tablets.png',
];

export const Banner = () => {
  const [page, setState] = useState(1);

  return (
    <section className="banner">
      <button
        type="button"
        className="banner__button"
        onClick={() => setState(page - 1 < 0 ? 2 : page - 1)}
      >
        <img src={leftArrow} alt="Banners left arrow button" />
      </button>

      <div className="banner__slider">
        <ProductSlider page={page}>
          {bannerImages.map(image => (
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
        onClick={() => setState(page + 1 > 2 ? 0 : page + 1)}
      >
        <img src={rightArrow} alt="Banners left arrow button" />
      </button>
    </section>
  );
};
