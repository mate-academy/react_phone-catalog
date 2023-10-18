import './tabletsPage.scss';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Form } from '../../components/Form';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SearchList } from '../../components/SearchList';
import { getProducts } from '../../helpers/getProducts';

import { Product, TypeProduct } from '../../type/product';
import { NoResults } from '../../components/NoResults';
import { Loader } from '../../components/Loader';

export const TabletsPage = () => {
  const [searchParams] = useSearchParams();
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuerySearchParam = useCallback(() => {
    return searchParams.get('query');
  }, [searchParams]);

  useMemo(() => {
    setIsLoading(true);

    getProducts()
      .then(data => {
        const filteredData = data.filter((item: Product) => (
          item.type === TypeProduct.Tablet));

        setTablets(filteredData);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return !getQuerySearchParam() ? (
    <section className="tablets">
      <Breadcrumbs />

      <h1 className="tablets__title">
        Tablets
      </h1>

      <p className="tablets__models-number">
        {`${tablets.length} models`}
      </p>

      <Form />

      {!isLoading ? (
        <>
          {tablets.length > 0 ? (
            <ProductsList products={tablets} />
          ) : (
            <NoResults category={TypeProduct.Tablet} />
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  ) : (
    <SearchList products={tablets} />
  );
};
