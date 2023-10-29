import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Category } from '../../types/Categoty';
import { Loader } from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import '../PhonePage/PhonesPage.scss';

export const AccessoriesPage = () => {
  const { isLoading, products } = useContext(ProductContext);

  const accessories = products
    .filter(product => product.type === Category.Accessories);

  return (
    <div className="PhonePage container section">
      <div className="PhonePage__breadcrumb">
        <Breadcrumb />
      </div>

      {!isLoading && !accessories.length && (
        <h1 className="PhonePage__title">
          Accessories not found
        </h1>
      )}

      {isLoading && <Loader />}

      {!isLoading && !!accessories.length && (
        <>
          <h1 className="PhonePage__title">
            Accessories
          </h1>

          <h1 className="PhonePage__count-of-models">
            {`${accessories.length} models`}
          </h1>

          <ProductList
            products={accessories}
            data-cy="productList"
          />
        </>
      )}
    </div>
  );
};
