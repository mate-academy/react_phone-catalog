import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Product } from '../types/Product';
import { URL_PRODUCTS } from '../helpers/Url';
import { useFetching } from '../helpers/UseFetchig';
import Loader from '../components/Loader/Loader';
import { NavbarContext } from '../context/NavbarContext';

export const TabletsPage = () => {
  const [devices, setDevices] = useState<Product[]>([]);
  const { query } = useContext(NavbarContext);

  const getTablets = async () => {
    const response = await fetch(URL_PRODUCTS);
    const data = await response.json();
    const filteredData = data.filter(
      (product: Product) => product.type === 'tablet'
      && product.name.toLowerCase().includes(query.toLowerCase()),
    );

    setDevices(filteredData);
  };

  const [
    fetchTablets,
    isLoadingTablets,
    isErrorTablets,
  ] = useFetching(getTablets);

  useEffect(() => {
    fetchTablets();
  }, [query]);

  const [searchParams] = useSearchParams();

  return (
    <div className="container">
      <div className="devices">
        <div className="devices__way-wrapper">
          <Link
            to={{
              pathname: '/',
              search: searchParams.toString(),
            }}
            className="devices__way devices__way-home"
          />
          <div className="devices__way devices__way-middle" />
          <div className="devices__way-devices">
            Tablets
          </div>
        </div>
        <h1 className="devices__title">Tablets</h1>
        <p className="devices__amount">{`${devices.length} models`}</p>

        {!isLoadingTablets && !isErrorTablets && (
          <ProductsList
            devices={devices}
            data-cy="productList"
          />
        )}

        {isLoadingTablets && <Loader />}
      </div>
    </div>
  );
};
