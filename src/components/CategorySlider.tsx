import React, { useEffect, useMemo, useState } from 'react';
import { Slide } from '../types/Slide';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { Width } from '../types/Width';
import {
  moveBck,
  moveFwd,
  path,
  leftButton,
  rightButton,
  sliderList,
  slideStyleObject,
} from './utils/categorySliderUtils';

export const CategorySlider: React.FC = () => {
  const [imageList, setImageList] = useState<Slide[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const windowWidth = useWindowWidth();

  const sliderWidth = useMemo(() => {
    return windowWidth < Width.desc ? Width.tablet : Width.desc;
  }, [windowWidth]);

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

  const handleClik = (direction: 'fwd' | 'bck') => {
    setIsButtonDisabled(true);

    switch (direction) {
      case 'fwd':
        setImageList(current => current.map(item => moveFwd(item)));
        break;
      default:
        setImageList(current => current.map(item => moveBck(item)));
    }
  };

  return (
    <section className="slider">
      <button
        className="slider__button"
        type="button"
        disabled={isButtonDisabled}
        onClick={() => handleClik('bck')}
      >
        <img src={path + leftButton} alt="leftButton" className="icon-bck" />
      </button>
      <div className="slider__body">
        <ul className="album">
          {imageList.map(picture => (
            <li key={picture.adress.slice(16, -4)}>
              <img
                src={path + picture.adress}
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
        onClick={() => handleClik('fwd')}
      >
        <img src={path + rightButton} alt="rightButton" className="icon-fwd" />
      </button>
    </section>
  );
};
