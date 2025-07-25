import React, { useState } from 'react';
import styles from './ProductOptionsPanel.module.scss';
import classNames from 'classnames';

import { Price } from '../../../shared/Price';
import { Details } from '../../../shared/Details';
import { DetailsProduct } from '../../../../types/productTypes';
import { ProductsFooterDetails } from '../ProductsFooterDetails';
import { useNavigate } from 'react-router-dom';
import { colorMap } from '../../utils/colorMap';

type OptionsProps = {
  item: DetailsProduct;
  variants: DetailsProduct[] | [];
};

export const ProductOptionsPanel = ({ item, variants }: OptionsProps) => {
  const {
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
  } = item;
  const [colorProduct, setColorProduct] = useState<string>(color);
  const [capacityProduct, setCapacityProduct] = useState<string>(capacity);
  const navigate = useNavigate();

  const updateVariant = (colorItem: string, capacityItem: string) => {
    const foundVariant = variants.find(
      variant =>
        variant.color === colorItem && variant.capacity === capacityItem,
    );

    if (foundVariant) {
      navigate(`/product/${foundVariant.id}`, {
        state: { category: foundVariant.category },
      });
    }
  };

  const handleColor = (colorItem: string) => {
    setColorProduct(colorItem);
    updateVariant(colorItem, capacityProduct);
  };

  const handleMemory = (value: string) => {
    setCapacityProduct(value);
    updateVariant(colorProduct, value);
  };

  return (
    <div className={styles.productOptions}>
      <div className={styles.colorWrapper}>
        <div className={styles.colors}>
          <p className={styles.value}>Available colors</p>
          <div className={styles.palette}>
            {colorsAvailable.map(tone => (
              <div
                key={tone}
                className={classNames(styles.palette__item, {
                  [styles['palette__item--active']]: colorProduct === tone,
                })}
              >
                <button
                  onClick={() => handleColor(tone)}
                  className={styles.palette__value}
                  style={{ backgroundColor: colorMap[tone] }}
                  aria-label={`choose color ${tone}`}
                ></button>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.value}>ID: 802390</p>
      </div>
      <div className={styles.productSummary}>
        <div className={styles.verticalLine}></div>
        <div className={styles.capacityWrapper}>
          <p className={styles.value}>Select capacity</p>
          <div className={styles.capacityValue}>
            {capacityAvailable.map(memory => (
              <button
                key={memory}
                onClick={() => handleMemory(memory)}
                className={classNames(styles.capacityValue__item, {
                  [styles['capacityValue__item--active']]:
                    capacityProduct === memory,
                })}
                aria-label="choose memory product"
              >
                {memory}
              </button>
            ))}
          </div>
        </div>
        <div
          className={classNames(
            styles.verticalLine,
            styles['verticalLine--margin'],
          )}
        ></div>
        <Price
          isHot={true}
          isDetail={true}
          price={priceDiscount}
          oldPrice={priceRegular}
        />
        <ProductsFooterDetails item={item} />
        <Details isDetail={true} item={item} />
      </div>
    </div>
  );
};
