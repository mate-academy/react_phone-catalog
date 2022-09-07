import { useEffect, useState } from 'react';
import { getTablets } from '../../Helpers/api/products';
import { ProductsPage } from '../../Components/ProductsPage';
import { Quantity } from '../../Helpers/types/Quantity';
import { Loader } from '../../Components/Loader';
import { Header } from '../../Components/Header';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTablets()
      .then(res => {
        setTablets(res);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {loading
        ? <Loader />
        : (
          <ProductsPage
            productsFromServer={tablets}
            title="Tablets"
            qtyOptions={[Quantity.all]}
          />
        )}
    </>
  );
};
