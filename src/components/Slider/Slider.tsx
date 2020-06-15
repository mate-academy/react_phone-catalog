import React, { useState, useEffect, useRef } from 'react';
import { sliderImages } from '../../helpers/constants';
import { LeftArrow, RightArrow } from '../SvgSprite/SvgSprite';
import cn from "classnames";


const getWidth = () => window.innerWidth <= 1300? window.innerWidth - window.innerWidth / 100* 20 : 1040;

export const Slider: React.FC = () => {
  const images = sliderImages.map((image, index) => ({
    ...image,
    position: index + 1,
  }));

  const [position, setPosition] = useState(1);
  const [left, setLeft] = useState(0);
  const [imgWidth, setIgWidth] = useState(1040);
  const autoPlayRef = useRef<() => void>(()=>{});

  useEffect(() => {
    autoPlayRef.current = () => handleClick(1);
  })

  useEffect(() => {
    const play = () => {
      autoPlayRef.current()
    }


    const interval = setInterval(play, 2000)
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const handleResize = () => {
    setIgWidth(getWidth());
  }


  const handleClick = (path: number) => {

    const newLeftPosition = (imgWidth) * -path;

    if (position === images.length && path === 1) {
      setPosition(1);
      setLeft(0);

      return;
    }

    if (position === 1 && path === -1) {
      setPosition(images.length);
      setLeft(imgWidth * path * (images.length - 1));

      return;
    }

    setPosition(position + path);
    setLeft(left + newLeftPosition);
  };

  return (
    <section className="slider">
      <div className="slider__container">
        <button
          type="button"
          className="slider__button"
          onClick={() => handleClick(-1)}
          >
          <span className="slider__img--arrow-right">
            <RightArrow />
          </span>
        </button>
        <div className="slider__img-container slider__img"  style={{ width: `${imgWidth}px` }}>
          <ul
            className="slider__img-list"
            style={{
              transform: `translateX(${left}px)`,
              transition: `color 0.45s ease-out`,
            }}
          >
          {images.map(image => (
              <li
                className="slider__img-item"
                key={image.position}
              >
                <img
                  src={image.path}
                  alt={image.alt}
                  className="slider__img-visible"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="slider__button"
          onClick={() => handleClick(1)}
          >
          <span className="slider__img--arrow-left">
            <LeftArrow />
          </span>
        </button>
      </div>

      <div className="slider__item-points">
        {images.map(image => (
          <span
            key={image.position}
            className={cn(
              'slider__item-point',
              {'slider__item-point--active': image.position === position}
            )}
          />
        ))}
      </div>
    </section>
  )
}

