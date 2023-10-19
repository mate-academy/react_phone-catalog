import { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { Loader } from '../../Components/Loader';
import { ProductsPage } from '../../Components/ProductsPage';
import { getAccessories } from '../../Helpers/api/products';
import { Quantity } from '../../Helpers/types/Quantity';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAccessories()
      .then(res => {
        setAccessories(res);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <ProductsPage
          productsFromServer={accessories}
          title="Accessories"
          qtyOptions={[Quantity.all]}
        />
      )}
    </>
  );
};
