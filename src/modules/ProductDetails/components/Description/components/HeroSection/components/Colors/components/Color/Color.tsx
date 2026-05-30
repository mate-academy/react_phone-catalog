/* eslint-disable max-len */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductsContext } from '../../../../../../../../../../context/ProductsContext';
import { CurrentProduct } from '../../../../../../../../../../context/ProductsContext/types/CurrentProduct';
import { SearchContext } from '../../../../../../../../../../context/SearchContext';
import SCSSVariables from '../../../../../../../../../../utils/Variables.module.scss';
import { REGEX } from '../../constants/Regex';
import styles from './Color.module.scss';

interface Props {
  value: string;
  colorName: string;
}

export const Color: React.FC<Props> = React.memo(({ value, colorName }) => {
  const { currentProduct, categories } = useContext(ProductsContext);
  const { searchParams } = useContext(SearchContext);

  const { color, category, namespaceId, capacity } =
    currentProduct as CurrentProduct;
  const navigate = useNavigate();

  // #region styles

  const circleStyles: React.CSSProperties = {
    stroke: SCSSVariables.primaryColor,
  };

  const svgStyles: React.CSSProperties = {
    pointerEvents: 'none',
    cursor: 'default',
  };

  const getStylesCondition = (stylesObject: React.CSSProperties) => {
    return color === colorName ? stylesObject : {};
  };

  // #endregion
  // #region functions

  const onClickHandler = () => {
    const product = categories[category].find(_product => {
      if (
        _product.namespaceId === namespaceId &&
        _product.capacity === capacity &&
        _product.color.replace(REGEX, ' ') === colorName
      ) {
        return _product;
      }

      return;
    }) as CurrentProduct;

    navigate({
      pathname: `/${category}/${product.id}`,
      search: searchParams ? searchParams.toString() : '',
    });
  };

  // #endregion

  return (
    <svg
      className={styles.color}
      style={getStylesCondition(svgStyles)}
      onClick={onClickHandler}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="14"
        fill={value}
        stroke="white"
        strokeWidth="2"
      />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="15.5"
        style={getStylesCondition(circleStyles)}
      />
    </svg>
  );
});

Color.displayName = 'Color';
