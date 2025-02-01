import React from 'react';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { ProductType } from '../../types/ProductType';
import style from './ProductColors.module.scss';

type Props = {
  productDetails: ProductDetailsType;
  product: ProductType | undefined;
  selectedColor: string | null;
  onColorChange: (color: string) => void;
};

export const ProductColors: React.FC<Props> = ({
  onColorChange,
  product,
  productDetails,
  selectedColor,
}) => {
  return (
    <div className={style.product_details__colors}>
      <div className={style.product_details__colors_wrapper}>
        <span className={style.product_details__colors_title}>
          Available colors
        </span>
        <span className={style.product_details__product_id}>
          {`ID: ${product?.id}`}
        </span>
      </div>
      <ul className={style.product_details__colors_list}>
        {productDetails.colorsAvailable.map(color => (
          <li key={color} className={style.product_details__colors_item}>
            <button
              className={`${style.product_details__colors_button} ${selectedColor === color ? `${style.selected}` : ''}`}
              onClick={() => onColorChange(color)}
            >
              <div
                className={style.product_details__colors_inner}
                style={{ backgroundColor: color }}
              ></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
