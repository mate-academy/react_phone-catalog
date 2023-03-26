import React, { useState } from 'react';
import { Slider } from '../slider/Slider';
import './slider.scss';

export const BanerSlider:React.FC = () => {
  const [step, setStep] = useState(-1);
  const banners = [
    './img/banners/banner-accessories.png',
    './img/banners/banner-phones.png',
    './img/banners/banner-tablets.png'];

  return (
    <div className="wrapper-banner">
      <Slider
        step={step}
        setStep={setStep}
        leftButton={(
          <div className="arrow">
            <img src="./img/icons/Left.png" alt="prev" />
          </div>
        )}
        rightButton={(
          <div className="arrow">
            <img src="./img/icons/Right.png" alt="next" />
          </div>
        )}
        items
      >
        {banners.map((el) => (
          <div
            className="baner"
            style={{ backgroundImage: `url(${el})` }}
            key={el}
          />
        ))}
      </Slider>

    </div>
  );
};
