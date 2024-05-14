import { useState } from 'react';

export const Slider = () => {
  const [selectedSlider, setSelectedSlider] = useState(0);
  const slider = [
    'img/slider/phone.webp',
    'img/slider/accessories.webp',
    'img/slider/tablets.webp',
  ];
  const displayImg = slider[selectedSlider];

  return (
    <div className="slider">
      <div className="slider__middle">
        <img className="slider__img" src={displayImg} alt="iphone" />
      </div>
      <div className="slider__bottom">
        {slider.map((_el, index) => {
          return (
            <div
              key={index}
              className="rectangular"
              onClick={() => setSelectedSlider(index)}
              style={{
                backgroundColor: index === selectedSlider ? '#313237' : '',
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
