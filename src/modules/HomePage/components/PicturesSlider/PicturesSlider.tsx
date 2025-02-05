import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';
import { IconButton } from '../../../shared/components/IconButton';
import { IconButtonSVGOption } from '../../../shared/types/enums';
import { useEffect, useRef, useState } from 'react';
import { Picture } from '../../types/types';
import { PictureSlide } from '../PictureSlide';
import { Dashes } from '../Dashes';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { getPageX } from '../../../shared/functions';
import { HandleSliderDragEvent } from '../../../shared/types/handlers';

type Props = {
  pictures: Picture[];
  className?: string;
};

export const PicturesSlider: React.FC<Props> = ({ pictures, className }) => {
  const { accessPrevious, accessNext } = useLanguage().localeTexts;
  const [position, setPosition] = useState(0);
  const [isDragged, setIsDragged] = useState(false);
  const [isClicked, setIsClicked] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [jumpScroll, setJumpScroll] = useState(true);
  const [positionToSet, setPositionToSet] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const intervalId = useRef<number | undefined>(undefined);
  const queuedSwipe = useRef(0);
  const startDragPosition = useRef(0);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const getSlidesWidth = (amountOfSlides: number): number => {
    const list = listRef.current;

    if (list) {
      return amountOfSlides * list.clientWidth;
    }

    return 0;
  };

  const getStep = (start: number, end: number): number => {
    const list = listRef.current;

    if (list) {
      const width = list.clientWidth;
      const distanceToStep = width / 5;

      return Math.ceil((Math.abs(end - start) - distanceToStep) / width);
    }

    return 0;
  };

  const setUpForScroll = (newPosition: number) => {
    setPositionToSet(newPosition);
    setJumpScroll(true);
    setIsMoving(true);
  };

  const buttonSwipe = (step: number) => {
    if (isMoving) {
      queuedSwipe.current = step;
    } else {
      setUpForScroll(position + step);
    }
  };

  const handleSliderDrag = (event: HandleSliderDragEvent) => {
    const list = listRef.current;

    if (isDragged && list) {
      const distance = startX.current - getPageX(event);

      list.scrollLeft = startScrollLeft.current + distance;

      if (Math.abs(distance) > 5) {
        setIsClicked(false);
      }
    }
  };

  const handleSliderStopDrag = () => {
    const list = listRef.current;

    if (isDragged && list) {
      const { scrollLeft } = list;
      const startScroll = startScrollLeft.current;
      const startPosition = startDragPosition.current;

      setIsDragged(false);

      const distanceStep = getStep(startScroll, scrollLeft);
      const positionStep = getStep(
        getSlidesWidth(pictures.length + startPosition),
        scrollLeft,
      );
      const step =
        (distanceStep < positionStep ? distanceStep : positionStep) *
        (scrollLeft > startScroll ? 1 : -1);

      setUpForScroll(startPosition + step);
    }
  };

  const handleSliderStartDrag = (event: HandleSliderDragEvent) => {
    const list = listRef.current;

    if (list) {
      setIsDragged(true);
      setIsClicked(true);
      queuedSwipe.current = 0;
      startX.current = getPageX(event);

      startDragPosition.current =
        Math.round(list.scrollLeft / list.clientWidth) - pictures.length;

      startScrollLeft.current = event.currentTarget.scrollLeft;
      list.scrollLeft = startScrollLeft.current;
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const list = event.currentTarget;

    if (list.scrollLeft === getSlidesWidth(pictures.length + position)) {
      setIsMoving(false);
    }
  };

  const handlePrevSwipeButtonClick = () => {
    buttonSwipe(-1);
  };

  const handleNextSwipeButtonClick = () => {
    buttonSwipe(1);
  };

  const handleDashClick = (newPosition: number) => {
    setUpForScroll(newPosition);
  };

  useEffect(() => {
    setJumpScroll(true);
  }, [pictures.length]);

  useEffect(() => {
    const handleResize = () => {
      setJumpScroll(true);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.clearInterval(intervalId.current);

    intervalId.current = window.setInterval(() => {
      if (!isDragged) {
        setUpForScroll(position + 1);
      }
    }, 5000);

    return () => {
      window.clearInterval(intervalId.current);
    };
  }, [position, isDragged, isMoving]);

  useEffect(() => {
    if (positionToSet !== null) {
      const list = listRef.current;

      if (list) {
        const picturesAmount = pictures.length;
        const picturesWidth = getSlidesWidth(picturesAmount);
        let newPosition = positionToSet;

        if (newPosition < -picturesAmount) {
          newPosition = -picturesAmount;
        } else if (newPosition >= picturesAmount * 2) {
          newPosition = picturesAmount * 2 - 1;
        }

        if (newPosition < 0) {
          list.scrollLeft += picturesWidth;
          newPosition += picturesAmount;
        } else if (newPosition >= picturesAmount) {
          list.scrollLeft -= picturesWidth;
          newPosition -= picturesAmount;
        }

        setPosition(newPosition);
        setPositionToSet(null);
        setJumpScroll(false);
      }
    }
  }, [positionToSet, pictures.length]);

  useEffect(() => {
    const list = listRef.current;

    if (positionToSet === null && list) {
      list.scrollLeft = getSlidesWidth(pictures.length + position);

      if (jumpScroll) {
        setJumpScroll(false);
      }
    }
  }, [position, jumpScroll, positionToSet, pictures.length]);

  useEffect(() => {
    if (!isMoving && queuedSwipe.current) {
      setUpForScroll(position + queuedSwipe.current);
      queuedSwipe.current = 0;
    }
  }, [isMoving, position]);

  const getSlides = (): React.JSX.Element[] => {
    const slides: React.JSX.Element[] = [];

    for (let i = -1; i <= 1; i++) {
      slides.push(
        ...pictures.map((picture, index) => (
          <PictureSlide
            key={picture.image + i}
            picture={picture}
            tabbable={i === 0 && index === position}
            isClicked={isClicked}
            className={styles.PictureSlide}
          />
        )),
      );
    }

    return slides;
  };

  return (
    <article className={classNames(styles.PicturesSlider, className)}>
      <IconButton
        svgOption={IconButtonSVGOption.LeftArrow}
        onClick={handlePrevSwipeButtonClick}
        label={accessPrevious}
        className={styles.SwipeButton}
      />

      <div className={styles.Wrapper}>
        <ul
          className={classNames(
            styles.List,
            (isDragged || jumpScroll) && styles.List_dragged,
          )}
          ref={listRef}
          onMouseDown={handleSliderStartDrag}
          onTouchStart={handleSliderStartDrag}
          onMouseMove={handleSliderDrag}
          onTouchMove={handleSliderDrag}
          onMouseUp={handleSliderStopDrag}
          onTouchEnd={handleSliderStopDrag}
          onMouseLeave={handleSliderStopDrag}
          onScroll={handleScroll}
        >
          {getSlides()}
        </ul>
      </div>

      <IconButton
        svgOption={IconButtonSVGOption.RightArrow}
        onClick={handleNextSwipeButtonClick}
        label={accessNext}
        className={styles.SwipeButton}
      />

      <Dashes
        amount={pictures.length}
        position={position}
        onClick={handleDashClick}
        className={styles.Dashes}
      />
    </article>
  );
};
