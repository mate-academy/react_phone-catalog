import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { Loader } from '../../components/Loader';
import { Dropdown } from '../../components/Dropdown';
import { getPreparedProducts } from '../../utils/getPrepareProducts';
import { DropdownPagination } from '../../components/DropdownPagination';
import { Pagination } from '../../components/Pagination';
import { getNumbers } from '../../utils/getNumbers';
import { getTablets } from '../../utils/getProducts';
import { NoResults } from '../../components/NoResults';
import { NoSearchResults } from '../../components/NoSearchResults';
import { BackButton } from '../../components/BackButton';

import './tabletsPage.scss';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = +(searchParams.get('page') || '1');

  useEffect(() => {
    setIsLoading(true);
    getTablets()
      .then(setTablets)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (tablets.length > 0) {
    const preparedProducts = getPreparedProducts(
      tablets, { query, sort },
    );

    let pages: number[] | undefined;

    if (tablets && perPage && perPage !== 'all') {
      pages = getNumbers(1, Math.ceil(preparedProducts.length / +perPage));
    } else {
      pages = getNumbers(1, 1);
    }

    const firstItem = (currentPage - 1) * +perPage;

    const lastItem = firstItem + +perPage > preparedProducts.length
      ? preparedProducts.length
      : firstItem + +perPage;

    return (
      <div className="tabletspage">
        <div className="container">

          <BreadCrumbs />

          {preparedProducts.length === 0 && <NoSearchResults />}

          {preparedProducts.length > 0
            && (
              <>
                <h1 className="title rainbow-text tabletspage__title">
                  Tablets
                </h1>
                <span className="tabletspage__quantity">
                  {preparedProducts.length}
                  {' '}
                  models
                </span>
                <div className="tabletspage__dropdowns">
                  <Dropdown initialValue={sort} />
                  <DropdownPagination initialValue={perPage} />
                </div>

                <ProductsList products={perPage === 'all'
                  ? preparedProducts
                  : preparedProducts.slice(firstItem, lastItem)}
                />

                <Pagination pages={pages} />
              </>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="tabletspage__button-back">
        <BackButton />
      </div>
      <NoResults />
    </div>
  );
};
