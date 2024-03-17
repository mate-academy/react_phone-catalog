import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Path } from '../../components/Path';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { Dropdown } from '../../components/Dropdown';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import './AccessoriesPage.scss';
import { prepareProducts } from '../../helpers/prepafeProducts';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { NoProducts } from '../../components/NoProducts/NoProducts';
import { SomethingWentWrong } from '../../components/SomethingWentWrong';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((response) => {
        setAccessories(response
          .filter(product => product.category === 'accessories'));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedProducts = prepareProducts(accessories, { sort, query });

  const perPage = +(searchParams.get('perPage') || preparedProducts.length);
  const page = +(searchParams.get('page') || '1');
  const totalPages = Math.ceil(preparedProducts.length / perPage);

  const firstItemIndex = perPage * page - (perPage - 1);
  const lastItemIndex = page === totalPages
    ? preparedProducts.length
    : perPage * page;

  const currentProducts = preparedProducts
    .slice(firstItemIndex - 1, lastItemIndex);

  return (
    <div className="accessories-page">
      <div className="accessories-page__content">
        <Path />

        <h1 className="accessories-page__title">
          Accessories
        </h1>

        <p className="accessories-page__amount">
          {preparedProducts.length === 1 ? (
            '1 model'
          ) : (
            `${preparedProducts.length} models`
          )}
        </p>

        {isLoading && !isError && (
          <Loader />
        )}

        {!!preparedProducts.length && (
          <>
            <div className="accessories-page__dropdowns">
              <Dropdown
                title="Sort by"
                options={SORT_BY}
                defaultValue={null}
                searchParam="sort"
              />
              <Dropdown
                title="Items per page"
                options={ITEMS_PER_PAGE}
                searchParam="perPage"
                defaultValue={ITEMS_PER_PAGE.All}
              />
            </div>
            <div className="accessories-page__list">
              <ProductsList products={currentProducts} />
            </div>
          </>
        )}

        {perPage !== preparedProducts.length && !!preparedProducts.length && (
          <Pagination total={preparedProducts.length} />
        )}

        {preparedProducts.length === 0 && !isLoading && (query ? (
          <NoProducts products="accessories" isQuery={!!query} />
        ) : (
          <NoProducts products="accessories" />
        ))}

        {isError && (
          <SomethingWentWrong />
        )}
      </div>
    </div>
  );
};
