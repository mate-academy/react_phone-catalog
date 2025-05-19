import React, { Children, useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.scss';
import { Item } from './item';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
};

type CarouselComponent = React.FC<Props> & {
  Item: typeof Item;
};

export const Carousel: CarouselComponent = ({ children }) => {
  const [slide, setSlide] = useState(0);
  const [translate, setTranslate] = useState('');
  const [touchStartPositionX, setTouchStartPositionX] = useState(0);
  const [touchStartPositionY, setTouchStartPositionY] = useState(0);
  const windowRef = useRef<HTMLDivElement | null>(null);

  const windowWidth = windowRef.current?.offsetWidth ?? 0;
  const countSlides = Children.count(children);

  const showPevSlide = () => {
    const prewSlide = slide <= 0 ? countSlides - 1 : slide - 1;

    setSlide(prewSlide);
  };

  const showNexSlide = () => {
    const nextSlide = slide >= countSlides - 1 ? 0 : slide + 1;

    setSlide(nextSlide);
  };

  const touchStart = (e: TouchEvent) => {
    setTouchStartPositionX(e.touches[0].pageX);
    setTouchStartPositionY(e.touches[0].pageY);
  };

  const touchMove = (e: TouchEvent) => {
    const positionX = e.touches[0].pageX;
    const positionY = e.touches[0].pageY;
    const diffX = positionX - touchStartPositionX;
    const diffY = positionY - touchStartPositionY;

    if (e.cancelable && Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault();
    }
  };

  const touchEnd = (e: TouchEvent) => {
    const endPositionX = e.changedTouches[0].pageX;
    const diffX = endPositionX - touchStartPositionX;

    if (Math.abs(diffX) >= windowWidth / 5 && diffX < 0) {
      showNexSlide();
    } else if (Math.abs(diffX) >= windowWidth / 5 && diffX > 0) {
      showPevSlide();
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(showNexSlide, 5000);

    windowRef.current?.addEventListener('touchstart', touchStart, {
      passive: true,
    });
    windowRef.current?.addEventListener('touchmove', touchMove, {
      passive: false,
    });
    windowRef.current?.addEventListener('touchend', touchEnd, {
      passive: true,
    });

    const scroll = -(windowWidth * slide);

    setTranslate(`translateX(${scroll}px)`);

    return () => {
      window.clearTimeout(timer);
      windowRef.current?.removeEventListener('touchstart', touchStart);
      windowRef.current?.removeEventListener('touchmove', touchMove);
      windowRef.current?.removeEventListener('touchend', touchEnd);
    };
  }, [slide, touchStartPositionX]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <button onClick={showPevSlide} type="button" className={styles.button}>
          <img src="img/icons/arrow-left.svg" alt="prev slide" />
        </button>

        <div ref={windowRef} className={styles.window}>
          <div
            className={styles.carouselSlides}
            style={{ transform: translate }}
          >
            {children}
          </div>
        </div>

        <button onClick={showNexSlide} type="button" className={styles.button}>
          <img src="img/icons/arrow-right.svg" alt="next slide" />
        </button>
      </div>

      <div className={styles.dots}>
        {Children.map(children, (el, i) => (
          <div className={styles.dotBox} onClick={() => setSlide(i)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={classNames(styles.dot, {
                [styles.activeDot]: i === slide,
              })}
            >
              <rect x="5" y="10" width="14" height="4" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

Carousel.Item = Item;
