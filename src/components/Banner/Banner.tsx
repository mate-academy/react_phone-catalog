import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  './img/Banner.png',
  './img/banner-tablets.png',
  './img/banner-phones.png',
];

export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="banner" id="banner">
      <div className="banner__content">
        <h2 className="banner__title">Welcome to Nice Gadgets store!</h2>
        <div className="banner__slider">
          <button
            type="button"
            className="banner__button banner__button--left"
            onClick={prevSlide}
            aria-label="Previous slide"
          ></button>
          <div className="banner__frame">
            <Link
              to="product/apple-iphone-14-pro-128gb-spaceblack"
              className="banner__track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Banner ${index + 1}`}
                  className="banner__center"
                />
              ))}
            </Link>
          </div>

          <button
            type="button"
            className="banner__button banner__button--right"
            onClick={nextSlide}
            aria-label="Next slide"
          ></button>
        </div>
        <div className="banner__pagination">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className="banner__dot"
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={
                  index === currentIndex
                    ? './img/buttons/active-banner.svg'
                    : './img/buttons/noactive-banner.svg'
                }
                alt={`Go to slide ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
