import React, { useState } from 'react';
import { Device } from '../../../types/device';
import './MainControl.scss';
import classNames from 'classnames';
import { ProductCard } from '../../ProductCard';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Device;
  className?: string;
};

export const MainControl: React.FC<Props> = ({ product, className = '' }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const { t } = useTranslation();

  const handleColorPick = (color: string) => {
    setSelectedColor(color);
  };

  const handleCapacityPick = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const newProduct = {
    ...product,
    capacity: selectedCapacity || product.capacity,
  };

  return (
    <form
      action="submit"
      className={`Main-Control ${className}`}
      onSubmit={handleOnSubmit}
    >
      <div className="colors">
        <div className="colors__block">
          <p className="colors__block--title small-text">
            {t('Available colors')}
          </p>

          <div className="colors__block--flex">
            {product.colorsAvailable.map(color => (
              <button
                className={classNames('colors__block--colors', {
                  'colors__block--colors--active': selectedColor === color,
                })}
                key={color}
                onClick={() => handleColorPick(color)}
              >
                <div className={`colors__block--colors--color ${color}`}></div>
              </button>
            ))}
          </div>
        </div>
        <p className="colors__id small-text">ID: 802390</p>
      </div>

      <div className="line"></div>

      <div className="select-capacity">
        <p className="select-capacity__title small-text">
          {t('Select capacity')}
        </p>

        <div className="select-capacity__block">
          {product.capacityAvailable.map(capacity => (
            <button
              key={capacity}
              className={classNames(
                'select-capacity__block--button body-text',
                {
                  'select-capacity__block--button--active':
                    selectedCapacity === capacity,
                },
              )}
              onClick={() => handleCapacityPick(capacity)}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      <div className="line line--mb32"></div>

      <ProductCard device={newProduct} className="Main-Control__bottom" />
    </form>
  );
};
