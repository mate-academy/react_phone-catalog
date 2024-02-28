import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Slider.scss';

const SLIDES = [
  'slide-accessories.png',
  'slide-phones.png',
  'slide-tablets.png',
  'slide-accessories.png',
  'slide-phones.png',
];

const BUTTONS = [1, 2, 3];
const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = SLIDES.length - 1;

export const Slider = () => {
  const [slider, setSlider] = useState(1);
  const [transitionDelay, setTransitionDelay] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);

  const wrapper = useRef<HTMLDivElement | null>(null);

  function handleSlide(direction: 'left' | 'right' = 'left') {
    setTransitionDelay(false);

    if (direction === 'left') {
      setSlider(current => current + 1);

      if (slider === LAST_SLIDE_INDEX - 1) {
        setTimeout(() => {
          setTransitionDelay(true);
          setSlider(1);
        }, 300);
      }
    }

    if (direction === 'right') {
      setSlider(current => current - 1);

      if (slider === FIRST_SLIDE_INDEX + 1) {
        setTimeout(() => {
          setTransitionDelay(true);
          setSlider(LAST_SLIDE_INDEX - 1);
        }, 300);
      }
    }
  }

  function sliderLoop(currentSlider:number) {
    setSlider(current => current + 1);

    if (currentSlider === LAST_SLIDE_INDEX - 1) {
      setTimeout(() => {
        setTransitionDelay(true);
        setSlider(1);
      }, 300);

      setTimeout(() => {
        setTransitionDelay(false);
      }, 500);
    }
  }

  function getImgWidth() {
    const width = wrapper.current ? wrapper.current.clientWidth : 200;

    setImgWidth(width);
  }

  useEffect(() => {
    getImgWidth();
    window.addEventListener('resize', getImgWidth);

    const interval = setInterval(() => {
      sliderLoop(slider);
    }, 5000);

    return () => {
      window.removeEventListener('resize', getImgWidth);
      clearInterval(interval);
    };
  }, [slider]);

  return (
    <div className="slider">
      <div className="slider__box">
        <button
          type="button"
          aria-label="slide left"
          className="slider__btn slider__btn--left"
          onClick={() => handleSlide('right')}
        />

        <div className="slider__wrapper" ref={wrapper}>
          <div
            className="slider__items"
            style={{
              transform: `translateX(-${slider * imgWidth}px)`,
              transition: !transitionDelay
                ? 'transform ease-in-out 300ms'
                : 'none',
            }}
          >
            {SLIDES.map(slide => (
              <div
                key={Math.random()}
                className="slider__banner-wr"
              >
                <img
                  style={{
                    width: `${imgWidth}px`,
                  }}
                  src={`img/slides/${slide}`}
                  alt="phones"
                  className="slider__banner"
                  data-adblock-type="not-ad"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="slide right"
          className="slider__btn slider__btn--right"
          onClick={() => handleSlide('left')}
        />
      </div>

      <nav className="slider__nav">
        {BUTTONS.map(button => (
          <button
            key={button}
            type="button"
            aria-label="next slider"
            className="slider__nav-wrapper"
            onClick={() => setSlider(button)}
          >
            <div
              className={classNames('slider__nav-item', {
                'slider__nav-item--active': slider === button,
              })}
            />
          </button>
        ))}
      </nav>
    </div>
  );
};
