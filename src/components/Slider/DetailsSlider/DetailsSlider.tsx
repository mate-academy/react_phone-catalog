import React, { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import './DetailsSlider.scss';

type Props = {
  images: string[];
  className?: string;
};

export const DetailsSlider: React.FC<Props> = ({ images, className = '' }) => {
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);

  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  const sliderFirstSettings: Settings = {
    asNavFor: nav2,
    className: 'firstSlider',
    arrows: false,
  };

  const sliderSecondSettings: Settings = {
    asNavFor: nav1,
    className: 'secondSlider',
    slidesToShow: images.length,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    arrows: false,
    infinite: false,
  };

  useEffect(() => {
    if (sliderRef1.current) {
      setNav1(sliderRef1.current);
    }

    if (sliderRef2.current) {
      setNav2(sliderRef2.current);
    }
  }, []);

  return (
    <div className={`detailsSlider ${className}`}>
      <Slider {...sliderFirstSettings} ref={sliderRef1}>
        {images.map(image => (
          <div className="firstSlider__block" key={image}>
            <img src={image} alt={image} className="firstSlider__block--img" />
          </div>
        ))}
      </Slider>
      <Slider {...sliderSecondSettings} ref={sliderRef2}>
        {images.map(image => (
          <div className="secondSlider__block" key={image}>
            <img src={image} alt={image} className="secondSlider__block--img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
