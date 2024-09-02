import { useEffect, useState } from 'react';
import './Welcome.scss';
import { useLocation } from 'react-router-dom';

export const Welcome = () => {
  const banners = [
    './img/banner-phones.png',
    './img/banner-tablets.png',
    './img/banner-accessories.png',
  ];

  const [bannerIndex, setBannerIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0].clientX;

    setTouchPosition(touch);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = touchPosition;

    if (touch === 0) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touch - currentTouch;

    if (diff > 3) {
      setBannerIndex(index => {
        if (index === 0) {
          return banners.length - 1;
        }

        return index - 1;
      });
    }

    if (diff < 3) {
      setBannerIndex(index => {
        if (index === banners.length - 1) {
          return 0;
        }

        return index + 1;
      });
    }

    setTouchPosition(0);
  };

  function ShowPrevBanner() {
    setBannerIndex(index => {
      if (index === 0) {
        return banners.length - 1;
      }

      return index - 1;
    });
  }

  function ShowNextBanner() {
    setBannerIndex(index => {
      if (index === banners.length - 1) {
        return 0;
      }

      return index + 1;
    });
  }

  useEffect(() => {
    const TimeoutId = setTimeout(() => {
      ShowNextBanner();
    }, 5000);

    return () => clearTimeout(TimeoutId);
  });

  const location = useLocation().pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div
      className="welcome-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <h1 className="welcome-text">Welcome to Nice Gadgets store!</h1>
      <div>
        <div className="slider-box">
          <button onClick={ShowPrevBanner} className="left-btn">
            <img src="./uploadedImg/left.svg" alt="Left Arrow" />
          </button>

          <img
            src={banners[bannerIndex]}
            alt="Banner"
            className="banner-image"
          />

          <button onClick={ShowNextBanner} className="right-btn">
            <img src="./uploadedImg/right.svg" alt="Right Arrow" />
          </button>
        </div>
        <div className="small-images">
          {banners.map((_, index) => (
            <button
              key={index}
              className="button"
              onClick={() => setBannerIndex(index)}
            >
              {index === bannerIndex ? (
                <div className="pressed-btn"></div>
              ) : (
                <div className="notPressed-btn"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
