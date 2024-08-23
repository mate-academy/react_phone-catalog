import { useEffect, useState } from 'react';
import './Welcome.scss';

export const Welcome = () => {
  const banners = [
    './img/banner-phones.png',
    './img/banner-tablets.png',
    './img/banner-accessories.png',
  ];

  const [bannerIndex, setBannerIndex] = useState(0);

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

  return (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome to Nice Gadgets store!</h1>
      <div>
        <div className="slider-box">
          <button onClick={ShowPrevBanner} className="left-btn">
            <img src="/uploadedImg/RightArrow.png" alt="Left Arrow" />
          </button>

          <img
            src={banners[bannerIndex]}
            alt="Banner"
            className="banner-image"
          />

          <button onClick={ShowNextBanner} className="right-btn">
            <img src="/uploadedImg/LeftArrow.png" alt="Right Arrow" />
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
