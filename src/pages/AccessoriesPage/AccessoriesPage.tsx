import './accessoriesPage.scss';
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

export const AccessoriesPage = () => {
  const [searchParams] = useSearchParams();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  useMemo(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        const filteredData = data.filter((item: Product) => (
          item.type === TypeProduct.Accessories));

        setAccessories(filteredData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return !getQuerySearchParam() ? (
    <section className="accessories">
      <Breadcrumbs />

      <h1 className="accessories__title">
        Accessories
      </h1>

      <p className="accessories__models-number">
        {`${accessories.length} models`}
      </p>

      <Form />
      {!isLoading ? (
        <>
          {accessories.length > 0 ? (
            <ProductsList products={accessories} />
          ) : (
            <NoResults category={TypeProduct.Accessories} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  ) : (
    <SearchList products={accessories} />
  );
};
