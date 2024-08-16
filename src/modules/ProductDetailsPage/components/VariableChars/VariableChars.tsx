import React from 'react';
import classNames from 'classnames';
import styles from './VariableChars.module.scss';
import { colors } from '../../../../helpers/constArrs';
import { ProductInfo } from '../../../../types/ProductInfo';
import { useNavigate } from 'react-router-dom';

type Props = {
  product: ProductInfo;
  productId: string;
};

export const VariableChars: React.FC<Props> = ({ product }) => {
  const {
    category,
    namespaceId,
    capacity,
    color,
    colorsAvailable,
    capacityAvailable,
  } = product;

  const navigate = useNavigate();

  return (
    <div className={styles.variableCharsWrap}>
      <div className={styles.variableChars}>
        <p>Available colors</p>

        <ul className={styles.colorWrap}>
          {colorsAvailable.map(colorName => {
            const colorVar = colors.find(c => c.name === colorName);

            if (!colorVar) {
              return null;
            }

            return (
              <li
                key={colorName}
                className={classNames(styles.color, {
                  [styles.colorActive]: product.color === colorName,
                })}
                style={{ backgroundColor: colorVar.value }}
                onClick={() =>
                  navigate(
                    `/${category}/${namespaceId}-${capacity.toLowerCase()}-${colorName.replace(' ', '-')}`,
                  )
                }
              ></li>
            );
          })}
        </ul>
      </div>

      <span className={styles.divider}></span>

      <div className={styles.variableChars}>
        <p>Select capacity</p>
        <ul className={styles.capacityWrap}>
          {capacityAvailable.map(capacityValue => (
            <li
              key={capacityValue}
              className={classNames(styles.capacity, {
                [styles.capacityActive]: capacityValue === capacity,
              })}
              onClick={() =>
                navigate(
                  `/${category}/${namespaceId}-${capacityValue.toLowerCase()}-${color}`,
                )
              }
            >
              {capacityValue.replace('GB', ' GB')}
            </li>
          ))}
        </ul>
      </div>

      <span className={styles.divider}></span>
    </div>
  );
};
