import React from 'react';
import classNames from 'classnames';
import { Product, ProductDetails } from '../../../../types';
import { colorMap } from '../../helpers';

type Props = {
  productDetails: ProductDetails;
  product: Product | undefined;
  selectedColor: string | null;
  onColorChange: (color: string) => void;
};

export const ProductColors: React.FC<Props> = ({
  productDetails,
  product,
  selectedColor,
  onColorChange,
}) => {
  return (
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
  );
};
