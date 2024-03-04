/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Children,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { useWindowSize } from '../../../hooks/useWindowSize';

import { SliderTrack } from './SliderTrack';
import { SliderNavDots } from './SliderNavDots';
import { SliderButton } from './SliderButton';

import './Slider.scss';
import { SliderThumbs } from './SliderThumbs';

interface SliderContextInterface {
  slideWidth: number;
  className: string;
}

export const SliderContext = React.createContext({} as SliderContextInterface);

export interface Responsive {
  breakpoint: number;
  settings: BreakpointSettings;
}

interface BreakpointSettings {
  slidesPerSlide: number;
  stepBy: number;
}

type Props = {
  children: React.ReactNode;
  slidesToShow: number;
  stepBy?: number;
  duration: number;
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  infinite?: boolean;
  navArrows?: boolean;
  navDots?: boolean;
  responsive?: Responsive[];
  thumbs?: unknown[];
  cypressParam?: string | null;
};

export const Slider: React.FC<Props> = ({
  children,
  slidesToShow,
  stepBy = 1,
  duration = 1000,
  className = '',
  autoplay = false,
  autoplayInterval = 2000,
  infinite = false,
  navArrows = true,
  navDots = true,
  responsive,
  thumbs,
  cypressParam = null,
}) => {
  const [clonedBefore, setClonedBefore] = useState<React.ReactNode[]>([]);
  const [clonedAfter, setClonedAfter] = useState<React.ReactNode[]>([]);
  const slidesLength = Children.count(children);
  const [lastSlideIndex, setLastSlideIndex] = useState<number>(
    Children.count(children) - 1,
  );

  const [slideWidth, setSlideWidth] = useState<number>(0);
  const [slidesPerSlide, setSlidesPerSlide] = useState<number>(slidesToShow);
  const [breakpoints, setBreakpoints] = useState<Responsive[]>([]);
  const [breakpointMax, setBreakpointMax] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [step, setStep] = useState<number>(stepBy);
  const [dots, setDots] = useState<number[]>([]);
  const [durationAnimation, setDurationAnimation] = useState<number>(duration);
  const [activeDot, setActiveDot] = useState<number>(0);
  const [timerAutoplay, setTimerAutoplay] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [windowSize] = useWindowSize();

  const value = useMemo(
    () => ({
      slideWidth,
      className,
    }),
    [slideWidth],
  );

  const calculcateSlideWidth = (sliderWidth: number, slidesPerView: number) => {
    return Math.floor(sliderWidth / slidesPerView);
  };

  const startIntervalAutoplay = () => {
    setTimerAutoplay(
      setInterval(() => {
        setActiveSlide(currentSlide => currentSlide + step);
      }, autoplayInterval),
    );
  };

  const clearIntervalAutoplay = () => {
    if (timerAutoplay) {
      clearInterval(timerAutoplay);
    }

    setTimerAutoplay(null);
  };

  const restartIntervalAutoPlay = () => {
    if (timerAutoplay) {
      clearIntervalAutoplay();
    }

    startIntervalAutoplay();
  };

  // #region Prepare slides list to render
  useEffect(() => {
    if (infinite || (autoplay && !infinite)) {
      setClonedBefore(Children.toArray(children).slice(-step));
      setClonedAfter(Children.toArray(children).slice(0, step));
      setLastSlideIndex(slidesLength - 1 + step);
    }

    setStep(stepBy > slidesPerSlide ? slidesPerSlide : stepBy);

    if (responsive) {
      setBreakpoints(
        responsive.sort((pointFirst, pointSecond) => {
          return pointFirst.breakpoint - pointSecond.breakpoint;
        }),
      );

      const maxBreak = Math.max(...responsive.map(p => p.breakpoint));

      setBreakpointMax(maxBreak);
    }
  }, []);
  // #endregion

  // #region creating nav dots
  useEffect(() => {
    if (navDots) {
      const qtyDots = Math.ceil(slidesLength / slidesPerSlide);
      const dotsArray = [];

      for (let i = 0; i < qtyDots; i += 1) {
        dotsArray.push(i);
      }

      setDots(dotsArray);
    }
  }, [slidesLength, slidesPerSlide]);
  // #endregion

  // #region Calculate slide width
  const sliderWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sliderWrapper.current) {
      const sliderItemWidth = calculcateSlideWidth(
        sliderWrapper.current.clientWidth,
        slidesPerSlide,
      );

      setSlideWidth(sliderItemWidth);
      setActiveSlide(infinite ? step : 0);
    }
  }, [sliderWrapper]);

  // #endregion

  // #region handle responsive and breakpoints

  useEffect(() => {
    const breakPnt = breakpoints.find(point => windowSize < point.breakpoint);

    if (!breakPnt && breakpointMax) {
      setSlidesPerSlide(slidesToShow);
      setStep(stepBy);
      setActiveSlide(infinite ? step : 0);
    }

    if (breakPnt && breakPnt.breakpoint > windowSize && windowSize !== 0) {
      const { settings } = breakPnt;

      setStep(settings.stepBy);
      setSlidesPerSlide(settings.slidesPerSlide);
      setActiveSlide(infinite ? step : 0);
    }

    if (sliderWrapper.current) {
      const sliderContainer = sliderWrapper.current;

      const sliderItemWidth = breakPnt
        ? calculcateSlideWidth(sliderContainer.clientWidth,  breakPnt.settings.slidesPerSlide)
        : calculcateSlideWidth(sliderContainer.clientWidth, slidesPerSlide);

      setSlideWidth(sliderItemWidth);

      setOffset(activeSlide * sliderItemWidth * -1);
    }
  }, [windowSize]);

  // #endregion

  // #region Handle dots

  const handleClickDot = (numberDot: number) => {
    const requestedActiveSlideInRange = !infinite
      ? numberDot * slidesPerSlide
      : numberDot * slidesPerSlide + slidesPerSlide;

    if (infinite) {
      setActiveSlide(requestedActiveSlideInRange);

      return;
    }

    setActiveSlide(
      requestedActiveSlideInRange > lastSlideIndex - slidesPerSlide
        ? lastSlideIndex - slidesPerSlide + 1
        : requestedActiveSlideInRange,
    );
  };

  useLayoutEffect(() => {
    const activeRangeOfSlide = !infinite
      ? Math.ceil(activeSlide / slidesPerSlide)
      : Math.floor((activeSlide - slidesPerSlide) / slidesPerSlide);

    if (
      infinite &&
      (activeRangeOfSlide < 0 || activeRangeOfSlide >= slidesLength)
    ) {
      setActiveDot(0);

      return;
    }

    setActiveDot(activeRangeOfSlide);

    if (autoplay) {
      restartIntervalAutoPlay();
    }
  }, [activeSlide]);

  // #endregion

  // #region reset animation duration after jump to real slide
  useEffect(() => {
    if (!durationAnimation) {
      const timeoutAnimation = setTimeout(() => {
        setDurationAnimation(duration);
      }, duration);

      return () => clearTimeout(timeoutAnimation);
    }

    return undefined;
  }, [durationAnimation]);
  // #endregion

  // #region handling of changing active slide and set offset
  useEffect(() => {
    const isFrameClonedSlide =
      infinite && (activeSlide > lastSlideIndex || activeSlide < step);

    if (!isFrameClonedSlide) {
      setOffset(activeSlide * slideWidth * -1);

      return undefined;
    }

    setOffset(activeSlide * slideWidth * -1);

    const changeSliderFromCloneToReal = setTimeout(() => {
      setDurationAnimation(0);
      setActiveSlide(currentSlide => {
        return currentSlide < step
          ? currentSlide + slidesLength
          : currentSlide - slidesLength;
      });
    }, duration);

    return () => {
      clearTimeout(changeSliderFromCloneToReal);
    };
  }, [activeSlide]);
  // #endregion

  // #region handler Next and Prev buttons
  const nextSlide = () => {
    if (!infinite) {
      setActiveSlide(currentSlide => {
        if (currentSlide + step > lastSlideIndex) {
          return lastSlideIndex;
        }

        if (currentSlide + step > lastSlideIndex - slidesPerSlide) {
          return lastSlideIndex - slidesPerSlide + 1;
        }

        return currentSlide + step;
      });

      return;
    }

    setActiveSlide(currentSlide => currentSlide + step);

    if (autoplay) {
      restartIntervalAutoPlay();
    }
  };

  const prevSlide = () => {
    if (!infinite) {
      setActiveSlide(currentSlide => {
        if (currentSlide - step < 0) {
          return 0;
        }

        return currentSlide - step;
      });

      return;
    }

    setActiveSlide(currentSlide => currentSlide - step);

    if (autoplay) {
      restartIntervalAutoPlay();
    }
  };
  // #endregion

  // #region handler change image in thumb
  const handleChangeImageByThumb = (selectedImage: number) => {
    if (selectedImage !== activeSlide) {
      setActiveSlide(selectedImage);
    }
  };

  // #endregion

  // #region handle autoplay
  useEffect(() => {
    if (!autoplay) {
      return undefined;
    }

    startIntervalAutoplay();

    return () => clearIntervalAutoplay();
  }, [autoplay]);
  // #endregion

  return (
    <SliderContext.Provider value={value}>
      <div className={clsx('slider', className && `${className}__slider`)}>
        {navArrows && (
          <SliderButton
            direction="left"
            disabled={!infinite && activeSlide === 0}
            className={className}
            onClickHandler={prevSlide}
          />
        )}

        <div
          className={clsx(
            'slider__wrapper',
            className && `${className}__wrapper`,
          )}
          ref={sliderWrapper}
        >
          <SliderTrack
            cypressParam={cypressParam}
            offset={offset}
            durationAnimation={durationAnimation}
            className={className}
            infinite={infinite}
            clonedBefore={clonedBefore}
            clonedAfter={clonedAfter}
          >
            {children}
          </SliderTrack>
        </div>

        {thumbs && (
          <SliderThumbs
            images={thumbs}
            activeImage={activeSlide}
            changeImage={handleChangeImageByThumb}
            block={className}
          />
        )}

        {navArrows && (
          <SliderButton
            direction="right"
            disabled={!infinite && activeSlide === 0}
            className={className}
            onClickHandler={nextSlide}
          />
        )}

        <SliderNavDots
          dots={dots}
          bemBlock={className}
          activeDot={activeDot}
          handleClickDot={handleClickDot}
        />
      </div>
    </SliderContext.Provider>
  );
};
