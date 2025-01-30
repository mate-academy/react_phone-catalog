import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStateContext } from '../../state/state';
import { SortOptions } from '../../enums';
import { useSortedProducts } from './hooks/useProducts';
import { useLoadProducts } from '../../hooks/useLoadProducts';
import {
  Pagination,
  PerPageSelect,
  ProductList,
  SortSelect,
} from './components';
import { Breadcrumbs, Loader } from '../../components';
import { getTitle } from './helpers/getTitle';
import './ProductsPage.scss';

type Props = {
  category: string;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useStateContext();
  const loadProducts = useLoadProducts();
  const [loading, setLoading] = useState(true);

  const defaultPage = 1;
  const defaultPerPage = 'All';
  const defaultSort = SortOptions.Newest;

  const currentPage = Number(searchParams.get('page')) || defaultPage;
  const perPage = searchParams.get('perPage') || defaultPerPage;
  const sort = searchParams.get('sort') || defaultSort;

  const products = useSortedProducts(sort, category);

  const totalProducts = products.length;

  const title = getTitle(category);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateParams = (newParams: {
    page?: number;
    perPage?: string;
    sort?: string;
  }) => {
    const updatedParams: { page?: string; perPage?: string; sort?: string } =
      {};

    if (newParams.page && newParams.page !== defaultPage) {
      updatedParams.page = newParams.page.toString();
    }

    if (newParams.perPage && newParams.perPage !== defaultPerPage) {
      updatedParams.perPage = newParams.perPage;
    } else if (!newParams.perPage) {
      updatedParams.perPage = perPage;
    }

    if (newParams.sort && newParams.sort !== defaultSort) {
      updatedParams.sort = newParams.sort;
    } else if (!newParams.sort) {
      updatedParams.sort = sort;
    }

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    if (
      currentPage === defaultPage &&
      perPage === defaultPerPage &&
      sort === defaultSort
    ) {
      setSearchParams({});
    }
  }, [currentPage, perPage, sort, defaultPage, defaultSort, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [category, sort, perPage, currentPage]);

  const itemsPerPage = perPage === 'All' ? totalProducts : Number(perPage);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    updateParams({ page, perPage, sort });
  };

  if (loading) {
    return <Loader />;
  }

  if (state.error) {
    return (
      <div className="error-message">
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (totalProducts === 0) {
    return (
      <div className="no-products-message">
        <p>There are no {category} yet</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <Breadcrumbs className="products-page__breadcrumbs" />
      <h1 className="products-page__title typography__h1">{title}</h1>
      <div className="products-page__total typography__body">
        {totalProducts} items
      </div>
      <div className="products-page__selectors selectors">
        <SortSelect sort={sort} updateParams={updateParams} />
        <PerPageSelect perPage={perPage} updateParams={updateParams} />
      </div>
      <ProductList products={currentProducts} />
      {perPage !== 'All' && Number(perPage) < totalProducts && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
          className="products-page__pagination"
        />
      )}
    </div>
  );
};
