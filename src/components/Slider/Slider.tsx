import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import './Slider.scss';

type Image = {
  name: 'phones' | 'tablets' | 'accessories';
  path: string;
};

const images: Image[] = [
  { name: 'phones', path: 'new/img/banner-phones.png' },
  { name: 'tablets', path: 'new/img/banner-tablets.png' },
  { name: 'accessories', path: 'new/img/banner-accessories.png' },
];

export const Slider: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [toched, setToched] = useState(false);
  const transform = `translateX(${-position * 100}%)`;

  const moveLeft = useCallback(() => {
    if (position === 0) {
      setPosition(2);

      return;
    }

    setPosition((currentPosition) => currentPosition - 1);
  }, [position]);

  const moveRight = useCallback(() => {
    if (position === 2) {
      setPosition(0);

      return;
    }

    setPosition((currentPosition) => currentPosition + 1);
  }, [position]);

  useEffect(() => {
    if (toched) {
      return () => {};
    }

    const interval = setInterval(moveRight, 5000);

    return () => clearInterval(interval);
  }, [position, toched]);

  return (
    <div className="slider">
      <div className="slider__container">
        <Button
          content={ButtonType.ARROW}
          direction="left"
          className="slider__button"
          onClick={() => {
            moveLeft();
            setToched(true);
          }}
        />

        <div className="slider__wrapper">
          {images.map(({ name, path }) => (
            <div className="slider__slide" style={{ transform }} key={path}>
              <Link to={name} className="slider__link">
                <img
                  src={path}
                  alt={`${name} banner`}
                  className="slider__img"
                />
              </Link>
            </div>
          ))}
        </div>

        <Button
          content={ButtonType.ARROW}
          className="slider__button"
          onClick={() => {
            moveRight();
            setToched(true);
          }}
        />
      </div>

      <div className="slider__pagination">
        {images.map((image, index) => (
          <button
            type="button"
            aria-label="bulletButton"
            key={image.path}
            className={cn('slider__bullet', { active: index === position })}
            onClick={() => setPosition(index)}
          />
        ))}
      </div>
    </div>
  );
};
