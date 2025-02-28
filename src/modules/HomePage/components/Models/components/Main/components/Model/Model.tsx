/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './Model.module.scss';
import { FirstPart } from './components/FirstPart';
import { SecondPart } from './components/SecondPart';
import { Divider } from './components/Divider';
import { ThirdPart } from './components/ThirdPart';
import { Product } from './types/Product';
import { HOT_PRICES_TITLE } from '../../../../../../constants/ProductTitle';
import { ProductsContext } from '../../../../../../../../context/ProductsContext';

export const Model: React.FC<Product> = React.memo(props => {
  // #region props

  const {
    itemId,
    category,
    isMinWidthFixedValue,
    sectionTitle,
    name,
    image,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = props;

  // #endregion

  const { getCardWidth } = useContext(ProductsContext);

  const spec = [screen, capacity, ram];
  const productStyles: React.CSSProperties = {
    minWidth: isMinWidthFixedValue ? getCardWidth() : 'auto',
  };

  return (
    <div className={styles.product} style={productStyles}>
      <FirstPart
        itemId={itemId}
        category={category}
        image={image}
        name={name}
        price={price}
        fullPrice={fullPrice}
        isPriceHot={sectionTitle === HOT_PRICES_TITLE ? true : false}
      />
      <Divider />
      <SecondPart spec={spec} />
      <ThirdPart itemId={itemId} props={props} />
    </div>
  );
});

Model.displayName = 'Model';
