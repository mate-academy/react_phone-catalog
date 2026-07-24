import banner1 from '../../../public/img/banner-accessories.png';
import banner2 from '../../../public/img/banner-phones.png';
import banner3 from '../../../public/img/banner-tablets.png';
import arrow from '../../../public/icons/Arrow.svg';
import rectangle from '../../../public/icons/Rectangle.svg';
import style from './Slider.module.scss';
import { useEffect, useState } from 'react';

const banners = [
  { src: banner1, alt: 'Accessories', color: '#973D5F' },
  { src: banner2, alt: 'Phones', color: '#ede07a' },
  { src: banner3, alt: 'Tablets', color: '#73c2e7' },
];

export const Slider = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const showPreviousBanner = () => {
    setCurrentBanner(current =>
      current === 0 ? banners.length - 1 : current - 1,
    );
  };

  const showNextBanner = () => {
    setCurrentBanner(current =>
      current === banners.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      showNextBanner();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [currentBanner]);

  return (
    <div className={style.slider__box}>
      <div className={style.slider}>
        <button className={style.slider__button} onClick={showPreviousBanner}>
          <img src={arrow} className={style.arrow__left} />
        </button>
        <div
          style={{
            backgroundColor: banners[currentBanner].color,
          }}
        >
          <img
            src={banners[currentBanner].src}
            alt={banners[currentBanner].alt}
            className={style.slider__image}
          />
        </div>
        <button className={style.slider__button} onClick={showNextBanner}>
          <img src={arrow} className={style.arrow__right} />
        </button>
      </div>
      <div className={style.rectangles}>
        {banners.map((banner, index) => (
          <img
            key={banner.src}
            src={rectangle}
            alt={`select-banner${index}`}
            className={currentBanner !== index ? style.notselected : undefined}
            onClick={() => setCurrentBanner(index)}
          />
        ))}
      </div>
    </div>
  );
};
