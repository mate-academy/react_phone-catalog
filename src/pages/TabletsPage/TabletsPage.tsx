import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Catalog } from '../../components/Catalog';
import { useProducts } from '../../shared/context/ProductsContext';
import { ProductsInfo } from '../../shared/types/ProductsInfo';
import { ProductInfo } from '../../modules/ProductInfo';

import styles from './TabletsPage.module.scss';

export const TabletsPage = () => {
  const [selectedTablet, setSelectedTablet] = useState<ProductsInfo | null>(
    null,
  );
  const { id } = useParams<{ id: string }>();
  const { tablets, products } = useProducts();
  const catalogTablets = products.filter(
    product => product.category === 'tablets',
  );

  const smallTitle = 'Tablets';
  const largeTitle = 'Tablets';

  useEffect(() => {
    if (id) {
      const tablet = tablets.find(item => item.id === id);

      setSelectedTablet(tablet || null);
    } else {
      setSelectedTablet(null);
    }
  }, [id, tablets]);

  return (
    <div className={styles.tablets_page}>
      {!selectedTablet ? (
        <Catalog
          smallTitle={smallTitle}
          largeTitle={largeTitle}
          sorting={true}
          products={catalogTablets}
        />
      ) : (
        <ProductInfo
          key={selectedTablet?.id}
          product={selectedTablet}
          catalog={catalogTablets}
        />
      )}
    </div>
  );
};
