import { useState, useRef } from 'react';
import './Banners.scss';

export const Banners = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const banners = [
    {
      id: 1,
      mobile: 'img/banner-phones.png',
      tablet: 'img/banner-phones.png',
      desktop: 'img/banner-phones.png',
      alt: 'phones',
    },
    {
      id: 2,
      mobile: 'img/banner-tablets.png',
      tablet: 'img/banner-tablets.png',
      desktop: 'img/banner-tablets.png',
      alt: 'tablets',
    },
    {
      id: 3,
      mobile: 'img/banner-accessories.png',
      tablet: 'img/banner-accessories.png',
      desktop: 'img/banner-accessories.png',
      alt: 'accessories',
    },
  ];

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, clientWidth } = sliderRef.current;

    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) {
      return;
    }

    const targetIndex = Math.max(0, Math.min(index, banners.length - 1));
    const slideWidth = sliderRef.current.clientWidth;

    sliderRef.current.scrollTo({
      left: slideWidth * targetIndex,
      behavior: 'smooth',
    });
    setActiveIndex(targetIndex);
  };

  return (
    <div className="banners">
      <div className="banners__slider-container">
        <button
          type="button"
          className="banners__btn banners__btn--prev"
          onClick={() => scrollToSlide(activeIndex - 1)}
          aria-label="Previous slide"
        />

        <div
          className="banners__slider"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {banners.map(banner => (
            <div key={banner.id} className="banners__slide">
              <picture className="banners__picture">
                <source media="(min-width: 1200px)" srcSet={banner.desktop} />
                <source media="(min-width: 640px)" srcSet={banner.tablet} />
                <img
                  className="banners__slide-photo"
                  src={banner.mobile}
                  alt={banner.alt}
                />
              </picture>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="banners__btn banners__btn--next"
          onClick={() => scrollToSlide(activeIndex + 1)}
          aria-label="Next slide"
        />
      </div>

      <div className="banners__pagination">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`banners__bullet ${
              index === activeIndex ? 'banners__bullet--active' : ''
            }`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
