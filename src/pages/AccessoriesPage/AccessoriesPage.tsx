import {useContext, useEffect, useState} from 'react';
import {getAccessories} from '../../api';

import {ProductsList} from '../../components/Content/ProductsList';
import {ProductContext} from '../../context/ProductContext';

export const AccessoriesPage = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);
  const path = ['Accessories'];
  const {product, setProduct} = useContext(ProductContext);

  useEffect(() => {
    setLoader(true);
    setError(null);
    getAccessories()
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
        title="Accessories"
        path={path}
        error={error}
        onRetry={() => setRequestId(id => id + 1)}
      />
    </>
  );
};
