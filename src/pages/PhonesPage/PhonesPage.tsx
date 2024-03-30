import { useContext, useEffect, useState } from 'react';
import { getPhones } from '../../api';

import { ProductsList } from '../../components/Content/ProductsList';
import { Breadcrumb } from '../../components/Content/Breadcrumb';
import { ProductContext } from '../../context/ProductContext';

export const PhonesPage = () => {
  const { setProduct, visibleProduct } = useContext(ProductContext);
  const [loader, setLoader] = useState(true);
  const pach = ['Phones'];

  useEffect(() => {
    getPhones()
      .then(data => {
        setProduct(data);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Breadcrumb path={pach} />
      <ProductsList
        visibleProduct={visibleProduct}
        loader={loader}
        title="Mobile phones"
      />
    </>
  );
};
