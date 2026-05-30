import './Header.scss';
import { Outlet } from 'react-router-dom';
import { Slide } from '../Slide';
import { useEffect, useState } from 'react';
import { slides } from '../../data/slidesData';
import classNames from 'classnames';

export const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content-text">
          <h1 className="text text__title">Product Catalog</h1>
        </div>

        <button
          className="header__content-button header__content-button--left"
          onClick={handlePrevSlide}
        ></button>

        <div className="header__content-slider">
          <div
            className="header__content-slider-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => {
              const { id, title, description, image } = slide;

              return (
                <Slide
                  key={id}
                  title={title}
                  description={description}
                  image={image}
                  isActive={index === currentSlide}
                />
              );
            })}
          </div>
        </div>

        <button
          className="header__content-button header__content-button--right"
          onClick={handleNextSlide}
        ></button>

        <div className="header__content-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={classNames('header__content-dots--dot', {
                'header__content-dots--dot-active': index === currentSlide,
              })}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>

      <Outlet />
    </header>
  );
};
