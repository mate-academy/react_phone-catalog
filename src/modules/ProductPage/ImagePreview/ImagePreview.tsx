import React, { useState } from 'react';
import cn from 'classnames';
import { Device } from '../../../types/Device';

type Props = {
  device: Device;
};

export const ImagePreview: React.FC<Props> = React.memo(({ device }) => {
  const [activeImg, setActiveImg] = useState(device.images[0]);

  // #region
  // const [touchStart, setTouchStart] = useState<{ x: number } | null>(null);
  // const [touchEnd, setTouchEnd] = useState<{ x: number } | null>(null);

  // const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
  //   setTouchStart({ x: event.touches[0].clientX });
  // };

  // const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
  //   setTouchEnd({ x: event.touches[0].clientX });
  // };

  // const handleTouchEnd = () => {
  //   if (!touchStart || !touchEnd) {
  //     return;
  //   }

  //   const deltaX = touchEnd.x - touchStart.x;

  //   if (Math.abs(deltaX) <= 50) {
  //     setTouchStart(null);
  //     setTouchEnd(null);

  //     return;
  //   }

  //   const indx = device.images.findIndex(img => img === activeImg);

  //   if (deltaX > 0 && indx === 0) {
  //     setActiveImg(device.images[device.images.length - 1]);
  //   }

  //   if (deltaX > 0 && indx !== 0) {
  //     setActiveImg(device.images[indx - 1]);
  //   }

  //   if (deltaX < 0 && indx === device.images.length - 1) {
  //     setActiveImg(device.images[0]);
  //   }

  //   if (deltaX < 0 && indx >= 0 && indx !== device.images.length - 1) {
  //     setActiveImg(device.images[indx + 1]);
  //   }

  //   setTouchStart(null);
  //   setTouchEnd(null);
  // };
  // #endregion this code will be used for change images by swiping

  return (
    <div className="image-preview">
      <div
        className="image-preview__main-img-wrapper"
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        <img
          className="image-preview__main-img"
          src={activeImg}
          alt={device.name}
        />
      </div>

      <div className="image-preview__preview-collection">
        {device.images.map(img => (
          <button
            type="button"
            className={cn('image-preview__img-wrapper', {
              'is-active': img === activeImg,
            })}
            key={img}
            onClick={() => setActiveImg(img)}
          >
            <img src={img} alt={device.name} className="image-preview__img" />
          </button>
        ))}
      </div>
    </div>
  );
});
