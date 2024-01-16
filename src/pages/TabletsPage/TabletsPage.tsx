import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Category } from '../../types/Categoty';
import { Loader } from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import '../PhonePage/PhonesPage.scss';

export const TabletsPage = () => {
  const { isLoading, products } = useContext(ProductContext);

  const tablets = products
    .filter(product => product.category === Category.Tablets);

  return (
    <div className="PhonePage container section">
      <div className="PhonePage__breadcrumb">
        <Breadcrumb />
      </div>

      {!isLoading && !tablets.length && (
        <h1 className="PhonePage__title">
          Tablets not found
        </h1>
      )}

      {isLoading && <Loader />}

      {!isLoading && !!tablets.length && (
        <>
          <h1 className="PhonePage__title">
            Tablets
          </h1>

          <h1 className="PhonePage__count-of-models">
            {`${tablets.length} models`}
          </h1>

          <ProductList
            products={tablets}
            data-cy="productList"
          />
        </>
      )}
    </div>
  );
};
