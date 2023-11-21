import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Product } from '../types/Product';
import { useFetching } from '../helpers/UseFetchig';
import Loader from '../components/Loader/Loader';
import { NavbarContext } from '../context/NavbarContext';

export const PhonesPage = () => {
  const [devices, setDevices] = useState<Product[]>([]);
  const { query, products } = useContext(NavbarContext);

  const filterDevices = (devs: Product[]) => {
    return devs
      .filter((device: Product) => device.name
        .toLowerCase().includes(query.toLowerCase()));
  };

  const getPhones = async () => {
    if (products.length) {
      const filteredData = products.filter(
        (product: Product) => product.type === 'phone',
      );

      const finallyFilteredData = filterDevices(filteredData);

      setDevices(finallyFilteredData);
    }
  };

  const [fetchPhones, isLoadingPhones, isErrorPhones] = useFetching(getPhones);

  useEffect(() => {
    fetchPhones();
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
            Phones
          </div>
        </div>
        <h1 className="devices__title">Mobile phones</h1>
        <p className="devices__amount">{`${devices.length} models`}</p>

        {!isLoadingPhones && !isErrorPhones && (
          <ProductsList
            devices={devices}
            data-cy="productList"
          />
        )}

        {isLoadingPhones && !isErrorPhones && <Loader />}
      </div>
    </div>
  );
};
