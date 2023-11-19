import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Loader } from '../../comonents/Loader';
import { Dropdown } from '../../comonents/Dropdown';
import { Pagination } from '../../comonents/Pagination';
import { ProductList } from '../../comonents/ProductList';
import { useProducts } from '../../comonents/ProductContext';
import { NoResults } from '../../comonents/NoResults';
import { SortProducts } from '../../helpers/utils/sortProducts';
import { NoSearchResults } from '../../comonents/NoSearchResults';
import { BreadCrumbs } from '../../comonents/BreadCrumbs';

import '../../style/block/page.scss';
import { getSearchWith } from '../../helpers/utils/getSearchWith';

export const PhonesPage = () => {
  const {
    sortDropdown,
    perPageDropdown,
    page,
    sort,
    query,
    perPage,
    setPerPage,
    setPageCount,
    setStartIndex,
    isLoading,
    phones,
    isError,
    prevSearch,
    setPrevSearch,
  } = useProducts();
  const sortedPhones = SortProducts(phones, sort, query);
  const totalLength = sortedPhones.length;
  const perPageToNum = setPerPage(totalLength);
  const pageCount = setPageCount(totalLength, perPageToNum);
  const startIndex = setStartIndex(perPageToNum);
  const productsForCurrentPage = sortedPhones.slice(
    startIndex, startIndex + perPageToNum,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const renderContext = () => {
    if (!isLoading && phones.length === 0) {
      return <NoResults category="Phones" />;
    }

    if (!isLoading && isError) {
      return <h1>{isError}</h1>;
    }

    if (query && sortedPhones.length === 0) {
      return <NoSearchResults />;
    }

    return (
      <ProductList productsForCurrentPage={productsForCurrentPage} />
    );
  };

  useEffect(() => {
    if (query) {
      setSearchParams(getSearchWith(searchParams, { page: null }));
    }

    if (!query && sort === prevSearch.sort && perPage === prevSearch.perPage) {
      setSearchParams(getSearchWith(
        searchParams, { page: prevSearch.page.toString() },
      ));
    }
  }, [query, sort, perPage]);

  useEffect(() => {
    if (!query) {
      setPrevSearch({ page, sort, perPage });
    }
  }, [query, sort, perPage, page]);

  return (
    <section className="page">
      <BreadCrumbs linkName="Phones" />

      <h1 className="text text--h1 page__title">Mobile phones</h1>

      <p className="text text--gray">{`${phones.length} models`}</p>

      <div className="page__dropdown-container">
        <Dropdown
          key={sortDropdown.name}
          dropdown={sortDropdown}
          currentValue={sort}
          queryKey={sortDropdown.name}
          name="Sort by"
        />
        <Dropdown
          key={perPageDropdown.name}
          dropdown={perPageDropdown}
          currentValue={perPage.toString()}
          queryKey={perPageDropdown.name}
          name="Items on page"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="page__main-container">
          {renderContext()}

          {pageCount.length > 1 && (
            <Pagination
              currentPage={page}
              pageCount={pageCount}
              totalLength={totalLength}
            />
          )}
        </div>
      )}
    </section>
  );
};
