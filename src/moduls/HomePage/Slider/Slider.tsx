import React, { useContext, useEffect } from 'react';
import cn from 'classnames';

import '../Slider/Slider.scss';
import '../Slider/transition.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { DispatchContext, StateContext } from '../../../context/ContextReducer';

export const Slider: React.FC = () => {
  const { sliderImg, darkThem, slideInfinity } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    //defualt on

    if (slideInfinity) {
      setTimeout(() => {
        dispatch({ type: 'nextSlide' });
      }, 5000);
    }
  }, [sliderImg]);

  const handleNextSlideClick = () => {
    dispatch({ type: 'switchSlideInfinity', payload: false });
    dispatch({ type: 'nextSlide' });
  };

  const handlePrevSlideClick = () => {
    dispatch({ type: 'switchSlideInfinity', payload: false });
    dispatch({ type: 'prevSlide' });
  };

  const handleSwipeImgClick = (n: number) => {
    dispatch({ type: 'switchSlideInfinity', payload: true });
    dispatch({ type: 'swipeImg', numberImg: n });
  };

  return (
    <div className="Slider Outlet">
      <button
        onClick={handlePrevSlideClick}
        className={cn('Slider__button Slider__button--left', {
          dark: darkThem,
        })}
      ></button>

      <div className="Slider__img">
        <div
          onClick={handlePrevSlideClick}
          className="Slider__img__button-on-phone-prev"
        ></div>
        <div
          onClick={handleNextSlideClick}
          className="Slider__img__button-on-phone-next"
        ></div>

        <TransitionGroup className="Slider__img">
          <CSSTransition key={sliderImg} classNames="slide" timeout={300}>
            <>
              {sliderImg === 1 && (
                <div className="Slider__img Slider__img__1"></div>
              )}
              {sliderImg === 2 && (
                <div className="Slider__img Slider__img__2"></div>
              )}
              {sliderImg === 3 && (
                <div className="Slider__img Slider__img__3"></div>
              )}
            </>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <button
        onClick={handleNextSlideClick}
        className={cn('Slider__button Slider__button--right', {
          dark: darkThem,
        })}
      ></button>

      <div className="Slider__minimap">
        <a
          onClick={() => handleSwipeImgClick(1)}
          className={cn('Slider__minimap__button', {
            'is-active': sliderImg === 1,
          })}
        ></a>
        <a
          onClick={() => handleSwipeImgClick(2)}
          className={cn('Slider__minimap__button', {
            'is-active': sliderImg === 2,
          })}
        ></a>
        <a
          onClick={() => handleSwipeImgClick(3)}
          className={cn('Slider__minimap__button', {
            'is-active': sliderImg === 3,
          })}
        ></a>
      </div>
    </div>
  );
};
