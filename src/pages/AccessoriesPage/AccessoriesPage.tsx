import './AccessoriesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { SearchParams } from '../../types/SearchParams';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { getProducts } from '../../api';
import { PathBar } from '../../components/PathBar/PathBar';
import { Title } from '../../components/Title/Title';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { ProductList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Banner } from '../../components/Banner/Banner';
import { Loader } from '../../components/Loader/Loader';

export const AccessoriesPage = () => {
  const [searchParams] = useSearchParams();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const perPage = searchParams.get(SearchParams.PerPage) || ITEMS_PER_PAGE.All;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const filteredAccessories = applyFilterAndSort(accessories, searchParams);
  const firstItem = (+perPage * currentPage) - +perPage;
  const lastItem = (+perPage * currentPage);
  const visibleAccessories = perPage === ITEMS_PER_PAGE.All
    ? filteredAccessories
    : filteredAccessories.slice(firstItem, lastItem);
  const pagesNumber = perPage === ITEMS_PER_PAGE.All
    ? 1
    : Math.ceil(filteredAccessories.length / +perPage);
  const isNoSearchResults = !filteredAccessories.length && !isLoader
    && !!accessories.length;
  const showError = !isLoader && isError;
  const isOutOfStock = !accessories.length && !isLoader && !isError;
  const showDropdowns = !isLoader && !!accessories.length;

  useEffect(() => {
    setIsLoader(true);
    getProducts()
      .then((response) => {
        setAccessories(response.filter(p => p.category === 'accessories'));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="accessories-page">
      <PathBar />
      <Title
        text="Accessories"
        length={accessories.length}
        filteredLength={filteredAccessories.length}
        isLoader={isLoader}
      />
      {showDropdowns && (
        <div className="accessories-page__sort">
          <Dropdown
            title="Sort by"
            defaultValue={null}
            options={SORT_BY}
            searchParam={SearchParams.Sort}
            columns={4}
          />

          <Dropdown
            title="Items per page"
            defaultValue={ITEMS_PER_PAGE.All}
            options={ITEMS_PER_PAGE}
            searchParam={SearchParams.PerPage}
            columns={3}
          />
        </div>
      )}
      <ProductList products={visibleAccessories} />
      {pagesNumber > 1 && (
        <Pagination length={filteredAccessories.length} />
      )}

      {isNoSearchResults
        && (<Banner message="No search results..." />)}

      {showError
        && (<Banner message="Error occured. Try again later" />)}

      {isLoader && (<Loader />)}

      {isOutOfStock
        && (<Banner message="Seems like products are out of stock..." />)}
    </div>
  );
};
