import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './Slider.scss';
import accessories from '../../assets/img/banner-accessories.png';
import phones from '../../assets/img/banner-phones.png';
import tablets from '../../assets/img/banner-tablets.png';
import { Icon } from '../Icon';
import { Icons } from '../../types/enums/Icons';

const images = [
  phones,
  accessories,
  tablets,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        return prev < 2 ? prev + 1 : 0;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button
          className="slider__button slider__button--left"
          type="button"
          onClick={() => updateIndex(activeIndex - 1)}
          aria-label="<"
        >
          <Icon icon={Icons.ArrowLeft} />
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
          aria-label=">"
        >
          <Icon icon={Icons.ArrowRight} />
        </button>
      </div>
      <div className="slider__dots">
        {images.map((img, i) => (
          <button
            type="button"
            aria-label="position"
            key={img}
            onClick={() => setActiveIndex(i)}
            className={classNames('slider__dots-item', {
              'dots-active': activeIndex === i,
            })}
          />
        ))}
      </div>
    </div>
  );
};
