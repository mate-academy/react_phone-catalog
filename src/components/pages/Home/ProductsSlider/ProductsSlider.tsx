import './ProductSlider.scss';
import { useEffect, useState } from 'react';
import { Button } from '../../../../common/Button/Button';

export const ProductsSlider = () => {
  // console.log(items)
  const banners = [
    '/_new/img/banner-phones.png',
    '/_new/img/banner-accessories.png',
    '/_new/img/banner-tablets.png',
  ];

  const [visibleBanner, setVisibleBanner] = useState(0);

  if (visibleBanner >= banners.length) {
    setVisibleBanner(0);
  }

  if (visibleBanner <= -1) {
    setVisibleBanner(banners.length - 1);
  }

  const moveRight = (event: any) => {
    event.preventDefault();
    setVisibleBanner(visibleBanner + 1);
  };

  const moveLeft = (event: any) => {
    event.preventDefault();
    setVisibleBanner(visibleBanner - 1);
  };

  useEffect(() => {
    // setInterval(() => {
    //   setVisibleBanner(prevCount => prevCount + 1);
    // }, 5000);
  }, []);

  return (
    <div>
      <div className="slider">
        <Button
          className="arrow left long"
          onClick={moveLeft}
          image="/icons/Chevron (Arrow Left).svg"
          alt="<"
        />
        <div
          className="slider__images"
          style={{ backgroundImage: `url('${banners[visibleBanner]}')` }}
        />
        <Button
          className="arrow right long"
          onClick={moveRight}
          image="/icons/Chevron (Arrow Right).svg"
          alt=">"
        />
      </div>

      <div className="slider__subbuttons">
        {[...Array(banners.length)].map((one, index) => {
          one = index;

          return (
            <div
              key={`${one}slider`}
              className={`slider__subbutton ${visibleBanner == index && 'active__subbutton'}`}
              onClick={() => {
                setVisibleBanner(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
