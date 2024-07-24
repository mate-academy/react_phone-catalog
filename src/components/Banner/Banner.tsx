import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import cn from 'classnames';
import { Swiper } from '../../helpers/Swiper';
import { LOCAL_URL } from '../../api/apiProducts';
import './Banner.module.scss';

export const Banner = () => {
  const categories = Object.values(Category);
  const [index, setIndex] = useState(0);
  const [transform, setTransform] = useState(0);

  const handleSlideChange = (i: number) => {
    setIndex(i);
    setTransform(100 * i);
  };

  const { handleTouchStart, handleTouchMove } = Swiper(
    handleSlideChange,
    categories.length - 1,
  );

  useEffect(() => {
    const animate = () => {
      if (index < categories.length - 1) {
        handleSlideChange(index + 1);
      } else {
        handleSlideChange(0);
      }
    };

    const timerId = setTimeout(animate, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [categories.length, index, transform]);

  return (
    <div className="banner">
      <div className="banner__container">
        <button
          className="banner__button"
          onClick={() => handleSlideChange(index - 1)}
          disabled={index === 0}
        >
          <i
            className={cn('icon icon--arrow-left', {
              'icon--arrow-left--disabled': index === 0,
            })}
          ></i>
        </button>
        <ul
          className="banner__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={e => handleTouchMove(e, index)}
        >
          {categories.map(category => (
            <li
              className="banner__slider-item"
              key={category}
              style={{ transform: `translateX(-${transform}%)` }}
            >
              <Link
                to={`./${category}`}
                className="banner__slider-link"
                style={{
                  backgroundImage: `url(${LOCAL_URL}/img/banner-${category}.png)`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          className="banner__button"
          onClick={() => handleSlideChange(index + 1)}
          disabled={index === categories.length - 1}
        >
          <i
            className={cn('icon icon--arrow-right', {
              'icon--arrow-right--disabled': index === categories.length - 1,
            })}
          ></i>
        </button>
        <div className="banner__items">
          {categories.map((category, i) => (
            <button
              type="button"
              key={category}
              className={cn('banner__item', {
                'banner__item--active': i === index,
              })}
              onClick={() => handleSlideChange(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
