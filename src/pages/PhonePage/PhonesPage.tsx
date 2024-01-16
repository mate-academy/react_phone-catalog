import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Category } from '../../types/Categoty';
import { Loader } from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import './PhonesPage.scss';

export const PhonesPage = () => {
  const { isLoading, products } = useContext(ProductContext);

  const phones = products
    .filter(product => product.category === Category.Phones);

  return (
    <div className="PhonePage container section">
      <div className="PhonePage__breadcrumb">
        <Breadcrumb />
      </div>

      {!isLoading && !phones.length && (
        <h1 className="PhonePage__title">
          Mobile phones not found
        </h1>
      )}

      {isLoading && <Loader />}

      {!isLoading && !!phones.length && (
        <>
          <h1 className="PhonePage__title">
            Mobile phones
          </h1>

          <h1 className="PhonePage__count-of-models">
            {`${phones.length} models`}
          </h1>

          <ProductList
            products={phones}
            data-cy="productList"
          />
        </>
      )}
    </div>
  );
};
