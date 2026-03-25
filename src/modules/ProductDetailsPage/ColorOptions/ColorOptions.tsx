import classNames from 'classnames';
import style from './ColorOptions.module.scss';
import React from 'react';
import { PathType, Product } from '../../../types/Types';
import { getColor } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: Product;
};

export const ColorOptions: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const handleChangeColor = (color: string) => {
    const urlPartCapacity = product.capacity.toLowerCase();
    const urlPartColor = color.toLowerCase().replace(/\s+/g, '-');

    navigate(
      `/${PathType.PRODUCT}/${product.namespaceId}-${urlPartCapacity}-${urlPartColor}`,
    );
  };

  return (
    <div className={style.colorOptions}>
      <div className={style.colorOptions__headerContainer}>
        <span className={style.colorOptions__header}>Available colors</span>
        <span
          className={classNames(
            style.colorOptions__header,
            style['colorOptions__header--id'],
          )}
        >
          {product.namespaceId}
        </span>
      </div>

      <div className={style.colorOptions__bottomContainer}>
        {product?.colorsAvailable.map(color => (
          <label
            key={color}
            className={classNames(style.colorOptions__label, {
              [style['colorOptions__label--active']]: color === product.color,
            })}
            style={{ backgroundColor: getColor(color) }}
          >
            <span
              className={style.colorOptions__hidden}
            >{`Color ${color}`}</span>
            <input
              type="radio"
              name={`${color}-${product.id}`}
              checked={color === product.color}
              className={style.colorOptions__radio}
              onChange={() => handleChangeColor(color)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
