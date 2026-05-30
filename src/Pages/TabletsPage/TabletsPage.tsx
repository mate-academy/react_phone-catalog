import tablets from '../../../public/api/tablets.json';
import { PageTop } from '../../shared/components/PageTop/PageTop';
import { ProductList } from '../../shared/components/ProductList/ProductList';
import { useEffect, useState } from 'react';
import { Loader } from '../../shared/components/utils/Loader';

export const TabletsPage = () => {
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
            title="Tablets page"
            pageName="Tablets"
            productsLength={tablets.length}
            productInfo={true}
            dropdowns={true}
          />
          <ProductList products={tablets} />
        </>
      )}
    </>
  );
};
