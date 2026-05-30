import React from 'react';
import style from './ProductColors.module.scss';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { ProductType } from '../../types/ProductType';

interface Props {
  onColorSelect: (color: string) => void;
  productDetails: ProductDetailsType;
  selectedColor: string | null;
  product: ProductType | undefined;
}

export const ProductColors: React.FC<Props> = ({
  onColorSelect,
  productDetails,
  selectedColor,
  product,
}) => {
  return (
    <div className={style.product_details__colors}>
      <div className={style.product_details__colors_wrapper}>
        <span className={style.product_details__colors_title}>
          Available colors
        </span>

        <span className={style.product_details__colors_id}>
          {`ID ${product?.id}`}
        </span>
      </div>

      <ul className={style.product_details__colors_list}>
        {productDetails.colorsAvailable.map(color => (
          <li key={color} className={style.product_details__colors_item}>
            <button
              className={`${style.product_details__colors_button} ${selectedColor === color ? `${style.selected}` : ''}`}
              onClick={() => onColorSelect(color)}
            >
              <div
                className={style.product_details__colors_inner}
                style={{ background: color }}
              ></div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
