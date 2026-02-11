import React from 'react';

import { MobileCard } from './MobileCard/MobileCard';
import { TabletsCard } from './TabletsCard/TabletsCard';
import { AccessoriesCard } from './AccessoriesCard/AccessoriesCard';
import { useCategoryCounts } from '../../../../shared/hooks/useCategoryCounts';

import styles from './CategotyGrid.module.scss';

export const CategoryGrid: React.FC = () => {
  const { counts, loading } = useCategoryCounts();

  const categoriesPhotosPath = {
    mobile: './img/category/category-phones.webp',
    tablets: './img/category/category-tablets.webp',
    accessories: './img/category/category-accessories.png',
  };

  return (
    <div className={styles.categories}>
      <div className={styles.categories__section_mobile}>
        <MobileCard
          imageSrc={categoriesPhotosPath.mobile}
          count={counts.mobile}
          loading={loading}
        />
      </div>

      <div className={styles.categories__section_tablets}>
        <TabletsCard
          imageSrc={categoriesPhotosPath.tablets}
          count={counts.tablets}
          loading={loading}
        />
      </div>

      <div className={styles.categories__section_accessories}>
        <AccessoriesCard
          imageSrc={categoriesPhotosPath.accessories}
          count={counts.accessories}
          loading={loading}
        />
      </div>
    </div>
  );
};
