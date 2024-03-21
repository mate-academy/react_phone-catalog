/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import React from 'react';

type Props = {
  block?: string;
  images: any[];
  activeImage: number;
  changeImage: (selectedImage: number) => void;
};

export const SliderThumbs: React.FC<Props> = ({
  images,
  block: className,
  activeImage,
  changeImage,
}) => {
  return (
    <div
      className={clsx('slider__thumbs', className && `${className}__thumbs`)}
    >
      <div
        className={clsx(
          'slider__thumbs-track',
          className && `${className}__thumbs-track`,
        )}
      >
        {images.map((image, index) => (
          <div
            key={image}
            role="button"
            onClick={() => changeImage(index)}
            onKeyDown={() => changeImage(index)}
            tabIndex={0}
            className={clsx(
              'slider__thumbs-item',
              activeImage === index && 'active',
            )}
          >
            <img src={image} alt={image} />
          </div>
        ))}
      </div>
    </div>
  );
};
