import { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ProductButtons } from '../ProductButtons/ProductButtons';

import { Device } from '../../types/Device';
import { Product } from '../../types/Product';

type Props = {
  deviceInfo: Device;
  device: Product;
};

export const ProductDetailsMainInfo: FC<Props> = ({
  deviceInfo,
  device,
}) => {
  const changeDeviceByColor = (color: string) => {
    const product = device?.phoneId.split('-');

    product?.splice(-1, 1, color.toLocaleLowerCase());

    return product?.join('-');
  };

  const changeDeviceByCapacity = (capacity: string) => {
    const product = device?.phoneId.split('-');

    product?.splice(-2, 1, capacity.toLocaleLowerCase());

    return product?.join('-');
  };

  return (
    <div className="product-details__main-info">
      <p className="product-details__colors">
        Available colors
        <span className="product-details__colors-content">
          {deviceInfo.colorsAvailable.map(color => (
            <NavLink
              key={color}
              to={`/${device.category}/${changeDeviceByColor(color)}`}
              className={classNames(
                'product-details__button-colors',
                {
                  'product-details__button-colors--active':
                    device.color === color,
                },
                {
                  'product-details__button-colors--rosegold':
                    color === 'rosegold',
                },
                {
                  'product-details__button-colors--spacegray':
                    color === 'spacegray',
                },
              )}
              style={{ backgroundColor: `${color}` }}
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
            />
          ))}
        </span>
      </p>

      <p className="product-details__capacity">
        Select capacity
        <span className="product-details__capacity-content">
          {deviceInfo.capacityAvailable.map(capacity => (
            <NavLink
              key={capacity}
              to={`/${device.category}/${changeDeviceByCapacity(capacity)}`}
              className={classNames(
                'product-details__button',
                'product-details__button-capacity',
                {
                  'product-details__button-capacity--active':
                    device.capacity === capacity,
                },
              )}
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              {capacity}
            </NavLink>
          ))}
        </span>
      </p>

      <p className="product-details__price">
        <span className="product-details__current-price">
          {`$${device.price}`}
        </span>

        {device.price !== device.fullPrice && (
          <span className="product-details__old-price">
            {`$${device.fullPrice}`}
          </span>
        )}
      </p>
      <ProductButtons
        product={device}
      />
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
    </div>
  );
};
