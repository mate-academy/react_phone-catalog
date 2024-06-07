import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Picture } from '../../../types/Picture';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { imgsMobile, imgs } from '../../../services/imgsForDevices';
import { getImages } from '../../../services/getImages';
import { PADDINGS } from '../../constants/PADDINGS';
import {
  COLUMN_SIZE_FOR_DESCTOP,
  DESCTOP_COLUMNS,
  GAP_BETWEEN_COLUMNS,
  TABLET_COLUMNS,
} from '../../constants/PARAMS_OF_PAGE';
import { getSliderImages } from '../../../services/getSliderImages';
import { MoveButton } from '../../shared/Buttons/MoveButtons';
import { WindowWidthContext } from '../../../store/WindowWidthContext';

export const PicturesSlider: React.FC = React.memo(() => {
  const { windowSize } = useContext(WindowWidthContext);

  const [position, setPosition] = useState<number>(0);
  const [imgPosition, setImgPosition] = useState<number>(0);
  const [currentSize, setCurrentSize] = useState(windowSize);
  const [images, setImages] = useState<Picture[]>(getImages(windowSize));

  const [touchStart, setTouchStart] = useState<{ x: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number } | null>(null);

  const imagesRef = useRef<HTMLDivElement>(null);

  const oneStepForTablet =
    ((windowSize -
      PADDINGS.tablet * 2 -
      GAP_BETWEEN_COLUMNS * (TABLET_COLUMNS - 1)) /
      TABLET_COLUMNS) *
      (TABLET_COLUMNS - 2) +
    GAP_BETWEEN_COLUMNS * 9;

  const oneStepForDesctop =
    (DESCTOP_COLUMNS - 2) * COLUMN_SIZE_FOR_DESCTOP +
    GAP_BETWEEN_COLUMNS * (DESCTOP_COLUMNS - 3);

  const getStepForDevices = useCallback(() => {
    if (windowSize >= WIDTH_DEVICES.desctop) {
      return oneStepForDesctop;
    }

    if (
      windowSize > WIDTH_DEVICES.mobile &&
      windowSize <= WIDTH_DEVICES.tablet
    ) {
      return oneStepForTablet;
    }

    return windowSize;
  }, [windowSize, oneStepForDesctop, oneStepForTablet]);

  const selectPicture = (index: number) => {
    setPosition(index * getStepForDevices());
    setImgPosition(index);
  };

  const moveLeft = () => {
    if (currentSize !== windowSize) {
      setCurrentSize(windowSize);
    }

    if (imgPosition > 0) {
      setImgPosition(prevPosition => prevPosition - 1);
      setPosition(prevPosition => prevPosition - getStepForDevices());
    }

    if (imgPosition === 0) {
      const newImgPosition = images.length - 1;
      const newPosition = newImgPosition * getStepForDevices();

      setImgPosition(newImgPosition);
      setPosition(newPosition);
    }
  };

  const moveRight = () => {
    if (currentSize !== windowSize) {
      setCurrentSize(windowSize);
    }

    if (imgPosition < images.length - 1) {
      setImgPosition(prevPosition => prevPosition + 1);
      setPosition(prevPosition => prevPosition + getStepForDevices());
    }

    if (imgPosition === images.length - 1) {
      setImgPosition(0);
      setPosition(0);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart({ x: event.touches[0].clientX });
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd({ x: event.touches[0].clientX });
  };

  const handleTouchEnd = () => {
    if (touchStart && touchEnd) {
      const deltaX = touchEnd.x - touchStart.x;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          moveLeft();
        } else {
          moveRight();
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (imgPosition >= images.length - 1) {
        setPosition(0);
        setImgPosition(0);

        return;
      }

      setPosition(prevPosition => prevPosition + getStepForDevices());
      setImgPosition(prevPosition => prevPosition + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [getStepForDevices, images.length, imgPosition, windowSize]);
  // change pictures every 5 seconds

  useEffect(() => {
    if (currentSize !== windowSize && imgPosition !== 0) {
      setCurrentSize(windowSize);
      setPosition(imgPosition * getStepForDevices());
    }
  }, [imgPosition, currentSize, windowSize, getStepForDevices]);
  // adapting picture position at changing size of window

  useEffect(() => {
    if (windowSize <= WIDTH_DEVICES.mobile && images !== imgsMobile) {
      setImages(imgsMobile);
    }

    if (windowSize > WIDTH_DEVICES.mobile && images !== imgs) {
      setImages(imgs);
    }
  }, [images, windowSize]);
  // setting images depending on the width of the devices

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__images-container">
        <div className="pictures-slider__move-left">
          <MoveButton move={moveLeft} />
        </div>

        <div
          className="pictures-slider__images-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="pictures-slider__images"
            style={{ left: `-${position}px` }}
          >
            {images.map(img => (
              <div
                className="pictures-slider__img-wrapper"
                ref={imagesRef}
                key={img.id}
                style={{ width: `${getStepForDevices()}px` }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className={`pictures-slider__img pictures-slider__img--${img.id}`}
                />
                <Link
                  to="/"
                  className={`pictures-slider__order-link pictures-slider__order-link--${img.id}`}
                >
                  <img
                    src={getSliderImages().tabletOrderNow}
                    alt="order now"
                    className={`pictures-slider__order-img pictures-slider__order-img--${img.id}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="pictures-slider__move-right">
          <MoveButton move={moveRight} />
        </div>
      </div>

      <div className="pictures-slider__lines">
        {images.map((img, index) => (
          <button
            type="button"
            key={img.id}
            className="pictures-slider__button"
            onClick={() => selectPicture(index)}
            aria-label={`Slide ${index + 1}`}
          >
            <div
              className={cn('pictures-slider__line', {
                'pictures-slider__line--active': imgPosition === index,
              })}
            />
          </button>
        ))}
      </div>
    </div>
  );
});
