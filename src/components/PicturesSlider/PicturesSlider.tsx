import { useEffect, useState } from 'react';

import { useLanguage } from '../../context/LanguageContext';

import './PicturesSlider.scss';

const slides = [
  {
    image: `${import.meta.env.BASE_URL}img/banner-phones.png`,
    key: 'phones' as const,
    link: '/phones',
  },
  {
    image: `${import.meta.env.BASE_URL}img/banner-tablets.png`,
    key: 'tablets' as const,
    link: '/tablets',
  },
  {
    image: `${import.meta.env.BASE_URL}img/banner-accessories.png`,
    key: 'accessories' as const,
    link: '/accessories',
  },
];

export const PicturesSlider = () => {
  const { t } = useLanguage();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrentSlide(current =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide(current => (current + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="pictures-slider">
      <button
        type="button"
        className="pictures-slider__button pictures-slider__button--prev"
        onClick={previousSlide}
        aria-label={t('prev')}
      >
        &#8249;
      </button>

      <a href={slide.link} className="pictures-slider__slide">
        <img
          src={slide.image}
          alt={t(slide.key)}
          className="pictures-slider__image"
        />
      </a>

      <button
        type="button"
        className="pictures-slider__button pictures-slider__button--next"
        onClick={nextSlide}
        aria-label={t('next')}
      >
        &#8250;
      </button>

      <div className="pictures-slider__dots">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            className={
              index === currentSlide
                ? 'pictures-slider__dot pictures-slider__dot--active'
                : 'pictures-slider__dot'
            }
            onClick={() => setCurrentSlide(index)}
            aria-label={`${t('goTo')} ${t(item.key)}`}
          />
        ))}
      </div>
    </section>
  );
};
