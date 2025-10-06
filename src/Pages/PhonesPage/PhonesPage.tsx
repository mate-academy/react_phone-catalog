import styles from './Phones.module.scss';
import { PageTop } from '../../shared/components/PageTop/PageTop';
import { ProductList } from '../../shared/components/ProductList/ProductList';
import phones from '../../../public/api/phones.json';
import { useEffect, useState } from 'react';
import { Loader } from '../../shared/components/utils/Loader';

export const PhonesPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTop
            title="Mobile phones"
            pageName="Phones"
            productsLength={phones.length}
            productInfo={true}
            dropdowns={true}
          />
          <ProductList products={phones} />
        </>
      )}
    </>
  );
};
