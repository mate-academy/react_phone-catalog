import {
  createAutoScroll,
  handleDotClick,
  handleManualScrollLeft,
  handleManualScrollRight,
  useHeaderObserver,
} from './HeaderUtils';

import './Header.scss';
import classNames from 'classnames';
import { images } from './HeaderUtils';
import { useEffect, useRef } from 'react';

const BASE_URL = '/header-images/';

export const Header = () => {
  const activeImageId = useHeaderObserver();
  const activeId = activeImageId === 0 ? 1 : activeImageId;
  const maxSteps = images.length - 1;

  const scrollContainer = useRef<HTMLDivElement>(null);
  const direction = useRef<'right' | 'left'>('right');
  const stepRef = useRef(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);

  const resetAutoScroll = () => {
    clearInterval(intervalRef.current!);
    clearTimeout(timeoutRef.current!);

    timeoutRef.current = setTimeout(() => {
      createAutoScroll(
        intervalRef,
        direction,
        scrollContainer,
        maxSteps,
        stepRef,
      );
    }, 6000);
  };

  useEffect(() => {
    createAutoScroll(
      intervalRef,
      direction,
      scrollContainer,
      maxSteps,
      stepRef,
    );

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header__h1">Welcome to Nice Gadgets store!</h1>

        <div className="header__bottom">
          <div className="header__bottom-slider">
            <div
              className="header__bottom-slider-buttons left"
              onClick={() =>
                handleManualScrollLeft(
                  isScrolling,
                  stepRef,
                  scrollContainer,
                  direction,
                  resetAutoScroll,
                )
              }
            ></div>

            <div
              className="header__bottom-slider-content"
              ref={scrollContainer}
            >
              {images.map(img => (
                <picture
                  key={img.id}
                  data-index={img.id}
                  className="header__bottom-slider-content-item"
                >
                  <source
                    media="(min-width: 1200px)"
                    srcSet={`${BASE_URL}${img.third}`}
                  />
                  <source
                    media="(min-width: 640px)"
                    srcSet={`${BASE_URL}${img.second}`}
                  />
                  <img
                    alt="Header Img"
                    className="header__bottom-slider-content-img"
                    src={`${BASE_URL}${img.first}`}
                  />
                </picture>
              ))}
            </div>

            <div
              className="header__bottom-slider-buttons right"
              onClick={() =>
                handleManualScrollRight(
                  isScrolling,
                  stepRef,
                  scrollContainer,
                  direction,
                  resetAutoScroll,
                  maxSteps,
                )
              }
            ></div>
          </div>

          <div className="header__bottom-dots">
            {images.map(img => (
              <div
                key={img.id}
                onClick={() => handleDotClick(img.id)}
                className={classNames('header__bottom-dots-dot', {
                  activeDots: activeId === img.id,
                })}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
