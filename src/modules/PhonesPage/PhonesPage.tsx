import React, { useEffect, useState } from 'react';
import { ProductPage } from '../shared/ProductPage';
import { Product } from '../../types/Product';
import { client } from '../../api';
// import { ProductContext } from '../../store/ProductContext';

const PRODUCT_URL = 'products.json';

export const PhonesPage = React.memo(() => {
  // const { phones } = useContext(ProductContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [phones, setPhones] = useState<Product[]>([]);
  // const [phonesPerPage, setPhonesPerPage] = useState<number>(0);

  useEffect(() => {
    setDataLoaded(false);

    client
      .get<Product[]>(PRODUCT_URL)
      .then(data => {
        const getPhones = data.filter(product => product.category === 'phones');

        setPhones(getPhones);
        setDataLoaded(true);
      })
      .catch(() => {});
  }, []); // fetch

  return (
    <ProductPage
      title="Mobile phones"
      routeTitle="Phones"
      dataLoaded={dataLoaded}
      phones={phones}
      // perPage={item => setPhonesPerPage(item)}
    />
  );
});
