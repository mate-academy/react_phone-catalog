import React, { useState } from 'react';
import './slider-banner.scss';

type Props = {
  image: string[];
};

export const SliderBanner: React.FC<Props> = ({ image }) => {
  const [num, setNum] = useState(0);

  const chooseItem = (number: number): void => {
    if ((num + number) >= (image.length)) {
      setNum(0);
    } else if ((number + num) <= 0) {
      setNum(image.length - 1);
    } else {
      setNum(num + number);
    }
  };

  setTimeout(() => chooseItem(1), 5000);

  return (
    <>
      <div className="slider-banner">
        <button
          type="button"
          title="top"
          className="section__button slider-banner__button"
          onClick={() => chooseItem(-1)}
        >
          <span className="section__left" />
        </button>

        <div className="slider-banner__main">
          <img
            className="slider__main-photos"
            src={`../${image[num]}`}
            alt={image[num]}
          />
        </div>

        <button
          type="button"
          title="top"
          className="section__button slider-banner__button"
          onClick={() => chooseItem(1)}
        >
          <span className="section__right" />
        </button>
      </div>
    </>
  );
};
