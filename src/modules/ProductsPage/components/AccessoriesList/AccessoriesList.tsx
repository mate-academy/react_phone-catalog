import React from 'react';
import { Accessory } from '../../../../types/ProductTypes/Accessory';
import AccessoriesCard from '../Cards/AccessoriesCard/AccessoriesCard';
import styles from './AccessoriesList.module.scss';

type AccessoriesListProps = {
  products: Accessory[];
};

const AccessoriesList: React.FC<AccessoriesListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p className={styles.noAccessories}>There are no accessories yet.</p>;
  }

  return (
    <div className={styles.accessoriesListContainer}>
      <div className={styles.accessoriesGrid}>
        {products.map((a) => (
          <AccessoriesCard
            key={a.id}
            accessory={{
              ...a,
              image: a.images ? a.images[0] : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessoriesList;
