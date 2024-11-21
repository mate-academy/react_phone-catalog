/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { Loader } from '../../components/Loader';
import { useLocation } from 'react-router-dom';
import { NotificationError } from '../../components/NotificationError';

export const AccessoriesPage = () => {
  const { products, errorMessage, loading } = useContext(ProductsContext);
  const accessories = getProductsByCategory(products, 'accessories');

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <>
      {loading && <Loader />}
      {!loading && !errorMessage && products.length > 0 && (
        <div>
          <ProductsCatalog products={accessories} title="Accessories" />
        </div>
      )}
      {errorMessage && products.length === 0 && (
        <NotificationError path={nameOfPath} />
      )}
    </>
  );
};
