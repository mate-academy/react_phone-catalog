import classNames from 'classnames';
import { Slider } from './Slider';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveSlide } from '../../../../app/features/activeSlideSlice';
import { swipeLeft, swipeRight } from '../../helpers/sliderFunctions';

export const TitleSlider = () => {
  const activeSlide = useAppSelector(state => state.activeSlideReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      swipeRight({ activeSlide, dispatch });
    }, 5000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlide]);

  return (
    <div className="slider container container--slider">
      <div className="slider__top">
        <div
          className="slider__side-button slider__side-button--left"
          onClick={() => swipeLeft({ activeSlide, dispatch })}
        />

        <Slider />

        <div
          className="slider__side-button slider__side-button--right"
          onClick={() => swipeRight({ activeSlide, dispatch })}
        />
      </div>

      <div className="slider__bottom">
        <div
          className="slider__container"
          onClick={() => dispatch(setActiveSlide(1))}
        >
          <div
            className={classNames('slider__button', {
              'slider__button--active': activeSlide === 1,
            })}
          />
        </div>

        <div
          className="slider__container"
          onClick={() => dispatch(setActiveSlide(2))}
        >
          <div
            className={classNames('slider__button', {
              'slider__button--active': activeSlide === 2,
            })}
          />
        </div>

        <div
          className="slider__container"
          onClick={() => dispatch(setActiveSlide(3))}
        >
          <div
            className={classNames('slider__button', {
              'slider__button--active': activeSlide === 3,
            })}
          />
        </div>
      </div>
    </div>
  );
};
