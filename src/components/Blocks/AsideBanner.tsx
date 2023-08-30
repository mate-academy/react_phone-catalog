import { useEffect, useMemo, useState } from 'react';
import { IconSlideLeft, IconSlideRight } from '../../utils/Icons';

const BANNER_WIDTH = 3120;
const IMAGE_WIDTH = 1040;

const AsideBanner = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [bannerStyle, setBannerStyle] = useState({});

  const barColor = useMemo(() => (index: number) => {
    if (imageIndex === index) {
      return '#313237';
    }

    return '#E2E6E9';
  },
  [imageIndex]);

  const nextImage = () => {
    const nextIndex = imageIndex === 2 ? 0 : imageIndex + 1;

    setImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = imageIndex === 0 ? 2 : imageIndex - 1;

    setImageIndex(prevIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);

    setBannerStyle({ transform: `translateX(-${(IMAGE_WIDTH / BANNER_WIDTH) * imageIndex * 100}%)` });

    return () => clearInterval(interval);
  }, [imageIndex]);

  return (
    <aside className="banner container">
      <div className="wrapper">
        <button
          type="button"
          className="banner__slide-left slide-switcher"
          onClick={() => prevImage()}
        >
          <IconSlideLeft />
        </button>

        <div className="banner__phones-images">
          <div className="banner__images-wrapper" style={bannerStyle}>
            <div className="banner__image banner__image--1" />
            <div className="banner__image banner__image--2" />
            <div className="banner__image banner__image--3" />
          </div>
        </div>

        <button
          type="button"
          className="banner__slide-right slide-switcher"
          onClick={() => nextImage()}
        >
          <IconSlideRight />
        </button>
      </div>

      <div className="banner__bars">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="24"
          viewBox="0 0 80 24"
          fill="none"
        >
          <rect x="5" y="10" width="14" height="4" fill={barColor(0)} />
          <rect x="33" y="10" width="14" height="4" fill={barColor(1)} />
          <rect x="61" y="10" width="14" height="4" fill={barColor(2)} />
        </svg>
      </div>
    </aside>
  );
};

export default AsideBanner;
