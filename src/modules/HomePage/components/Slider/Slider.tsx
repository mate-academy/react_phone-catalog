import { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMediaQuery } from 'react-responsive';
import styles from './Slider.module.scss';

import img1Mobile from './images/img1Mobile.png';
import img2Mobile from './images/img2Mobile.png';
import img3Mobile from './images/img3Mobile.png';
import img1Other from './images/img1Other.png';
import img2Other from './images/img2Other.png';
import img3Other from './images/img3Other.png';

import arrowLeft from '../../../../shared/images/icons/arrowLeft.svg';
import whiteLeft from './icons/whiteLeft.svg';
import arrowRight from '../../../../shared/images/icons/arrowRight.svg';
import whiteRight from './icons/whiteRight.svg';
import classNames from 'classnames';
import { AppContext } from '../../../../utils/AppContext';

const mobileImages = [img1Mobile, img2Mobile, img3Mobile];
const otherImages = [img1Other, img2Other, img3Other];

export const Slider = () => {
  const isNotMobile = useMediaQuery({ query: '(min-width: 640px)' });
  const { isDarkTheme } = useContext(AppContext);
  const [slide, setSlide] = useState(0);
  const [isHandControlled, setIsHandControlled] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const minSwipeDistance = 50;

  const sliderCarousel = (slideNumber: number) => {
    switch (slideNumber) {
      case 0:
        setTimer(setTimeout(() => setSlide(1), 5000));
        break;
      case 1:
        setTimer(setTimeout(() => setSlide(2), 5000));
        break;
      case 2:
        setTimer(setTimeout(() => setSlide(0), 5000));
        break;
    }
  };

  const handleSlideControl = (n: number) => {
    clearTimeout(timer);
    setIsHandControlled(true);
    setSlide(n);
    setIsHandControlled(false);
  };

  const handleButtonClick = (direction: string) => {
    switch (direction) {
      case 'left':
        if (!slide) {
          handleSlideControl(2);
        } else {
          handleSlideControl(slide - 1);
        }

        break;

      case 'right':
        if (slide === 2) {
          handleSlideControl(0);
        } else {
          handleSlideControl(slide + 1);
        }

        break;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    clearTimeout(timer);
    setIsHandControlled(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsHandControlled(false);

      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance < minSwipeDistance;
    const isRightSwipe = distance > -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        handleButtonClick('left');
      } else {
        handleButtonClick('right');
      }
    }

    setIsHandControlled(false);
  };

  useEffect(() => {
    if (!isHandControlled) {
      sliderCarousel(slide);
    }
  }, [isHandControlled, slide]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderSubContainer}>
        <div
          className={classNames(
            styles.sliderButton,
            isDarkTheme ? styles.sliderButtonDark : '',
          )}
          style={
            isDarkTheme
              ? { backgroundImage: `url(${whiteLeft})` }
              : { backgroundImage: `url(${arrowLeft})` }
          }
          onClick={() => handleButtonClick('left')}
        ></div>

        <div
          className={styles.sliderScreen}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={styles.sliderImages}
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {!isNotMobile &&
              mobileImages.map((image, index) => {
                return (
                  <img
                    className={styles.sliderImage}
                    src={image}
                    alt="Slider image"
                    key={index}
                  />
                );
              })}

            {isNotMobile &&
              otherImages.map((image, index) => {
                return (
                  <img
                    className={styles.sliderImage}
                    src={image}
                    alt="Slider image"
                    key={index}
                  />
                );
              })}
          </div>
        </div>

        <div
          className={classNames(
            styles.sliderButton,
            isDarkTheme ? styles.sliderButtonDark : '',
          )}
          style={
            isDarkTheme
              ? { backgroundImage: `url(${whiteRight})` }
              : { backgroundImage: `url(${arrowRight})` }
          }
          onClick={() => handleButtonClick('right')}
        ></div>
      </div>

      <div className={styles.dashContainer}>
        <div
          className={classNames(
            styles.dash,
            isDarkTheme ? styles.dashDark : '',
            !slide ? styles.dashSelected : '',
            !slide && isDarkTheme ? styles.dashSelectedDark : '',
          )}
          onClick={() => handleSlideControl(0)}
        />
        <div
          className={classNames(
            styles.dash,
            isDarkTheme ? styles.dashDark : '',
            slide === 1 ? styles.dashSelected : '',
            slide === 1 && isDarkTheme ? styles.dashSelectedDark : '',
          )}
          onClick={() => handleSlideControl(1)}
        />
        <div
          className={classNames(
            styles.dash,
            isDarkTheme ? styles.dashDark : '',
            slide === 2 ? styles.dashSelected : '',
            slide === 2 && isDarkTheme ? styles.dashSelectedDark : '',
          )}
          onClick={() => handleSlideControl(2)}
        />
      </div>
    </div>
  );
};
