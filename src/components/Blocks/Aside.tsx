import { useEffect, useMemo, useState } from 'react';
import { IconSlideLeft, IconSlideRight } from '../../utils/Icons';

const Aside = () => {
  const [imageIndex, setImageIndex] = useState(1);

  const barColor = useMemo(() => (index: number) => {
    if (imageIndex === index) {
      return '#313237';
    }

    return '#E2E6E9';
  },
  [imageIndex]);

  const advanceImage = () => {
    if (imageIndex === 3) {
      setImageIndex(1);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(advanceImage, 5000);

    return () => clearInterval(interval);
  }, [imageIndex]);

  return (
    <aside className="banner">
      <div className="container">
        <div className="wrapper">
          <button
            type="button"
            className="banner__slide-left slide-switcher"
            onClick={() => {
              if (imageIndex === 1) {
                setImageIndex(3);
              } else {
                setImageIndex(imageIndex - 1);
              }
            }}
          >
            <IconSlideLeft />
          </button>

          <div className="banner__phones-images">
            <div className={`banner__image banner-image banner-image--${imageIndex}`} />
          </div>

          <button
            type="button"
            className="banner__slide-right slide-switcher"
            onClick={() => advanceImage()}
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
            <rect x="5" y="10" width="14" height="4" fill={barColor(1)} />
            <rect x="33" y="10" width="14" height="4" fill={barColor(2)} />
            <rect x="61" y="10" width="14" height="4" fill={barColor(3)} />
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
