import React, { useEffect, useState } from 'react';
import classNames from '../../utils/classNames';
import { IconButton } from '../IconButton';
import './Banner.scss';
import { publicPath } from '../../utils/publicPath';

interface Slide {
  id: string;
  image: string;
  alt: string;
}

const AUTOPLAY_DELAY = 5000;

const slides: Slide[] = [
  { id: 'phones', image: publicPath('/img/banner-phones.png'), alt: 'Phones' },
  {
    id: 'tablets',
    image: publicPath('/img/banner-tablets.png'),
    alt: 'Tablets',
  },
  {
    id: 'accessories',
    image: publicPath('/img/banner-accessories.png'),
    alt: 'Accessories',
  },
];

export const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    const total = slides.length;

    setActiveIndex(((index % total) + total) % total);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="banner">
      <div className="banner__arrow">
        <IconButton
          icon="chevron-left"
          ariaLabel="Previous slide"
          onClick={() => goTo(activeIndex - 1)}
        />
      </div>

      <div className="banner__slide">
        <img
          src={activeSlide.image}
          alt={activeSlide.alt}
          className="banner__image"
        />
      </div>

      <div className="banner__arrow">
        <IconButton
          icon="chevron-right"
          ariaLabel="Next slide"
          onClick={() => goTo(activeIndex + 1)}
        />
      </div>

      <div className="banner__dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={classNames('banner__dot', {
              'banner__dot--active': index === activeIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};
