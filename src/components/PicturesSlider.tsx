import {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import { SliderButton } from './UI/SliderButton';
import { sliderImages } from '../helpers/sliderImages';

export const PicturesSlider: FC = () => {
  const [translateX, setTranslateX] = useState(-1040);
  const [transitionValue, setTransitionValue] = useState(500);
  const [isDisabledButtons, setIsDisabledButtons] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [images, setImages] = useState(sliderImages);
  const imgContainer = useRef<HTMLDivElement | null>(null);

  const DEFAULT_TRANSITION = 500;
  const AUTO_SWIPE_TIME = 5000;

  const firstImgPosition = imgWidth * -1;
  const lastImgPosition = useMemo(() => {
    const imagesCountWithoutClones = images.length - 2;

    return (imgWidth * imagesCountWithoutClones) * -1;
  }, [imgWidth, images]);

  const firstClonedImgPosition = 0;
  const lastClonedImgPosition = useMemo(() => {
    return imgWidth * (images.length - 1) * -1;
  }, [imgWidth, images]);

  const sliderListStyles = {
    transform: `translateX(${translateX}px)`,
    transition: `transform ${transitionValue}ms`,
  };

  const moveTo = (value: number) => {
    setIsDisabledButtons(true);
    setTimeout(() => {
      setTransitionValue(0);
      setTranslateX(value);
    }, DEFAULT_TRANSITION);
  };

  const nextSlide = () => {
    setTranslateX(current => current - imgWidth);
  };

  const prevSlide = () => {
    setTranslateX(current => current + imgWidth);
  };

  const autoFlipSlides = (width: number | undefined) => {
    if (width) {
      setTranslateX(current => current - width);
    }
  };

  useEffect(() => {
    let moveSlideIntervalId: NodeJS.Timer;

    if (imgContainer.current) {
      setImgWidth(imgContainer.current?.offsetWidth);

      moveSlideIntervalId = setInterval(() => autoFlipSlides(
        imgContainer.current?.offsetWidth,
      ), AUTO_SWIPE_TIME);
    }

    const imagesWithClones = [...images];

    imagesWithClones.unshift(images[images.length - 1]);
    imagesWithClones.push(images[0]);

    setImages(imagesWithClones);

    return () => {
      clearInterval(moveSlideIntervalId);
    };
  }, []);

  useEffect(() => {
    if (isDisabledButtons) {
      setTimeout(() => {
        setIsDisabledButtons(false);
        setTransitionValue(DEFAULT_TRANSITION);
      }, DEFAULT_TRANSITION * 1.05);
    }
  }, [isDisabledButtons]);

  useEffect(() => {
    if (translateX === firstClonedImgPosition) {
      moveTo(lastImgPosition);
    }

    if (translateX === lastClonedImgPosition) {
      moveTo(firstImgPosition);
    }
  }, [translateX]);

  return (
    <div className="pictures-slider">
      <SliderButton
        width="32px"
        height="400px"
        direction="prev"
        action={prevSlide}
        isDisabled={isDisabledButtons}
      />
      <div ref={imgContainer} className="pictures-slider__container">
        <div className="pictures-slider__content" style={sliderListStyles}>
          {images.map(image => (
            <img
              key={image.link + Math.random()}
              src={image.link}
              alt={image.title}
              className="pictures-slider__img"
            />
          ))}
        </div>
      </div>
      <SliderButton
        width="32px"
        height="400px"
        direction="next"
        action={nextSlide}
        isDisabled={isDisabledButtons}
      />
    </div>
  );
};
