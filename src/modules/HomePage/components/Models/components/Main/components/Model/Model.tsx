/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './Model.module.scss';
import { FirstPart } from './components/FirstPart';
import { SecondPart } from './components/SecondPart';
import { Divider } from './components/Divider';
import { ThirdPart } from './components/ThirdPart';
import { HOT_PRICES_TITLE } from '../../../../../../constants/ProductTitle';
import { ProductsContext } from '../../../../../../../../context/ProductsContext';
import { Product } from '../../../../../../../../types/CategoriesTypes/Product';

export const Model: React.FC<Product> = React.memo(props => {
  const { itemId, isMinWidthFixedValue, sectionTitle, screen, capacity, ram } =
    props;

  const { getCardWidth } = useContext(ProductsContext);

  const spec = [screen, capacity, ram];
  const productStyles: React.CSSProperties = {
    minWidth: isMinWidthFixedValue ? getCardWidth() : 'auto',
  };

  return (
    <div className={styles.product} style={productStyles}>
      <FirstPart
        props={props}
        isPriceHot={sectionTitle === HOT_PRICES_TITLE ? true : false}
      />
      <Divider />
      <SecondPart spec={spec} />
      <ThirdPart itemId={itemId} props={props} />
    </div>
  );
});

Model.displayName = 'Model';
