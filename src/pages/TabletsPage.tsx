import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Product } from '../types/Product';
import { useFetching } from '../helpers/UseFetchig';
import Loader from '../components/Loader/Loader';
import { NavbarContext } from '../context/NavbarContext';

export const TabletsPage = () => {
  const [devices, setDevices] = useState<Product[]>([]);
  const { query, products } = useContext(NavbarContext);

  const getTablets = async () => {
    if (products.length) {
      const filteredData = products.filter(
        (product: Product) => product.type === 'tablet'
        && product.name.toLowerCase().includes(query.toLowerCase()),
      );

      setDevices(filteredData);
    }
  };

  const [
    fetchTablets,
    isLoadingTablets,
    isErrorTablets,
  ] = useFetching(getTablets);

  useEffect(() => {
    fetchTablets();
  }, [query, products.length]);

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
