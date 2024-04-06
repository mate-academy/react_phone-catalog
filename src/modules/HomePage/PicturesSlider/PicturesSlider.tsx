import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Picture } from '../../../types/Picture';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { imgsMobile, imgs } from '../../shared/imgsForDevices';
import { getImages } from '../../../services/getImages';
import { PADDINGS } from '../../constants/PADDINGS';

type Props = {
  windowSize: number;
};

const GAP_BETWEEN_COLUMNS = 16;
const COLUMNS = 12;

export const PicturesSlider: React.FC<Props> = ({ windowSize }) => {
  const [position, setPosition] = useState<number>(0);
  const [imgPosition, setImgPosition] = useState<number>(0);
  const [size, setSize] = useState(windowSize);
  const [images, setImages] = useState<Picture[]>(getImages(windowSize));

  const imagesRef = useRef<HTMLDivElement>(null);

  const oneStep =
    windowSize > WIDTH_DEVICES.mobile
      ? ((windowSize -
          PADDINGS.tablet * 2 -
          GAP_BETWEEN_COLUMNS * (COLUMNS - 1)) /
          COLUMNS) *
          10 +
        GAP_BETWEEN_COLUMNS * 9
      : windowSize;

  const selectPicture = (index: number) => {
    setPosition(index * oneStep);
    setImgPosition(index);
  };

  const moveLeft = () => {
    if (size !== windowSize) {
      setSize(windowSize);
    }

    if (imgPosition > 0) {
      setImgPosition(prevPosition => prevPosition - 1);
      setPosition(prevPosition => prevPosition - oneStep);
    }
  };

  const moveRight = () => {
    if (size !== windowSize) {
      setSize(windowSize);
    }

    if (imgPosition < images.length - 1) {
      setImgPosition(prevPosition => prevPosition + 1);
      setPosition(prevPosition => prevPosition + oneStep);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (imgPosition >= images.length - 1) {
  //       setPosition(0);
  //       setImgPosition(0);

  //       return;
  //     }

  //     setPosition(prevPosition => prevPosition + oneStep);
  //     setImgPosition(prevPosition => prevPosition + 1);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [images.length, imgPosition, oneStep, windowSize]);

  useEffect(() => {
    if (size !== windowSize && imgPosition !== 0) {
      setSize(windowSize);
      setPosition(imgPosition * oneStep);
    }
  }, [imgPosition, oneStep, size, windowSize]);

  useEffect(() => {
    if (windowSize <= WIDTH_DEVICES.mobile && images !== imgsMobile) {
      setImages(imgsMobile);
    }

    if (windowSize > WIDTH_DEVICES.mobile && images !== imgs) {
      setImages(imgs);
    }
  }, [images, windowSize]); // setting images depending on the width of the devices

  // console.log(windowSize);
  // console.log(position);

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__images-container">
        <button
          type="button"
          className={cn('pictures-slider__move-left', {
            disabled: imgPosition <= 0,
          })}
          onClick={moveLeft}
        >
          &lt;
        </button>

        <div className="pictures-slider__images-wrapper">
          <div
            className="pictures-slider__images"
            style={{ left: `-${position}px` }}
          >
            {images.map(img => (
              <div
                className="pictures-slider__img-wrapper"
                ref={imagesRef}
                key={img.id}
                style={{ width: `${oneStep}px` }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className={`pictures-slider__img pictures-slider__img--${img.id}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={cn('pictures-slider__move-right', {
            disabled: imgPosition >= images.length - 1,
          })}
          onClick={moveRight}
        >
          &gt;
        </button>
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
};
