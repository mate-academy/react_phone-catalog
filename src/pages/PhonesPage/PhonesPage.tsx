import React, { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import './PhonesPage.scss';
import { CustomSelect } from '../../components/CustomSelect';
import { SortOptions } from '../../types/SelectOptions';
import { Product } from '../../types/Product';
import { getPhones } from '../../helpers/getProducts';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';
import { NoSearchResults } from '../../components/NoSearchResults';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';

const sortByOptions: SortOptions = {
  label: 'Sort by',
  values: [SortBy.Newest, SortBy.Alphabetically, SortBy.Cheapest],
};

const itemsOnPage: SortOptions = {
  label: 'Items on page',
  values: [PerPage.$4, PerPage.$8, PerPage.$16, PerPage.All],
};

const getVisibleProducts = (
  products: Product[],
  sortParam: string,
  query: string,
) => {
  let visibleProducts = [...products];

  if (query) {
    visibleProducts = visibleProducts.filter(product => (
      product.name.toLowerCase().includes(query.toLowerCase())
    ));
  }

  switch (sortParam) {
    case SortBy.Newest:
      return visibleProducts.sort((productA, productB) => (
        productB.year - productA.year
      ));

    case SortBy.Alphabetically:
      return visibleProducts.sort((productA, productB) => (
        productA.name.localeCompare(productB.name)
      ));

    case SortBy.Cheapest:
      return visibleProducts.sort((productA, productB) => (
        productA.fullPrice - productB.fullPrice
      ));

    default:
      return visibleProducts;
  }
};

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const defaultPage = '1';
  const sortVal = searchParams.get('sortBy')
    || SortBy.Newest;

  const perPage = searchParams.get('perPage')
    || PerPage.$4;

  const page = searchParams.get('page')
    || defaultPage;

  const query = searchParams.get('query')
    || '';

  useEffect(() => {
    const handleGetPhones = async () => {
      try {
        const res = await getPhones();

        setPhones(res);
      } catch {
        throw new Error();
      } finally {
        setTimeout(() => (
          setIsLoading(false)
        ), 500);
      }
    };

    handleGetPhones();
  }, []);

  const visibleProducts = useMemo(() => (
    getVisibleProducts(phones, sortVal, query)
  ), [sortVal, phones, query]);

  const lastItem = +page * +perPage > visibleProducts.length
    ? visibleProducts.length
    : +page * +perPage;

  const firstItem = (+page * +perPage) - +perPage + 1;

  const itemsToShow = perPage === 'all'
    ? visibleProducts
    : visibleProducts.slice(firstItem - 1, lastItem);

  return (
    <section className="page__section">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="phones">
            <Breadcrumbs />
            <h1 className="phones__title title">Mobile phones</h1>
            <p className="phones__models">{`${visibleProducts.length} models`}</p>

            {query && !visibleProducts.length ? (
              <NoSearchResults />
            ) : (
              <>
                <div className="phones__filter">
                  <CustomSelect options={sortByOptions} searchParam="sortBy" />
                  <CustomSelect options={itemsOnPage} searchParam="perPage" />
                </div>

                <ProductList products={itemsToShow} />
                <Pagination total={visibleProducts.length} />
              </>
            )}

          </div>
        )}
      </div>
    </section>
  );
};
