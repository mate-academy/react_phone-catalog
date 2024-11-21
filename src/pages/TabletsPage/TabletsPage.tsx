/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { Loader } from '../../components/Loader';
import { NotificationError } from '../../components/NotificationError';

export const TabletsPage = () => {
  const { products, errorMessage, loading } = useContext(ProductsContext);
  const tablets = getProductsByCategory(products, 'tablets');

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <>
      {loading && <Loader />}
      {!loading && !errorMessage && products.length > 0 && (
        <div>
          <ProductsCatalog products={tablets} title="Tablets" />
        </div>
      )}
      {errorMessage && products.length === 0 && (
        <NotificationError path={nameOfPath} />
      )}
    </>
  );
};
