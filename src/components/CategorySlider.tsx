import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Slide } from '../types/Slide';
import {
  moveBck,
  moveFwd,
  leftButton,
  rightButton,
  sliderList,
  slideStyleObject,
} from '../utils/categorySliderUtils';

type Props = {
  sliderWidth: number;
};

export const CategorySlider: React.FC<Props> = ({ sliderWidth }) => {
  const [imageList, setImageList] = useState<Slide[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const updateList = () => {
    if (!imageList.length) {
      setImageList(sliderList.map((image, ind) => {
        return {
          index: ind,
          position: ind,
          opacity: 1,
          adress: image,
          transition: 'none',
          width: sliderWidth,
        };
      }));
    } else {
      setImageList(current => current.map(image => (
        {
          ...image,
          transition: 'none',
          width: sliderWidth,
        }
      )));
    }
  };

  useEffect(updateList, [sliderWidth]);

  useEffect(() => {
    if (isButtonDisabled) {
      const id = setTimeout(() => setIsButtonDisabled(false), 800);

      return () => clearTimeout(id);
    }

    return () => {};
  }, [isButtonDisabled]);

  const handleFwdButton = () => {
    setIsButtonDisabled(true);
    setImageList(current => current.map(item => moveFwd(item)));
  };

  const handleBckButton = () => {
    setIsButtonDisabled(true);
    setImageList(current => current.map(item => moveBck(item)));
  };

  return (
    <section className="slider">
      <button
        className="slider__button"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleBckButton}
      >
        <img
          src={leftButton}
          alt="leftButton"
          className="icon-bck"
        />
      </button>
      <div className="slider__body">
        <ul className="album">
          {imageList.map(picture => (
            <li key={picture.adress.slice(16, -4)}>
              <img
                src={picture.adress}
                alt="banner"
                className="album__img"
                style={slideStyleObject(picture)}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="slider__button"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleFwdButton}
      >
        <img
          src={rightButton}
          alt="rightButton"
          className="icon-fwd"
        />
      </button>
      <ul className="rectangles">
        {imageList.map(item => (
          <li
            key={item.adress}
            className={classNames(
              'rectangles__item',
              { 'is-active': item.position === 0 },
            )}
          />
        ))}
      </ul>
    </section>
  );
};
