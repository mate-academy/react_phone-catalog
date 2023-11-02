import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Product } from '../types/Product';
import { useFetching } from '../helpers/UseFetchig';
import Loader from '../components/Loader/Loader';
import { NavbarContext } from '../context/NavbarContext';

export const AccessoriesPage = () => {
  const [devices, setDevices] = useState<Product[]>([]);
  const { query, products } = useContext(NavbarContext);

  const getAccessories = async () => {
    if (products.length) {
      const filteredData = products.filter(
        (product: Product) => product.type === 'accessory'
        && product.name.toLowerCase().includes(query.toLowerCase()),
      );

      setDevices(filteredData);
    }
  };

  const [
    fetchAccessories,
    isLoadingAccessories,
    isErrorAccessories,
  ] = useFetching(getAccessories);

  useEffect(() => {
    fetchAccessories();
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
            Accessories
          </div>
        </div>
        <h1 className="devices__title">Accessories</h1>
        <p className="devices__amount">{`${devices.length} models`}</p>

        {!isLoadingAccessories && !isErrorAccessories && (
          <ProductsList
            devices={devices}
            data-cy="productList"
          />
        )}

        {isLoadingAccessories && <Loader />}
      </div>
    </div>
  );
};
