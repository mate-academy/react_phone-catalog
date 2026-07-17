import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './PicturesSlider.scss';
import { IconButton } from '../../../shared/components/Buttons/IconButton';
import { useNavigate } from 'react-router-dom';
import { AllAvailablePages } from '../../../../types/allAvailablePages';
import { Banner } from './components';

type Props = {
  className: string;
};

type Slides = {
  desktopImg: string;
  mobileImg: string;
  id: number;
};

const slides: Slides[] = [
  {
    mobileImg: 'img/pictures-slider/mobile/banner-slider-mobile__first.png',
    desktopImg: 'img/pictures-slider/desktop/banner-slider-desktop__first.jpg',
    id: 0,
  },
  {
    mobileImg: 'img/pictures-slider/mobile/banner-slider-mobile__second.jpg',
    desktopImg: 'img/pictures-slider/desktop/banner-slider-desktop__second.jpg',
    id: 1,
  },
  {
    mobileImg: 'img/pictures-slider/mobile/banner-slider-mobile__third.jpg',
    desktopImg: 'img/pictures-slider/desktop/banner-slider-desktop__third.jpg',
    id: 2,
  },
];

export const PicturesSlider: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const openPage = (path: AllAvailablePages): void => {
    navigate(path);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  //#region track movement functions

  const nextSlide = useCallback(() => {
    setCurrentSlide(current => {
      if (current === slides.length - 1) {
        return 0;
      } else {
        return current + 1;
      }
    });
  }, []);

  const pastSlide = useCallback(() => {
    setCurrentSlide(current => {
      if (current === 0) {
        return slides.length - 1;
      } else {
        return current - 1;
      }
    });
  }, []);

  //#endregion

  useEffect(() => {
    const intervalNext = setInterval(() => nextSlide(), 5000);

    return () => clearInterval(intervalNext);
  }, [currentSlide, nextSlide]);

  //#region touches

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const differenceBetweenTouches = touchEndX.current - touchStartX.current;

    if (differenceBetweenTouches > 50) {
      pastSlide();
    }

    if (differenceBetweenTouches < -50) {
      nextSlide();
    }
  };

  //#endregion

  return (
    <div
      className={`pictures-slider ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="pictures-slider__body">
        <IconButton
          className="pictures-slider__button pictures-slider__button-left"
          onClick={pastSlide}
          name="arrow-left"
        />
        <div className="pictures-slider__window">
          <div
            className="pictures-slider__track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map(slide => (
              <picture key={slide.id} className="pictures-slider__picture">
                <source media="(min-width: 640px)" srcSet={slide.desktopImg} />
                <img
                  src={slide.mobileImg}
                  alt="pictures-slider"
                  className="pictures-slider__img"
                />
              </picture>
            ))}
          </div>
          <Banner
            className="pictures-slider__banner"
            openPage={val => openPage(val)}
          />
        </div>
        <IconButton
          className="pictures-slider__button pictures-slider__button--right"
          onClick={nextSlide}
          name="arrow-right"
        />
      </div>
      <div className="pictures-slider__rectangles">
        {slides.map(slide => (
          <button
            key={slide.id}
            className={classNames('pictures-slider__rectangle', {
              'pictures-slider__rectangle--is-active':
                currentSlide === slide.id,
            })}
            onClick={() => setCurrentSlide(slide.id)}
          />
        ))}
      </div>
    </div>
  );
};
