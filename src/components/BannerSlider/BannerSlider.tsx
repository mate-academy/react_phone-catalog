import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ICONS } from '../../icons';
import './BannerSlider.scss';
import { ButtonSlider } from '../ButtonSlider/ButtonSlider';
import '../ButtonSlider/ButtonSlider.scss';

const BANNERS = [
  {
    id: 1,
    address: ICONS.phonesBanner,
    title: 'Phones banner',
  },

  {
    id: 2,
    address: ICONS.accessoriesBanner,
    title: 'Accessories banner',
  },

  {
    id: 3,
    address: ICONS.tabletsBanner,
    title: 'Tablets banner',
  },
];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastVisibleImage = BANNERS.length - 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex(
      currentIndex === lastVisibleImage ? 0 : (currentImg) => currentImg + 1,
    );
  }, [currentIndex, lastVisibleImage]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0
      ? lastVisibleImage
      : currentImage => currentImage - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, nextSlide]);

  return (
    <section className="banner-slider">
      <div className="banner-slider__container">
        <div className="button__left">
          <ButtonSlider moveSlide={prevSlide} direction="prev" height={400} />
        </div>

        <div className="banner-slider__images">
          <ul className="banner-slider__images-list">
            {BANNERS.map((banner, index) => (
              <li
                key={banner.id}
                className="banner-slider__images-list-item"
                style={{
                  opacity: index === currentIndex ? 1 : 0,
                }}
              >
                <img
                  src={banner.address}
                  alt={banner.title}
                  className="banner-slider__images-list-image"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="button__right">
          <ButtonSlider moveSlide={nextSlide} direction="next" height={400} />
        </div>
      </div>

      <div className="banner-slider__dots">
        {BANNERS.map((banner, index) => (
          <button
            type="button"
            aria-label="dots"
            key={banner.id}
            className={classNames('banner-slider__dots-item', {
              'banner-slider__dots-item--active': currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
