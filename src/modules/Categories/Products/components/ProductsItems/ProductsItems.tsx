/* eslint-disable max-len */
import React, { useContext } from 'react';

import { MainContext } from '../../../../../context/MainContext';
import { Product } from '../../../../../types/CategoriesTypes/Product';
import { Model } from '../../../../HomePage/components/Models/components/Main/components/Model';
import styles from './ProductsItems.module.scss';

interface Props {
  products: Product[];
}

export const ProductsItems: React.FC<Props> = ({ products }) => {
  const { MWFValueCondition } = useContext(MainContext);

  return (
    <div className={styles['products-wrapper']}>
      {products.map(product => {
        const {
          id,
          itemId,
          category,
          name,
          image,
          price,
          fullPrice,
          screen,
          capacity,
          ram,
          sectionTitle,
        } = product;

        return (
          <Model
            itemId={itemId}
            category={category}
            isMinWidthFixedValue={MWFValueCondition}
            name={name}
            key={id}
            image={image}
            price={price}
            fullPrice={fullPrice}
            screen={screen}
            capacity={capacity}
            ram={ram}
            sectionTitle={sectionTitle}
          />
        );
      })}
    </div>
  );
};
