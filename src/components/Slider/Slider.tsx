import classNames from 'classnames';
import { useState } from 'react';
import './Slider.scss';
import accessories from '../../photo/banner-accessories.png';
import phones from '../../photo/banner-phones.png';
import tablets from '../../photo/banner-tablets.png';
import arrowRight from '../../icons/arrow-right.svg';
import arrowLeft from '../../icons/arrow-left.svg';

const images = [
  accessories,
  tablets,
  phones,
];

export const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex: number) => {
    let index = newIndex;

    if (newIndex < 0) {
      index = 2;
    } else if (index >= 3) {
      index = 0;
    }

    setActiveIndex(index);
  };

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button
          className="slider__button slider__button--left"
          type="button"
          onClick={() => updateIndex(activeIndex - 1)}
        >
          <img src={arrowLeft} alt="button-left" />
        </button>
        <div className="slider__container">
          <ul
            className="slider__list"
            style={{ transform: `translate(-${activeIndex * 1040}px)` }}
          >
            {images.map(img => (
              <li className="slider__item" key={img}>
                <img
                  src={img}
                  alt="slider"
                  className="slider__img"
                />
              </li>
            ))}

          </ul>
        </div>

        <button
          className="slider__button slider__button--right"
          type="button"
          onClick={() => updateIndex(activeIndex + 1)}
        >
          <img src={arrowRight} alt="button-right" />
        </button>
      </div>
      <div className="slider__dots">
        {images.map((img, i) => (
          <button
            type="button"
            aria-label="position"
            key={img}
            onClick={() => setActiveIndex(i)}
            className={classNames('slider__dots--item', {
              'dots-active': activeIndex === i,
            })}
          />
        ))}
      </div>
    </div>
  );
};
