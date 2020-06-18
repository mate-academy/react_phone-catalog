import React, { useState } from 'react';
import { ProducCard } from '../../../ProductCard/ProducCard';
import './PhoneSlider.scss';
import { Arrow } from '../../../Arrow/Arrow';

type Props = {
  list: Product[];
  secName: string;
};

export const PhoneSlider: React.FC<Props> = ({ list, secName }) => {
  const [currentElement, setCurrentElement] = useState<number>(0);
  const [currentId, setCurrentId] = useState<number>(0);
  const step = 1136;

  const changeSliderItem = (num: number) => {
    if (num < 0) {
      setCurrentElement(currentElement + num - 16);
      setCurrentId(currentId + 4);
    } else {
      setCurrentElement(currentElement + num + 16);
      setCurrentId(currentId - 4);
    }
  };

  const transformSlider = {
    transform: `translateX(${currentElement}px)`,
  };

  return (
    <section className="phone-slider">
      <div className="phone-slider__container">
        <div className="phone-slider__top">
          <h2 className="phone-slider__title">
            {secName}
          </h2>
          <div className="phone-slider__buttons">
            <button
              className="phone-slider__button phone-slider__button--left"
              type="button"
              onClick={() => changeSliderItem(step)}
              disabled={currentId === 0}
            >
              <Arrow />
            </button>
            <button
              className="phone-slider__button phone-slider__button--right"
              type="button"
              onClick={() => changeSliderItem(-step)}
              disabled={currentId + 4 >= list.length - 1}
            >
              <Arrow />
            </button>
          </div>
        </div>
        <div className="phone-slider__slider">
          <ul className="hot-list" style={transformSlider}>
            {
              list.map(item => <ProducCard listItem={item} key={item.age} />)
            }
          </ul>
        </div>
      </div>
    </section>
  );
};
