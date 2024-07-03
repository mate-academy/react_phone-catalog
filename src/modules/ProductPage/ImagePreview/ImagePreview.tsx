import React, { useState } from 'react';
import cn from 'classnames';
import { Device } from '../../../types/Device';

type Props = {
  device: Device;
};

export const ImagePreview: React.FC<Props> = React.memo(({ device }) => {
  const [activeImg, setActiveImg] = useState(device.images[0]);

  return (
    <div className="image-preview">
      <div className="image-preview__main-img-wrapper">
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
