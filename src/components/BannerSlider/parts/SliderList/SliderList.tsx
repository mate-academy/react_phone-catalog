import { useContext } from 'react';
import { BannerSLiderContext } from '../../BannerSliderContext';

import { Slide } from '../Slide/Slide';
import './SliderList.scss';

export const SliderList = () => {
  const {
    position,
    transitionDuration,
  } = useContext(BannerSLiderContext);

  const list = [
    { id: 2, url: 'img/utils/banner-accessories.png' },
    { id: 0, url: 'img/utils/banner-phones.png' },
    { id: 1, url: 'img/utils/banner-tablets.png' },
    { id: 2, url: 'img/utils/banner-accessories.png' },
    { id: 0, url: 'img/utils/banner-phones.png' },
  ];

  return (
    <div className="slider__wrapper">
      <ul
        className="slider__list"
        style={{
          transition: `transform ${transitionDuration}ms ease-in-out`,
          transform: `translateX(${position * (-100)}%)`,
        }}
      >
        {list.map((image) => (
          <Slide
            image={image}
            key={image.id + Math.random()}
          />
        ))}
      </ul>
    </div>
  );
};
