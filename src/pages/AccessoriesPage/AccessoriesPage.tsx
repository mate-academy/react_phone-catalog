import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Catalog } from '../../components/Catalog';
import { useProducts } from '../../shared/context/ProductsContext';
import { ProductsInfo } from '../../shared/types/ProductsInfo';
import { ProductInfo } from '../../modules/ProductInfo';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {
  const [selectedAccessory, setSelectedAccessory] =
    useState<ProductsInfo | null>(null);
  const { id } = useParams<{ id: string }>();
  const { accessories, products } = useProducts();
  const catalogAccessories = products.filter(
    product => product.category === 'accessories',
  );
  const smallTitle = 'Accessories';
  const largeTitle = 'Accessories';

  useEffect(() => {
    if (id) {
      const accessory = accessories.find(item => item.id === id);

      setSelectedAccessory(accessory || null);
    } else {
      setSelectedAccessory(null);
    }
  }, [id, accessories]);

  return (
    <div className={styles.accessories__page}>
      {!selectedAccessory ? (
        <Catalog
          smallTitle={smallTitle}
          largeTitle={largeTitle}
          sorting={true}
          products={catalogAccessories}
        />
      ) : (
        <ProductInfo
          key={selectedAccessory?.id}
          product={selectedAccessory}
          catalog={catalogAccessories}
        />
      )}
    </div>
  );
};
