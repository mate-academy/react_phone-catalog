import cn from 'classnames';
import { Link } from 'react-router-dom';
import cl from './ImgSlider.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowButton,
  ArrowButtonDirection,
  ArrowButtonOrigin,
} from '../ArrowButton';
import { useSwipeable } from 'react-swipeable';
import { useWidthRecalculate } from '../../../app/hooks';

const dotsIds = [0, 1, 2];

export const ImgSlider: React.FC = () => {
  const [shownSlide, setShownSlide] = useState(0); // 0 | 1 | 2

  const sliderRef = useRef<HTMLOListElement>(null);
  const [slideWidth] = useWidthRecalculate(sliderRef);

  //#region swiping
  function swipeLeft() {
    setShownSlide(prev => (prev === 0 ? 2 : prev - 1));
  }

  function swipeRight() {
    setShownSlide(prev => (prev === 2 ? 0 : prev + 1));
  }

  const swiper = useSwipeable({
    onSwipedLeft: swipeRight,
    onSwipedRight: swipeLeft,
  });
  //#endregion

  //#region styles
  const animSlideStyles = {
    transform: `translateX(-${shownSlide * slideWidth}px)`,
    transition: 'transform 0.8s ease-in-out',
  };
  const linkWidthStyle = {
    width: `${slideWidth}px`,
  };
  //#endregion

  //#region effects
  // from app/hooks
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShownSlide(prevSlide => (prevSlide + 1) % 3);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  //#endregion

  return (
    <div className={cl.slider} {...swiper}>
      <div className={cl.sliderTopWrapper}>
        <ArrowButton
          direction={ArrowButtonDirection.LEFT}
          origin={ArrowButtonOrigin.ONSLIDER}
          onClick={swipeLeft}
        />

        <ol className={cl.slider__list} ref={sliderRef}>
          <li className={cl.sliderItem} style={animSlideStyles}>
            <a
              href=""
              className={`${cl.sliderLinkWrapper} ${cl.sliderLinkWrapper__1}`}
              style={linkWidthStyle}
            >
              <p className={cl.sliderLinkWrapper__1__text1}>
                Check brand <br /> new models!
              </p>
              <div className={`${cl.sliderLinkWrapper__1__img1}`} />
            </a>
          </li>

          <li className={cl.sliderItem} style={animSlideStyles}>
            <Link
              to="/phones/apple-iphone-14-128gb-midnight"
              className={`${cl.sliderLinkWrapper} ${cl.sliderLinkWrapper__2}`}
              style={linkWidthStyle}
            />
          </li>

          <li className={cl.sliderItem} style={animSlideStyles}>
            <Link
              to="https://www.linkedin.com/"
              className={`${cl.sliderLinkWrapper} ${cl.sliderLinkWrapper__3}`}
              style={linkWidthStyle}
            >
              <p className={cl.sliderLinkWrapper__3__text3}>Contact me!</p>
            </Link>
          </li>
        </ol>

        <ArrowButton
          direction={ArrowButtonDirection.RIGHT}
          origin={ArrowButtonOrigin.ONSLIDER}
          onClick={swipeRight}
        />
      </div>

      <ol className={`${cl.slider__dots} ${cl.dots}`}>
        {dotsIds.map(dotId => (
          <li className={cl.dots__dotItem} key={dotId}>
            <button
              className={cn(cl.dots__dotButton, {
                [cl.dots__dotButtonActive]: dotId === shownSlide,
              })}
              onClick={() => setShownSlide(dotId)}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};
