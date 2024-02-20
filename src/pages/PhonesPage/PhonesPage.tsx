import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';

import { ProductsList } from '../../components/ProductsList';
import { Search } from '../../components/Search';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { getPhones } from '../../services/products';
import { ProductsContext, useProducts } from '../../store/ProductsContext';

import './PhonesPage.scss';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();
  const { loading } = useContext(ProductsContext);

  const products = useProducts();
  const phones = getPhones(products);

  const query = searchParams.get('query') || '';

  const filteredPhones = getFilteredProducts(phones, { query });
  const countOfPhones = filteredPhones.length;

  const textCountItems = countOfPhones === 1
    ? '1 model'
    : `${countOfPhones} models`;

  const textCountResults = countOfPhones === 1
    ? '1 result'
    : `${countOfPhones} results`;

  if (!phones.length) {
    return (
      <>
        <h1 className="title title--pages">
          Mobile phones
        </h1>

        <h2>No product matches your requesty</h2>
      </>
    );
  }

  if (loading) {
    return (<Loader />);
  }

  return (
    <div className="phones phones__content">
      <Search type="mobile" />

      {!query && <Breadcrumbs />}

      {query.length === 0 ? (
        <div className="phones__title">
          <h1 className="title title--pages">
            Mobile phones
          </h1>

          {countOfPhones && (
            <p>{textCountItems}</p>
          )}
        </div>
      ) : (
        <div className="phones__title">
          {countOfPhones > 0 ? (
            <p>{textCountResults}</p>
          ) : (
            <h2>No product matches your request</h2>
          )}
        </div>

      )}

      <ProductsList products={filteredPhones} />
    </div>
  );
};
