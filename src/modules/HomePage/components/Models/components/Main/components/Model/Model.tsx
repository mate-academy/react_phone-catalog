import React, { useContext } from 'react';
import styles from './Model.module.scss';
import { FirstPart } from './components/FirstPart';
import { SecondPart } from './components/SecondPart';
import { Divider } from './components/Divider';
import { ThirdPart } from './components/ThirdPart';
import { ModelProps } from './types/ModelProps';
import { HOT_PRICES_TITLE } from '../../../../../../constants/ProductTitle';
// eslint-disable-next-line max-len
import { ProductsContext } from '../../../../../../../../context/ProductsContext';

export const Model: React.FC<ModelProps> = React.memo(
  ({
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
  }) => {
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
          isHotPrises={sectionTitle === HOT_PRICES_TITLE ? true : false}
        />
        <Divider />
        <SecondPart spec={spec} />
        <ThirdPart />
      </div>
    );
  },
);

Model.displayName = 'Model';
