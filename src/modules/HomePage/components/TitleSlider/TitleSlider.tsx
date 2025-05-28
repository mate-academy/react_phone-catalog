import classNames from 'classnames';
import { Slider } from './Slider';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveSlide } from '../../../../app/features/activeSlideSlice';
import { swipeLeft, swipeRight } from '../../helpers/sliderFunctions';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

export const TitleSlider = () => {
  const activeSlide = useAppSelector(state => state.activeSlideReducer);
  const dispatch = useAppDispatch();
  const { isDark } = useContext(DarkModeContext);

  const slideIndex = [1, 2, 3];

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
          className={classNames('slider__side-button', {
            'slider__side-button--is-Dark': isDark,
          })}
          onClick={() => swipeLeft({ activeSlide, dispatch })}
        />

        <Slider />

        <div
          className={classNames(
            'slider__side-button slider__side-button--right',
            {
              'slider__side-button--is-Dark': isDark,
            },
          )}
          onClick={() => swipeRight({ activeSlide, dispatch })}
        />
      </div>

      <div className="slider__bottom">
        {slideIndex.map(s => (
          <div
            key={s}
            className="slider__container"
            onClick={() => dispatch(setActiveSlide(s))}
          >
            <div
              className={classNames('slider__button', {
                'slider__button--is-Dark-Active': isDark && activeSlide === s,
                'slider__button--is-Dark': isDark && activeSlide !== s,
                'slider__button--active': activeSlide === s && !isDark,
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
