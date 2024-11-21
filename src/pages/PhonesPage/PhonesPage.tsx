/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { Loader } from '../../components/Loader';
import { NotificationError } from '../../components/NotificationError';

export const PhonesPage = () => {
  const { products, errorMessage, loading } = useContext(ProductsContext);
  const phones = getProductsByCategory(products, 'phones');

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <>
      {loading && <Loader />}
      {!loading && !errorMessage && products.length > 0 && (
        <div>
          <ProductsCatalog products={phones} title="Mobile phones" />
        </div>
      )}
      {errorMessage && products.length === 0 && (
        <NotificationError path={nameOfPath} />
      )}
    </>
  );
};
