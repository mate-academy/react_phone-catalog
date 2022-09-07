import { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { Loader } from '../../Components/Loader';
import { ProductsPage } from '../../Components/ProductsPage';
import { getPhones } from '../../Helpers/api/products';
import { Quantity } from '../../Helpers/types/Quantity';
import '../../Components/ProductsPage/ProductsPage.scss';

const phonesQty = [
  Quantity.all, Quantity.four, Quantity.eight, Quantity.sixteen,
];

export const PhonesPage = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPhones()
      .then(res => {
        setPhones(res);
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
            productsFromServer={phones}
            title="Mobile phones"
            qtyOptions={phonesQty}
          />
        )}
    </>
  );
};
