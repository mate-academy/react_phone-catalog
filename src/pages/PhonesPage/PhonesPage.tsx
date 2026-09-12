import {useContext, useEffect, useState} from 'react';
import {getPhones} from '../../api';

import {ProductsList} from '../../components/Content/ProductsList';
import {ProductContext} from '../../context/ProductContext';

export const PhonesPage = () => {
  const {product, setProduct} = useContext(ProductContext);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState(0);
  const path = ['Phones'];

  useEffect(() => {
    setLoader(true);
    setError(null);
    getPhones()
      .then(data => {
        setProduct(data);
      })
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
        title="Mobile phones"
        path={path}
        error={error}
        onRetry={() => setRequestId(id => id + 1)}
      />
    </>
  );
};
