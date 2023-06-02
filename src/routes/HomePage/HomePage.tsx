import { useState } from 'react';

import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import leftArrow from '../../assets/banner/l_arrow.svg';
import rightArrow from '../../assets/banner/r_arrow.svg';
import './HomePage.scss';

const bannerImages = [
  '_new/img/banner-phones.png',
  '_new/img/banner-accessories.png',
  '_new/img/banner-tablets.png',
];

export const HomePage = () => {
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

      <ProductSlider page={page} width={1040} height={400}>
        {bannerImages.map(image => (
          <img
            key={image}
            className="banner__image"
            width={1040}
            height={400}
            src={image}
            alt="Banner element"
          />
        ))}
      </ProductSlider>

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
