import './phonesPage.scss';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Form } from '../../components/Form';
import { NoResults } from '../../components/NoResults';
import { ProductsList } from '../../components/ProductsList';
import { SearchList } from '../../components/SearchList';
import { getProducts } from '../../helpers/getProducts';

import { Product, TypeProduct } from '../../type/product';
import { Loader } from '../../components/Loader';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  useMemo(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        const filteredData = data.filter((item: Product) => (
          item.type === TypeProduct.Phone));

        setPhones(filteredData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return !getQuerySearchParam() ? (
    <section className="phones">
      <Breadcrumbs />

      <h1 className="phones__title">
        Mobile phones
      </h1>

      <p className="phones__models-number">
        {`${phones.length} models`}
      </p>

      <Form />

      {!isLoading ? (
        <>
          {phones.length > 0 ? (
            <ProductsList products={phones} />
          ) : (
            <NoResults category={TypeProduct.Phone} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  ) : (
    <SearchList products={phones} />
  );
};
