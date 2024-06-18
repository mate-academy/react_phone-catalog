import style from './Slider.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { BreakPointsContext } from '../../../store/BreakPointsProvider';
import { StateContext } from '../../../store/StateProvider';
import { desktopBanner, mobileBanner } from '../../../utils/BannerList';
import { getRefValue, useStateRef } from '../../../utils/hooks/hooks';
import { getTouchEventData } from '../../../utils/hooks/dom';
import { ArrowLeft } from '../../Logos/ArrowLeft';
import classNames from 'classnames';
import { ArrowRight } from '../../Logos/ArrowRight';

const MIN_SWIPE_REQUIRED = 40;

export const Slider = () => {
  const lengthImgList = mobileBanner.length - 1;
  const { isMobile } = useContext(BreakPointsContext);
  const { setAutoPlay, autoPlay } = useContext(StateContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef<HTMLImageElement>(null);
  const containerWidthRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onTouchMove = (e: MouseEvent | TouchEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef);
    const currentOffsetX = getRefValue(currentOffsetXRef);
    let newOffSetX = getRefValue(offsetXRef);

    const diff = currentOffsetX - newOffSetX;

    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        newOffSetX = Math.floor(newOffSetX / containerWidth) * containerWidth;
      } else {
        newOffSetX = Math.ceil(newOffSetX / containerWidth) * containerWidth;
      }
    } else {
      newOffSetX = Math.round(newOffSetX / containerWidth) * containerWidth;
    }

    setOffsetX(newOffSetX);
    setCurrentIndex(Math.abs(newOffSetX / containerWidth));

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
  ) => {
    currentOffsetXRef.current = getRefValue(offsetXRef);

    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
  };

  const indicatorOnClick = (ind: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    setCurrentIndex(ind);
    setOffsetX(-(containerWidth * ind));
  };

  function handleNext() {
    if (currentIndex < lengthImgList) {
      indicatorOnClick(currentIndex + 1);
    } else if (currentIndex === lengthImgList) {
      indicatorOnClick(0);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      indicatorOnClick(currentIndex - 1);
    } else if (currentIndex === 0) {
      indicatorOnClick(2);
    }
  }

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        if (currentIndex + 1 > desktopBanner.length - 1) {
          indicatorOnClick(0);
        } else {
          indicatorOnClick(currentIndex + 1);
        }
      }, 50000);

      return () => clearInterval(intervalId);
    } else {
      return () => {};
    }
  }, [autoPlay, currentIndex]);


  return (
    <div className={style.slider}>
      <div className={style.slider__block}>
        {!isMobile && (
          <button className={style.slider__button} onClick={handlePrev}>
            <ArrowLeft className={style.slider__arrowIcon} />
          </button>
        )}
        <div className={style.slider__container}>
          <div
            ref={containerRef}
            className={style.slider__images}
            style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            onTouchStart={onTouchStart}
            onMouseDown={onTouchStart}
          >
            {!isMobile ? (
              <>
                {desktopBanner.map(image => (
                  <img
                    ref={widthRef}
                    key={image.src}
                    src={image.src}
                    alt="Banner"
                    className={style.slider__image}
                    draggable={false}
                  />
                ))}
              </>
            ) : (
              <>
                {mobileBanner.map(image => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt="Banner"
                    className={style.slider__image}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className={style.slider__containerSmallBtn}>
          {desktopBanner.map((_, index) => (
            <span
              key={index}
              onClick={() => indicatorOnClick(index)}
              className={classNames(style.slider__smallButton, {
                [style.slider__activeButton]: currentIndex === index,
              })}
            ></span>
          ))}
        </div>
        {!isMobile && (
          <button className={style.slider__button} onClick={handleNext}>
            <ArrowRight className={style.slider__arrowIcon} />
          </button>
        )}
      </div>
    </div>
  );
};
