/* eslint-disable max-len */
import { useMemo, useState } from 'react';

const banner1 = '../assets/images/banner1.jpg';
const banner2 = '../assets/images/banner2.jpg';
const banner3 = '../assets/images/banner3.jpg';
// import banner1 from '../assets/images/banner1.jpg';
// import banner2 from '../assets/images/banner2.jpg';
// import banner3 from '../assets/images/banner3.png';

const getImageSource = (index: number) => {
  switch (index) {
    case 1:
      return banner1;
    case 2:
      return banner2;
    default:
      return banner3;
  }
};

const Aside = () => {
  const [imageIndex, setImageIndex] = useState(1);
  const imageSource = useMemo(() => getImageSource(imageIndex), [imageIndex]);

  const divStyle = useMemo(
    () => ({
      backgroundImage: `url(${imageSource})`,
    }),
    [imageIndex, imageSource],
  );

  const barColor = useMemo(() => (index: number) => {
    if (imageIndex === index) {
      return '#313237';
    }

    return '#E2E6E9';
  },
  [imageIndex]);

  return (
    <aside className="banner">
      <div className="container">
        <div className="wrapper">
          <button
            type="button"
            className="banner__slide-left slide-switcher"
            onClick={() => setImageIndex(imageIndex - 1)}
            disabled={imageIndex === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855 3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107 5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211 12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714 11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107 10.7317 3.78896 10.4714 3.52861Z"
                fill="#313237"
              />
            </svg>
          </button>

          <div className="banner__phones-images">
            <div className="banner__image" style={divStyle} />
          </div>

          <button
            type="button"
            className="banner__slide-right slide-switcher"
            onClick={() => setImageIndex(imageIndex + 1)}
            disabled={imageIndex === 3}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145 3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107 10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899 12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789 5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829 4.21107 5.26829 3.78896 5.52864 3.52861Z"
                fill="#313237"
              />
            </svg>
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
