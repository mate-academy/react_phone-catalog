import React, { Children, useEffect, useState } from 'react';
import styles from './Slider.module.scss';
import classNames from 'classnames';

const widthSpan = 100.1;

type Props = {
  children: React.ReactNode;
  infinite: boolean;
};

export const Slider: React.FC<Props> = ({ children, infinite }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [touchEndPosition, setTouchEndPosition] = useState(0);
  const [touched, setTouched] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState(0);
  const [mouseEndPosition, setMouseEndPosition] = useState(0);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [mouseSwiped, setMouseSwiped] = useState(false);

  const translatePartialSlides = (toTranslate: number) => {
    const currentTranslation = -sliderPosition * widthSpan;
    const totalTranslation = currentTranslation + toTranslate;

    for (let i = 0; i < React.Children.count(children); i++) {
      const elem = document.getElementById(`carouselItem` + i);

      if (elem) {
        elem.style.transform = `translateX(` + totalTranslation + `%)`;
      }
    }
  };

  const translateFullSlides = (newPosition: number) => {
    const toTranslate = -widthSpan * newPosition;

    for (let i = 0; i < React.Children.count(children); i++) {
      const elem = document.getElementById(`carouselItem` + i);

      if (elem) {
        elem.style.transform = `translateX(` + toTranslate + `%)`;
      }
    }
  };

  const prevSlideHandler = (): void => {
    let newPosition: number = sliderPosition;

    if (newPosition > 0) {
      newPosition = newPosition - 1;
    } else if (infinite && children) {
      newPosition = React.Children.count(children) - 1;
    }

    translateFullSlides(newPosition);
    setSliderPosition(newPosition);
  };

  const nextSlideHandler = () => {
    let newPosition = sliderPosition;

    if (newPosition < React.Children.count(children) - 1) {
      newPosition = newPosition + 1;
    } else if (infinite) {
      newPosition = 0;
    }

    translateFullSlides(newPosition);
    setSliderPosition(newPosition);
  };

  const jumpToSlideHandler = (id: number) => {
    translateFullSlides(id);
    setSliderPosition(id);
  };

  const speedUpAnimation = () => {
    for (
      let i = Math.max(0, sliderPosition - 2);
      i < Math.min(React.Children.count(children), sliderPosition + 3);
      i++
    ) {
      const elem = document.getElementById(`carouselItem` + i);

      if (elem) {
        elem.classList.add(styles.FastAnimation);
      }
    }
  };

  const slowDownAnimation = () => {
    for (
      let i = Math.max(0, sliderPosition - 2);
      i < Math.min(React.Children.count(children), sliderPosition + 3);
      i++
    ) {
      const elem = document.getElementById(`carouselItem` + i);

      if (elem) {
        elem.classList.remove(styles.FastAnimation);
      }
    }
  };

  const touchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    speedUpAnimation();
    setTouchStartPosition(event.targetTouches[0].clientX);
    setTouchEndPosition(event.targetTouches[0].clientX);
    setTouched(true);
  };

  const touchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndPosition(event.targetTouches[0].clientX);
    const frameWidth = document.getElementById('DisplayFrame')?.offsetWidth;

    if (frameWidth) {
      const translateDist =
        ((touchEndPosition - touchStartPosition) / frameWidth) * 100;

      translatePartialSlides(translateDist);
      if (touched === true) {
        setSwiped(true);
      }
    }
  };

  const touchEndHandler = () => {
    if (swiped) {
      slowDownAnimation();
      if (touchStartPosition - touchEndPosition > 75) {
        nextSlideHandler();
      } else if (touchStartPosition - touchEndPosition < -75) {
        prevSlideHandler();
      } else {
        jumpToSlideHandler(sliderPosition);
      }
    }

    setTouched(false);
    setSwiped(false);
  };

  const mouseStartHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    speedUpAnimation();
    setMouseStartPosition(event.clientX);
    setMouseEndPosition(event.clientX);
    setMouseClicked(true);
  };

  const mouseMoveHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const frameWidth = document.getElementById('DisplayFrame')?.offsetWidth;

    if (frameWidth) {
      if (mouseClicked === true) {
        setMouseEndPosition(event.clientX);
        const translateDist =
          ((mouseEndPosition - mouseStartPosition) / frameWidth) * 100;

        translatePartialSlides(translateDist);
        setMouseSwiped(true);
      }
    }
  };

  const mouseEndHandler = () => {
    slowDownAnimation();
    if (mouseSwiped === true) {
      if (mouseStartPosition - mouseEndPosition > 100) {
        nextSlideHandler();
      } else if (mouseStartPosition - mouseEndPosition < -100) {
        prevSlideHandler();
      } else {
        jumpToSlideHandler(sliderPosition);
      }
    }

    setMouseClicked(false);
    setMouseSwiped(false);
  };

  const onClickHandler = () => {
    if (sliderPosition === React.Children.count(children) - 1) {
      setSliderPosition(0);
      jumpToSlideHandler(0);

      return;
    }

    jumpToSlideHandler(sliderPosition + 1);
  };

  const displayItems = Children.map(children, (child, index) => (
    <div className={styles.slider__image} id={`carouselItem` + index}>
      {child}
    </div>
  ));

  const positionIndicators = Children.map(children, (_, index) => (
    <div
      className={classNames(styles.slider__dot, {
        [styles['slider__dot--active']]: sliderPosition === index,
      })}
      onClick={() => jumpToSlideHandler(index)}
    ></div>
  ));

  const handleOnClickLeft = () => {
    if (sliderPosition === 0) {
      setSliderPosition(React.Children.count(children) - 1);
      jumpToSlideHandler(React.Children.count(children) - 1);

      return;
    }

    jumpToSlideHandler(sliderPosition - 1);
  };

  const handleOnClickRight = () => {
    if (sliderPosition === React.Children.count(children) - 1) {
      setSliderPosition(0);
      jumpToSlideHandler(0);

      return;
    }

    jumpToSlideHandler(sliderPosition + 1);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleOnClickRight();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <>
      <div className={styles.slider}>
        <button
          className={classNames(styles.slider__button, [
            styles['slider__button-left'],
          ])}
          onClick={handleOnClickLeft}
        />
        <div
          className={styles.slider__displayFrame}
          id="DisplayFrame"
          onTouchStart={event => touchStartHandler(event)}
          onTouchMove={event => touchMoveHandler(event)}
          onTouchEnd={touchEndHandler}
          onMouseDown={event => mouseStartHandler(event)}
          onMouseMove={event => mouseMoveHandler(event)}
          onMouseUp={mouseEndHandler}
          onMouseLeave={mouseEndHandler}
          onClick={onClickHandler}
        >
          {displayItems}
        </div>
        <button
          className={classNames(styles.slider__button, [
            styles['slider__button-right'],
          ])}
          onClick={handleOnClickRight}
        />
      </div>

      <div className={styles.slider__dots}>{positionIndicators}</div>
    </>
  );
};
