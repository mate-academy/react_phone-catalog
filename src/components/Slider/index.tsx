import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import './Slider.scss';

const slidesData = [
  'img/Banner.jpg',
  'img/Banner2.jpg',
  'img/Banner3.jpg',
  'img/Banner4.jpg',
  'img/Banner5.jpg',
  'img/Banner6.jpg',
];

const Slide = ({ urlSlide }: {urlSlide: string}) => {
  return (
    <div className="slide">
      <img className="slide__img" src={urlSlide} alt="Banner" />
    </div>
  );
};

export const Slider = () => {
  const firstSlide = slidesData[0];
  const middleSlide = slidesData.slice(1, slidesData.length - 1);
  const lastSlide = slidesData[slidesData.length - 1];
  const [activeIndex, setActiveIndex] = useState(0);
  const [widthSlide, setWidthSlide] = useState(0);
  const [transition, setTransition] = useState(.5);
  const slideWidthRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState(0);
  const [slides, getSlides] = useState<string[]>([lastSlide, firstSlide, ...middleSlide]);
  const autoPlayRef = useRef<() => void>();
  const transitionRef = useRef<() => void>();
  const resizeRef = useRef<() => void>();


  const moveTo = (index: number) => {
    const prev = index === activeIndex - 1;
    const next = index === activeIndex + 1;

    setActiveIndex(index);

    if (next) {
      if (activeIndex === slidesData.length - 1) {
        setActiveIndex(0);
      }

      setTranslate(translate + widthSlide);

      return;
    }

    if (prev) {
      if (activeIndex === 0) {
        setActiveIndex(slidesData.length - 1);
      }

      setTranslate(translate - widthSlide);

      return;
    }

    getSlides(slidesData);

    setTranslate(widthSlide * index);
  };

  const smoothTransition = () => {
    let slidesTransition: string[] = [];

    if (activeIndex === slidesData.length - 1) {
      slidesTransition = [...slidesData.slice(1, slidesData.length - 1), lastSlide, firstSlide];
      setTranslate(widthSlide * (slidesData.length - 2));
    } else if (activeIndex === 0) {
      slidesTransition = [lastSlide, firstSlide, ...middleSlide];
      setTranslate(widthSlide);
    } else {
      slidesTransition = [...slidesData.slice(0, slidesData.length)];
      setTranslate(widthSlide * activeIndex);
    }

    getSlides(slidesTransition);
    setTransition(0);
  };

  const handleResize = () => {
    if (slideWidthRef.current) {
      setWidthSlide(slideWidthRef.current.clientWidth);
      setTranslate(slideWidthRef.current.clientWidth);
      setTransition(0);
    }
  };

  useEffect(() => {
    autoPlayRef.current = () => moveTo(activeIndex + 1);
    transitionRef.current = smoothTransition;
    resizeRef.current = handleResize;
  });

  useEffect(() => {
    if (slideWidthRef.current) {
      setWidthSlide(slideWidthRef.current.clientWidth);
    }

    const smooth = () => {
      if (transitionRef.current) {
        transitionRef.current();
      }
    };

    const play = () => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    };

    const resize = () => {
      if (resizeRef.current) {
        resizeRef.current();
      }
    };

    const interval = setInterval(play, 5000);

    //console.log(activeIndex);
    // const interval = setInterval(() => {
    //   moveTo(activeIndex + 1);
    // }, 5000)
    window.addEventListener('transitionend', smooth);
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('transitionend', smooth);
      window.removeEventListener('resize', resize);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (transition === 0) {
      setTransition(.5);
    }
  }, [transition]);


  const styleSliderContent = {
    transform: `translateX(-${translate}px)`,
    width: `${widthSlide * slides.length}px`,
    transition: `transform ease-out ${transition}s`,
  };


  return (
    <div className="slider">
      <div ref={slideWidthRef} className="slider__content">
        <div
          style={styleSliderContent}
          className="slider__wrapper"
        >
          {slides.map((urlSlide: string) => (
            <Slide key={urlSlide} urlSlide={urlSlide} />
          ))}
        </div>
      </div>
      <button type="button" className="slider__arrow slider__arrow-left" onClick={() => moveTo(activeIndex - 1)}>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.47136 0.528636C5.21101 0.268287 4.7889 0.268287 4.52855 0.528636L0.528555 4.52864C0.268205 4.78899 0.268205 5.2111 0.528555 5.47145L4.52855 9.47145C4.7889 9.7318 5.21101 9.7318 5.47136 9.47145C5.73171 9.2111 5.73171 8.78899 5.47136 8.52864L1.94277 5.00004L5.47136 1.47145C5.73171 1.2111 5.73171 0.788986 5.47136 0.528636Z" fill="#313237" />
        </svg>
      </button>
      <button type="button" className="slider__arrow slider__arrow-right" onClick={() => moveTo(activeIndex + 1)}>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528636C0.788986 0.268287 1.2111 0.268287 1.47145 0.528636L5.47145 4.52864C5.73179 4.78899 5.73179 5.2111 5.47145 5.47145L1.47145 9.47145C1.2111 9.7318 0.788986 9.7318 0.528636 9.47145C0.268287 9.2111 0.268287 8.78899 0.528636 8.52864L4.05723 5.00004L0.528636 1.47145C0.268287 1.2111 0.268287 0.788986 0.528636 0.528636Z" fill="#313237" />
        </svg>
      </button>
      <div className="slider__dots">
        {slidesData.map((slide, index) => (
          <button
            type="button"
            key={slide}
            onClick={() => moveTo(index)}
            className={cn('dot', { active: index === activeIndex })}
          />
        ))}
      </div>
    </div>
  );
};
