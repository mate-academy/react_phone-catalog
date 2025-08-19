import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Catalog } from '../../components/Catalog';
import { useProducts } from '../../shared/context/ProductsContext';
import { ProductInfo } from '../../modules/ProductInfo';
import { ProductsInfo } from '../../shared/types/ProductsInfo';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const [selectedPhone, setSelectedPhone] = useState<ProductsInfo | null>(null);
  const { id } = useParams<{ id: string }>();
  const { phones, products } = useProducts();
  const catalogPhones = products.filter(
    product => product.category === 'phones',
  );

  const smallTitle = 'Phones';
  const largeTitle = 'Mobile phones';

  useEffect(() => {
    if (id) {
      const phone = phones.find(item => item.id === id);

      setSelectedPhone(phone || null);
    } else {
      setSelectedPhone(null);
    }
  }, [id, phones]);

  return (
    <div className={styles.phones__page}>
      {!selectedPhone ? (
        <Catalog
          smallTitle={smallTitle}
          largeTitle={largeTitle}
          sorting={true}
          products={catalogPhones}
        />
      ) : (
        <ProductInfo
          key={selectedPhone?.id}
          product={selectedPhone}
          catalog={catalogPhones}
        />
      )}
    </div>
  );
};
