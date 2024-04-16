import classNames from 'classnames';
import styles from './VariableChars.module.scss';
import { colors } from '../../../../helpers/constArrs';
import React from 'react';
import { ProductInfo } from '../../../../types/ProductInfo';
import { ParamType } from '../../../../types/ParamType';
import { getNewParams } from '../../../../helpers/gaetNewParams';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: ProductInfo;
  productId: string;
};

export const VariableChars: React.FC<Props> = ({ product, productId }) => {
  const navigate = useNavigate();

  const handleGetParam = (newParam: string, type: ParamType) => {
    navigate(`../${getNewParams(productId, newParam, type)}`);
  };

  return (
    <div className={styles.variableCharsWrap}>
      <div className={styles.variableChars}>
        <p>Available colors</p>
        <div className={styles.colorWrap}>
          {product.colorsAvailable.map(colorName => (
            <span
              key={colorName}
              className={classNames(styles.color, {
                [styles.colorActive]: product.color === colorName,
              })}
              onClick={() => handleGetParam(colorName, 'color')}
              style={{ backgroundColor: colors[colorName] }}
            ></span>
          ))}
        </div>
      </div>

      <span className={styles.divider}></span>

      <div className={styles.variableChars}>
        <p>Select capacity</p>
        <ul className={styles.capacityWrap}>
          {product.capacityAvailable.map(capacity => (
            <li
              key={capacity}
              className={classNames(styles.capacity, {
                [styles.capacityActive]: product.capacity === capacity,
              })}
              onClick={() => handleGetParam(capacity, 'capacity')}
            >
              {capacity.replace('GB', ' GB')}
            </li>
          ))}
        </ul>
      </div>

      <span className={styles.divider}></span>
    </div>
  );
};
