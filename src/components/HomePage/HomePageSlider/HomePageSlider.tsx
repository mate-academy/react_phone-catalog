import './HomePageSlider.scss';
import { useEffect, useState } from 'react';

export const HomePageSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const banners = ['img/1.jpg', 'img/2.jpg', 'img/Banner3.png'];

  const next = () => {
    setActiveSlide(i => (i + 1 < banners.length ? i + 1 : 0));
  };

  const prev = () => {
    setActiveSlide(i => (i - 1 >= 0 ? i - 1 : banners.length - 1));
  };

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide(i => (i + 1 < banners.length ? i + 1 : 0));
    }, 5000);

    return () => clearInterval(id);
  }, [banners.length]);

  return (
    <div className="slider">
      <button className="slider__arrow slider__arrow--left" onClick={prev}>
        ‹
      </button>

      <div className="slider__content">
        <img
          src={banners[activeSlide]}
          alt="banner"
          className="slider__image"
        />
      </div>

      <button className="slider__arrow slider__arrow--right" onClick={next}>
        ›
      </button>

      <div className="slider__dots">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`slider__dot ${index === activeSlide ? 'is-active' : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
