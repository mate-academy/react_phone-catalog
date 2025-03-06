/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useContext } from 'react';

import { ProductsContext } from '../../../../../../../../context/ProductsContext';
import { Product } from '../../../../../../../../types/CategoriesTypes/Product';
import { HOT_PRICES_TITLE } from '../../../../../../constants/ProductTitle';
import { Divider } from './components/Divider';
import { FirstPart } from './components/FirstPart';
import { SecondPart } from './components/SecondPart';
import { ThirdPart } from './components/ThirdPart';
import styles from './Model.module.scss';

export const Model: React.FC<Product> = React.memo(props => {
  const { itemId, isMinWidthFixedValue, sectionTitle, screen, capacity, ram } =
    props;

  const { getCardWidth } = useContext(ProductsContext);

  const spec = [screen, capacity, ram];
  const productStyles: React.CSSProperties = {
    minWidth: isMinWidthFixedValue ? getCardWidth() : 'auto',
  };

  const priceCondition = sectionTitle === HOT_PRICES_TITLE ? true : false;

  return (
    <div className={styles.product} style={productStyles}>
      <FirstPart props={props} isPriceHot={priceCondition} />
      <Divider />
      <SecondPart spec={spec} />
      <ThirdPart itemId={itemId} props={props} isPriceHot={priceCondition} />
    </div>
  );
});

Model.displayName = 'Model';
