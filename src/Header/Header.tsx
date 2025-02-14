import { useEffect, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { FirstBanner } from '../FirstBanner/FirstBanner';
import { SecondBanner } from '../SecondBanner/SecondBanner';
import { ThirdBanner } from '../ThirdBanner/ThirdBanner';
import '../Header/Header.scss';

export const Header = () => {
  const banners = [
    <FirstBanner key={0} />,
    <SecondBanner key={1} />,
    <ThirdBanner key={2} />,
  ];
  const [imageNo, setImageNo] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback((change: () => void) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(change, 5000);
  }, []);

  const changeImageRight = useCallback(() => {
    setImageNo(prev => (prev + 1) % banners.length);
    resetTimer(() => setImageNo(prev => (prev + 1) % banners.length));
  }, [banners.length, resetTimer]);

  const changeImageLeft = useCallback(() => {
    setImageNo(prev => (prev - 1 + banners.length) % banners.length);
    resetTimer(() =>
      setImageNo(prev => (prev - 1 + banners.length) % banners.length),
    );
  }, [banners.length, resetTimer]);

  useEffect(() => {
    resetTimer(changeImageRight);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [changeImageRight, resetTimer]);

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      changeImageRight();
    } else if (swipeDistance < -50) {
      changeImageLeft();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <h2 className="header__title">Welcome to Nice Gadgets store!</h2>
        <div className="header__proposal">
          <button
            className="header__button header__button--previous"
            onClick={changeImageLeft}
          >
            <img src="/img/logos/left-arrow-logo.png" alt="Previous" />
          </button>

          <div
            className="header__slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="header__slides"
              style={{
                transform: `translateX(-${imageNo * (100 / banners.length)}%)`,
              }}
            >
              {banners.map((banner, index) => (
                <div key={index} className="header__slide">
                  {banner}
                </div>
              ))}
            </div>
          </div>

          <button
            className="header__button header__button--next"
            onClick={changeImageRight}
          >
            <img src="/img/logos/right-arrow-logo.png" alt="Next" />
          </button>
        </div>
        <div className="header__dots-group">
          {banners.map((_, index) => (
            <div
              key={index}
              className={classNames('header__dot', {
                'header__dot--active': imageNo === index,
              })}
            />
          ))}
        </div>
      </div>
    </header>
  );
};
