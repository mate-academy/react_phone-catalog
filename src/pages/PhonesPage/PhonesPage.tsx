/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductsCatalog } from '../../components/ProductsCatalog';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByCategory } from '../../helpers/getProductsByCategory';
import { ProductsError } from '../../components/Errors/ProductsError';
import { Loader } from '../../components/Loader';

export const PhonesPage = () => {
  const { products, loading } = useContext(ProductsContext);
  const phones = getProductsByCategory(products, 'phones');

  const { pathname } = useLocation();
  const nameOfPath = pathname.slice(1);

  return (
    <>
      {loading && <Loader />}
      {!loading && products.length > 0 ? (
        <div>
          <ProductsCatalog products={phones} title="Mobile phones" />
        </div>
      ) : (
        <div>
          <ProductsError path={nameOfPath} />
        </div>
      )}
    </>
  );
};
