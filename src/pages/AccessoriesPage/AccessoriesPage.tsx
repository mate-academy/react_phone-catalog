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

export const AccessoriesPage = () => {
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
    accessories,
    isError,
  } = useProducts();
  const sortedAccessories = SortProducts(accessories, sort, query);
  const totalLength = sortedAccessories.length;
  const perPageToNum = setPerPage(totalLength);
  const pageCount = setPageCount(totalLength, perPageToNum);
  const startIndex = setStartIndex(perPageToNum);
  const productsForCurrentPage = sortedAccessories.slice(
    startIndex, startIndex + perPageToNum,
  );

  const renderContext = () => {
    if (!isLoading && accessories.length === 0) {
      return <NoResults category="Accessories" />;
    }

    if (!isLoading && isError) {
      return <h1>{isError}</h1>;
    }

    if (query && sortedAccessories.length === 0) {
      return <NoSearchResults />;
    }

    return (
      <ProductList productsForCurrentPage={productsForCurrentPage} />
    );
  };

  return (
    <section className="page">
      <BreadCrumbs linkName="Accessories" />

      <h1 className="text text--h1 page__title">Accessories</h1>

      <p className="text text--gray">{`${accessories.length} models`}</p>

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
