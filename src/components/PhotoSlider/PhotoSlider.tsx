import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './PhotoSlider.scss';
import { useWindowSize } from '../../hooks/useWindowSize';

const SLIDERS = [
  {
    id: 1,
    src: 'images/banner-phones.png',
  },
  {
    id: 2,
    src: 'images/banner-tablets.png',
  },
  {
    id: 3,
    src: 'images/banner-accessories.png',
  },
];

export const PhotoSlider: React.FC = () => {
  const [translate, setTranslate] = useState(0);
  const [currentImg, setCurrentImg] = useState(1);
  const [step, setStep] = useState(0);
  const stepRef = useRef<HTMLDivElement>(null);

  const screen = useWindowSize();

  useEffect(() => {
    if (stepRef.current) {
      const width = Math.round(stepRef.current.getBoundingClientRect().width);

      setStep(width);
    }

    setTranslate(0);
    setCurrentImg(1);
  }, [screen]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      switch (translate) {
        case 0:
          setTranslate(translate - step);
          setCurrentImg(2);
          break;
        case -step:
          setTranslate(translate - step);
          setCurrentImg(3);
          break;
        default:
          setCurrentImg(1);
          setTranslate(0);
          break;
      }
    }, 5000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [step, translate]);

  const handleClickPrev = useCallback(() => {
    if (translate < 0) {
      setTranslate(translate + step);
      setCurrentImg(currentImg - 1);
    } else if (translate === 0) {
      setTranslate(-2 * step);
      setCurrentImg(3);
    }
  }, [currentImg, translate, step]);

  const handleClickNext = useCallback(() => {
    if (translate > -2 * step) {
      setTranslate(translate - step);
      setCurrentImg(currentImg + 1);
    } else if (translate === -2 * step) {
      setTranslate(0);
      setCurrentImg(1);
    }
  }, [currentImg, translate, step]);

  const handleClickDots = useCallback(
    (id: number) => {
      switch (id) {
        case 1:
          setTranslate(0);
          setCurrentImg(1);
          break;
        case 2:
          setTranslate(-step);
          setCurrentImg(2);
          break;
        case 3:
          setTranslate(-2 * step);
          setCurrentImg(3);
          break;

        default:
          break;
      }
    },
    [step],
  );

  return (
    <div className="Banner">
      <div className="Banner__content" ref={stepRef}>
        <div
          className="Banner__images"
          style={{
            transform: `translateX(${translate}px)`,
            transition: '1s transform',
          }}
        >
          {SLIDERS.map(slide => (
            <div
              key={slide.id}
              className="Banner__image"
              style={{ width: `${step}px` }}
            >
              <img src={slide.src} alt="Banner" className="Banner__photo" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="Banner__arrow Banner__arrow-left"
          onClick={handleClickPrev}
        >
          <img
            src="icons/Arrow_Left_small.svg"
            alt="arrow-left"
            className="Banner__arrow-img"
          />
        </button>

        <button
          type="button"
          className="Banner__arrow Banner__arrow-right"
          onClick={handleClickNext}
        >
          <img
            src="icons/Arrow_Right_small.svg"
            alt="arrow-right"
            className="Banner__arrow-img"
          />
        </button>
      </div>

      <div className="Banner__mark">
        {SLIDERS.map(slide => (
          <button
            key={slide.id}
            type="button"
            className={classNames('Banner__dot', {
              'active-dot': slide.id === currentImg,
            })}
            aria-label="dot"
            onClick={() => handleClickDots(slide.id)}
          />
        ))}
      </div>
    </div>
  );
};
