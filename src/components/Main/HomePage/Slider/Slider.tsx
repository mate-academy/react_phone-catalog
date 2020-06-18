import React, { useState } from 'react';
import cn from 'classnames';

import './Slider.scss';
import { Arrow } from '../../../Arrow/Arrow';

const imageArray = [
  {
    id: 0,
    src: 'img/banner.png',
    alt: 'phone',
  },
  {
    id: 1,
    src: 'https://vkysnik.ru/wp-content/uploads/2018/03/MotoX4_LaydownCombo_SterlingBlue-1040x400.jpg',
    alt: 'phone',
  },
  {
    id: 2,
    src: 'https://blog.lingo24.com/wp-content/uploads/mobile-e-commerce.jpg',
    alt: 'phone',
  },
  {
    id: 3,
    src: 'https://technewsforum.com/wp-content/uploads/2019/09/Google-Allo-and-Google-Duo-1040x400.jpg',
    alt: 'phone',
  },
];

export const Slider = () => {
  const [currentElement, setCurrentElement] = useState<number>(0);
  const [currentId, setCurrentId] = useState<number>(0);

  const step = 1060;

  const changeImg = (num: number, id: number) => {
    let newNum = currentElement;
    const newId = id;

    setCurrentId(num < 0 ? newId + 1 : newId - 1);

    setCurrentElement(newNum += num);
  };

  const transformImage = {
    transform: `translateX(${currentElement}px)`,
  };

  return (
    <section className="section-slider">
      <div className="section-slider__container">
        <button
          type="button"
          className="section-slider__button section-slider__button--left"
          onClick={() => changeImg(step, currentId)}
          disabled={currentId === 0}
        >
          <Arrow />
        </button>
        <div className="slider">
          <ul className="slider-list" style={transformImage}>
            {
              imageArray.map(item => (
                <li className="slider-list__item" key={item.id}>
                  <img
                    src={item.src}
                    alt={item.alt}
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <button
          type="button"
          className="section-slider__button section-slider__button--right"
          onClick={() => changeImg(-step, currentId)}
          disabled={currentId === imageArray.length - 1}
        >
          <Arrow />
        </button>
      </div>
      <div className="slider-dots">
        {
          imageArray.map(item => (
            <div
              className={cn('slider-dots__item', { activeDot: item.id === currentId })}
              key={item.id}
            />
          ))
        }
      </div>
    </section>
  );
};
