import {useContext, useEffect, useState} from 'react';
import {getTablet} from '../../api';

import {ProductsList} from '../../components/Content/ProductsList';
import {ProductContext} from '../../context/ProductContext';

export const TabletsPage = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);
  const {product, setProduct} = useContext(ProductContext);

  const path = ['Tablets'];

  useEffect(() => {
    setLoader(true);
    setError(null);
    getTablet()
      .then(data => setProduct(data))
      .catch(cause => {
        setError(cause instanceof Error ? cause.message : 'Unknown error');
      })
      .finally(() => setLoader(false));
  }, [requestId, setProduct]);

  return (
    <>
      <ProductsList
        product={product}
        loader={loader}
        title="Tablets"
        path={path}
        error={error}
        onRetry={() => setRequestId(id => id + 1)}
      />
    </>
  );
};
