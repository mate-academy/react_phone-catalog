import { PageTop } from '../../shared/components/PageTop/PageTop';
import accessories from '../../../public/api/accessories.json';
import { ProductList } from '../../shared/components/ProductList/ProductList';
import { useEffect, useState } from 'react';
import { Loader } from '../../shared/components/utils/Loader';

export const AccessoriesPage = () => {
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
            title="Accessories page"
            pageName="Accessories"
            productsLength={accessories.length}
            productInfo={true}
            dropdowns={true}
          />
          <ProductList products={accessories} />
        </>
      )}
    </>
  );
};
