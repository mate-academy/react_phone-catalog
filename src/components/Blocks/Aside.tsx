/* eslint-disable max-len */
import { useMemo, useState } from 'react';
import { IconSlideLeft, IconSlideRight } from '../../utils/Icons';

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
            <IconSlideLeft />
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
