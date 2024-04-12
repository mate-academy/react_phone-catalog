import './Banner.scss';
import '../../../utils/main.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import React from 'react';

export const Banner = () => {
  const sliderImages = [
    "https://mate-academy.github.io/react_phone-catalog/_new/img/banner-phones.png",
    "https://mate-academy.github.io/react_phone-catalog/_new/img/banner-accessories.png",
    "https://mate-academy.github.io/react_phone-catalog/_new/img/banner-tablets.png",
  ]
  const [slideIndex, setSlideIndex] = useState(1);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);
  
    return () => clearTimeout(timerRef.current);
  });
  

  const nextSlide = () => {
    if(slideIndex !== 3){
        setSlideIndex(slideIndex + 1)
    } 
    else if (slideIndex === 3){
        setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if(slideIndex !== 1){
        setSlideIndex(slideIndex - 1)
    }
    else if (slideIndex === 1){
        setSlideIndex(3)
    }
  }
  
  return (
    <div className='banner grid grid--tablet grid--desktop'>
      <h1 className='banner__title 
        grid__item--tablet-1-9
        grid__item--desktop-1-19'>
        Welcome to Nice Gadgets store!
      </h1>
        {/* <div className="banner__container
        grid__item--tablet-1-12
        grid__item--desktop-1-24"> */}
          <button 
            className="banner__button banner__left
            grid__item--tablet-1
            grid__item--desktop-1"
            type='button'
            onClick={prevSlide}
          >
          </button>
          <div className='banner__box
          grid__item--tablet-2-11
          grid__item--desktop-2-23'>
            <div className='banner__img-container'>
              <img 
                src={sliderImages[slideIndex - 1]} 
                alt='img'
                className='banner__img'
                />
            </div>
          </div>
            <button
              className="banner__button banner__right
              grid__item--tablet-12
              grid__item--desktop-24"
              type='button'
              onClick={nextSlide}
            >
            </button>
        {/* </div> */}
        <div className='banner__rectangle
        grid__item--tablet-6-7
        grid__item--desktop-13-14'>
          <div className={classNames('banner__rectangle__img', {
            'banner__rectangle__img--active': slideIndex === 1,
            }
            )}
          ></div>
          <div className={classNames('banner__rectangle__img', {
              'banner__rectangle__img--active': slideIndex === 2,
            }
            )}
          ></div>
          <div className={classNames('banner__rectangle__img', {
            'banner__rectangle__img--active': slideIndex === 3,
            }
            )}
          ></div>
        </div>
    </div>
  );
};
