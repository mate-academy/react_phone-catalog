import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Picture } from '../../../types/Picture';
import { WIDTH_DEVICES } from '../../constants/WIDTH_DEVICES';
import { imgsMobile, imgs } from '../../shared/imgsForDevices';
import { getImages } from '../../../services/getImages';

type Props = {
  windowSize: number;
};

export const PicturesSlider: React.FC<Props> = ({ windowSize }) => {
  const [position, setPosition] = useState<number>(0);
  const [imgPosition, setImgPosition] = useState<number>(0);
  const [delay, setDelay] = useState(0.3);
  const [size, setSize] = useState(windowSize);
  const [images, setImages] = useState<Picture[]>(getImages(windowSize));

  const imagesRef = useRef<HTMLDivElement>(null);

  const selectPicture = (index: number) => {
    setPosition(index * windowSize);
    setImgPosition(index);

    if (!delay) {
      setDelay(0.3);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!delay) {
        setDelay(0.3);
      }

      if (imgPosition >= images.length - 1) {
        setPosition(0);
        setImgPosition(0);

        return;
      }

      setPosition(prevPosition => prevPosition + windowSize);
      setImgPosition(prevPosition => prevPosition + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [delay, images.length, imgPosition, windowSize]);

  useEffect(() => {
    if (size !== windowSize && imgPosition !== 0) {
      setSize(windowSize);
      setDelay(0);
      setPosition(imgPosition * windowSize);
    }
  }, [imgPosition, size, windowSize]);

  useEffect(() => {
    if (windowSize <= WIDTH_DEVICES.mobile && images !== imgsMobile) {
      setImages(imgsMobile);

      return;
    }

    if (windowSize > WIDTH_DEVICES.mobile && images !== imgs) {
      setImages(imgs);
    }
  }, [images, windowSize]);

  // console.log(heightSlider);

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__images-wrapper">
        <button
          type="button"
          className="pictures-slider__move-left"
          onClick={() => {}}
        >
          &lt;
        </button>

        <div
          className="pictures-slider__images"
          style={{
            left: `-${position}px`,
            transition: `${delay}s`,
          }}
        >
          {images.map(img => (
            <div
              className="pictures-slider__img-wrapper"
              ref={imagesRef}
              key={img.id}
              style={{ width: `${windowSize}px` }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className={`pictures-slider__img pictures-slider__img--${img.id}`}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="pictures-slider__move-right"
          onClick={() => {}}
        >
          &gt;
        </button>
      </div>

      <div className="pictures-slider__lines">
        {images.map((img, index) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            key={img.id}
            className={cn('pictures-slider__button', {
              'pictures-slider__button--active': imgPosition === index,
            })}
            onClick={() => selectPicture(index)}
          />
        ))}
      </div>
    </div>
  );
};
