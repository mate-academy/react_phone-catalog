import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import './Slider.scss';

interface SliderImage {
  id: number,
  url: string,
}

const sliderImagesUrl = [
  { id: 1, url: 'img/slider/Slider.jpg' },
  { id: 2, url: 'img/slider/Slider1.jpg' },
  { id: 3, url: 'img/slider/Slider2.jpg' },
  { id: 4, url: 'img/slider/Slider3.jpg' },
  { id: 5, url: 'img/slider/Slider4.jpg' },
  { id: 6, url: 'img/slider/Slider5.jpg' },
  { id: 7, url: 'img/slider/Slider6.jpg' },
  { id: 8, url: 'img/slider/Slider7.jpg' },
  { id: 9, url: 'img/slider/Slider8.jpg' },
  { id: 10, url: 'img/slider/Slider9.jpg' },
  { id: 11, url: 'img/slider/Slider10.jpg' },
  { id: 12, url: 'img/slider/Slider11.jpg' },
  { id: 13, url: 'img/slider/Slider12.jpg' },
];

export const Slider: React.FC = () => {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([
    sliderImagesUrl[sliderImagesUrl.length - 1],
    sliderImagesUrl[0],
    sliderImagesUrl[1],
  ]);
  const [currentImage, setCurrentImage] = useState<number>(1);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const offset = 1040;
  const delay = 800;
  const sliderStrip = useRef<HTMLDivElement | null>(null);

  const moveLeft = () => {
    if (sliderStrip.current) {
      setIsScrolling(true);
      const { style } = sliderStrip.current;

      style.transition = `${delay}ms all ease-in-out`;

      if (currentImage === 1) {
        setCurrentImage(sliderImagesUrl.length);
        style.left = '0';

        setTimeout(() => {
          style.transitionDuration = '';

          setSliderImages([
            sliderImagesUrl[sliderImagesUrl.length - 2],
            sliderImagesUrl[sliderImagesUrl.length - 1],
            sliderImagesUrl[0],
          ]);

          style.left = `${-offset}px`;
          setIsScrolling(false);
        }, delay);
      } else {
        setCurrentImage(prev => prev - 1);

        style.left = '0';

        setTimeout(() => {
          style.transitionDuration = '';

          setSliderImages([
            sliderImagesUrl[currentImage - 3]
            || sliderImagesUrl[sliderImagesUrl.length - 1],
            sliderImagesUrl[currentImage - 2],
            sliderImagesUrl[currentImage - 1],
          ]);

          style.left = `${-offset}px`;
          setIsScrolling(false);
        }, delay);
      }
    }
  };

  const moveRight = () => {
    if (sliderStrip.current) {
      const { style } = sliderStrip.current;

      setIsScrolling(true);

      style.transition = `${delay}ms all ease-in-out`;

      if (currentImage === sliderImagesUrl.length) {
        setCurrentImage(1);

        style.left = `${-offset * 2}px`;

        setTimeout(() => {
          style.transitionDuration = '';

          setSliderImages([
            sliderImagesUrl[sliderImagesUrl.length - 1],
            sliderImagesUrl[0],
            sliderImagesUrl[1],
          ]);

          style.left = `${-offset}px`;

          setIsScrolling(false);
        }, delay);
      } else {
        setCurrentImage(prev => prev + 1);

        style.left = `${-offset * 2}px`;

        setTimeout(() => {
          style.transitionDuration = '';

          setSliderImages([
            sliderImagesUrl[currentImage - 1]
            || sliderImagesUrl[0],
            sliderImagesUrl[currentImage],
            sliderImagesUrl[currentImage + 1]
            || sliderImagesUrl[0],
          ]);

          style.left = `${-offset}px`;

          setIsScrolling(false);
        }, delay);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => moveRight(), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentImage]);

  return (
    <div className="slider">
      <div className="slider__main">
        <button
          aria-label="leftBtn"
          type="button"
          className="
            button
            slider__button
            slider__button--left
          "
          onClick={() => moveLeft()}
          disabled={isScrolling}
        />
        <div className="slider__container">
          <div
            className="slider__images"
            ref={sliderStrip}
          >
            {sliderImages.map(image => (
              <img
                key={image.id}
                src={image.url}
                alt="slider"
                className="slider__image"
              />
            ))}
          </div>
        </div>
        <button
          aria-label="rightBtn"
          type="button"
          className="
            button
            slider__button
            slider__button--right
          "
          onClick={() => moveRight()}
          disabled={isScrolling}
        />
      </div>
      <div className="slider__dots">
        {sliderImagesUrl.map(image => (
          <div
            key={image.id}
            className={classNames(
              'slider__dot',
              { 'slider__dot--active': image.id === currentImage },
            )}
          />
        ))}
      </div>
    </div>
  );
};
