import React from 'react';
import { Tablet } from '../../../../types/ProductTypes/Tablet';
import TabletCard from '../Cards/TabletCard/TabletCard';
import styles from './TabletsList.module.scss';

type TabletsListProps = {
  products: Tablet[];
};

const TabletsList: React.FC<TabletsListProps> = ({ products }) => {
  if (products.length === 0) {
    return <p className={styles.noTablets}>There are no tablets yet.</p>;
  }

  return (
    <div className={styles.tabletsListContainer}>
      <div className={styles.tabletsGrid}>
        {products.map(t => (
          <TabletCard
            key={t.id}
            tablet={{
              ...t,
              image: t.images ? t.images[0] : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TabletsList;
