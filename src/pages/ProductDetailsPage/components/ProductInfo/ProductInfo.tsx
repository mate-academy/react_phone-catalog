import React from 'react';
import classNames from 'classnames';
import { ProductDetails } from '../../../../types';
import { colorMap } from '../../helpers';

type Props = {
  productDetails: ProductDetails;
  product: ProductDetails | null;
  selectedColor: string;
  onColorChange: (color: string) => void;
  onCapacityChange: (capacity: string) => void;
};

export const ProductInfo: React.FC<Props> = ({
  productDetails,
  product,
  selectedColor,
  onColorChange,
  onCapacityChange,
}) => {
  // const [selectedColor, setSelectedColor] = useState<string | null>(
  //   productDetails.color,
  // );
  // const [selectedCapacity, setSelectedCapacity] = useState<string | null>(
  //   productDetails.capacity.toLowerCase(),
  // );

  // const handleColorChange = (color: string) => {
  //   setSelectedColor(color);
  // };

  // const handleCapacityChange = (capacity: string) => {
  //   setSelectedCapacity(capacity.toLowerCase());
  // };

  return (
    <div className="product-details__info">
      <div className="product-details__colors">
        <div className="product-details__colors-wrapper">
          <span
            className={classNames(
              'product-details__colors-title typography__small-text',
            )}
          >
            Available colors
          </span>
          <span className="product-details__product-id">
            {`ID: ${product?.id}`}
          </span>
        </div>
        <ul className="product-details__colors-list">
          {productDetails.colorsAvailable.map(color => (
            <li key={color} className="product-details__colors-item">
              <button
                className={`product-details__colors-button ${selectedColor === color ? 'selected' : ''}`}
                onClick={() => onColorChange(color)}
                // onClick={() => handleColorChange(color)}
              >
                <div
                  className="product-details__colors-inner"
                  style={{ backgroundColor: colorMap[color] }}
                ></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-details__capacity">
        <p className="product-details__capacity-title typography__small-text">
          Select capacity
        </p>
        <ul className="product-details__capacity-list">
          {productDetails.capacityAvailable.map(capacity => (
            <li key={capacity} className="product-details__capacity-item">
              <button
                className={classNames(
                  'product-details__capacity-button typography__body',
                  { selected: capacity === productDetails.capacity },
                )}
                onClick={() => onCapacityChange(capacity)}
                // onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
