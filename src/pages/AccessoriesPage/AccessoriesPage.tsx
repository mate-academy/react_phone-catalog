import { useContext, useEffect, useState } from 'react';
import { getAccessories } from '../../api';

import { ProductsList } from '../../components/Content/ProductsList';
import { Breadcrumb } from '../../components/Content/Breadcrumb';
import { ProductContext } from '../../context/ProductContext';

export const AccessoriesPage = () => {
  const [loader, setLoader] = useState(true);
  const pach = ['Accessories'];
  const { setProduct, visibleProduct } = useContext(ProductContext);

  useEffect(() => {
    getAccessories()
      .then(data => setProduct(data))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Breadcrumb path={pach} />
      <ProductsList
        visibleProduct={visibleProduct}
        loader={loader}
        title="Accessories"
      />
    </>
  );
};
