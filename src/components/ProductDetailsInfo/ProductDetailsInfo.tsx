import { FC } from 'react';
import { Device } from '../../types/Device';

type Props = {
  deviceInfo: Device;
};

export const ProductDetailsInfo: FC<Props> = ({ deviceInfo }) => {
  return (
    <div className="product-details__info">
      <div
        className="product-details__about"
        data-cy="productDescription"
      >
        <h2 className="product-details__subtitle">About</h2>
        <br />
        {deviceInfo.description.map(({ title, text }) => (
          <div key={title}>
            <h3 className="product-details__title">{title}</h3>
            <p className="product-details__text">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="product-details__specs">
        <h2 className="product-details__subtitle">Tech specs</h2>
        <br />
        <p className="product-details__data">
          Screen
          <span>
            {deviceInfo.screen}
          </span>
        </p>
        <p className="product-details__data">
          Resolution
          <span>
            {deviceInfo.resolution}
          </span>
        </p>
        <p className="product-details__data">
          Processor
          <span>
            {deviceInfo.processor}
          </span>
        </p>
        <p className="product-details__data">
          RAM
          <span>
            {deviceInfo.ram}
          </span>
        </p>
        <p className="product-details__data">
          Built in memory
          <span>
            {deviceInfo.capacity}
          </span>
        </p>
        <p className="product-details__data">
          Camera
          <span>
            {deviceInfo.camera}
          </span>
        </p>
        <p className="product-details__data">
          Zoom
          <span>
            {deviceInfo.zoom}
          </span>
        </p>
        <p className="product-details__data">
          Cell
          <span>
            {deviceInfo.cell.join(', ') || '-'}
          </span>
        </p>
      </div>
    </div>
  );
};
