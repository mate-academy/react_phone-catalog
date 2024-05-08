import {useContext, useEffect, useState} from 'react';
import {getTablet} from '../../api';

import {ProductsList} from '../../components/Content/ProductsList';
import {ProductContext} from '../../context/ProductContext';

export const TabletsPage = () => {
  const [loader, setLoader] = useState(true);
  const {setProduct, visibleProduct} = useContext(ProductContext);

  const path = ['Tablets'];

  useEffect(() => {
    getTablet()
      .then(data => setProduct(data))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <ProductsList
        visibleProduct={visibleProduct}
        loader={loader}
        title="Tablets"
        path={path}
      />
    </>
  );
};
