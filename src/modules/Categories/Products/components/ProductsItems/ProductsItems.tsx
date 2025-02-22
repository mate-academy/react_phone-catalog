import React, { useContext } from 'react';
// eslint-disable-next-line max-len
import { Model } from '../../../../HomePage/components/Models/components/Main/components/Model';
import { Product } from '../../../../../types/CategoriesTypes/Product';
import styles from './ProductsItems.module.scss';
import { MainContext } from '../../../../../context/MainContext';

interface Props {
  sortedProducts: Product[];
}

export const ProductsItems: React.FC<Props> = ({ sortedProducts }) => {
  const { isTablet } = useContext(MainContext);

  return (
    <div className={styles['products-wrapper']}>
      {sortedProducts.map(product => {
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
        } = product;

        return (
          <Model
            itemId={itemId}
            category={category}
            isMinWidthFixedValue={isTablet ? false : true}
            name={name}
            key={id}
            image={image}
            price={price}
            fullPrice={fullPrice}
            screen={screen}
            capacity={capacity}
            ram={ram}
          />
        );
      })}
    </div>
  );
};
