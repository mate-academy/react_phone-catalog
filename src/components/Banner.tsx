import React, { useState } from 'react';
import './Banner.scss';

const slides = [
  {
    id: 1,
    title: 'Now available in our store! 👌',
    subtitle: 'Be the first!',
    button: 'Order now',
    imageDesktop: '/img/banners/banner-desktop.png',
    imageMobile: '/img/banners/banner-mobile.png',
  },
  {
    id: 2,
    title: 'New arrivals every week ✨',
    subtitle: 'Check what’s trending now!',
    button: 'Shop now',
    imageDesktop: '/img/banners/banner-desktop.png',
    imageMobile: '/img/banners/banner-mobile.png',
  },
  {
    id: 3,
    title: 'Exclusive deals for you 💥',
    subtitle: 'Limited time only!',
    button: 'See offers',
    imageDesktop: '/img/banners/banner-desktop.png',
    imageMobile: '/img/banners/banner-mobile.png',
  },
];

export const Banner: React.FC = () => {
  const [active, setActive] = useState(0);

  const nextSlide = () => setActive(prev => (prev + 1) % slides.length);
  // eslint-disable-next-line max-len
  const prevSlide = () =>
    setActive(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="banner">
      <div className="banner__wrapper">
        <button
          className="banner__arrow banner__arrow--left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <img src="/img/icons/left.svg" alt="Previous" />
        </button>

        <div className="banner__content">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`banner__slide ${index === active ? 'active' : ''}`}
            >
              <picture>
                <source media="(max-width: 639px)" srcSet={slide.imageMobile} />
                <img src={slide.imageDesktop} alt={slide.title} />
              </picture>
            </div>
            /*<div className="banner__image">
                <img src={slide.image} alt={slide.title} />
                {/*<button className="banner__btn">{slide.button}</button >*/
          ))}
        </div>

        <button
          className="banner__arrow banner__arrow--right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <img src="/img/icons/right.svg" alt="Next" />
        </button>
      </div>

      <div className="banner__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`banner__dot ${index === active ? 'active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
