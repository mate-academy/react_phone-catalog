import { useParams } from 'react-router-dom';
import { Catalog } from '../../components/Catalog';
import { useProducts } from '../../shared/context/ProductsContext';
import { ProductInfo } from '../../modules/ProductInfo';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const { id } = useParams<{ id: string }>();
  const { phones, products } = useProducts();

  const phone = id ? phones.find(item => item.id === id) || null : null;
  const catalogPhones = products.filter(
    product => product.category === 'phones',
  );

  const smallTitle = 'Phones';
  const largeTitle = 'Mobile phones';

  return (
    <div className={styles.phones__page}>
      {!phone ? (
        <Catalog
          smallTitle={smallTitle}
          largeTitle={largeTitle}
          sorting={true}
          products={catalogPhones}
        />
      ) : (
        <ProductInfo product={phone} catalog={catalogPhones} />
      )}
    </div>
  );
};
