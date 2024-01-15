import './TabletsPage.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PathBar } from '../../components/PathBar/PathBar';
import { Title } from '../../components/Title/Title';
import { getProducts } from '../../api';
import { Product } from '../../types/Product';
import { SearchParams } from '../../types/SearchParams';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { ProductList } from '../../components/ProductList/ProductList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Banner } from '../../components/Banner/Banner';
import { Loader } from '../../components/Loader/Loader';

export const TabletsPage = () => {
  const [searchParams] = useSearchParams();
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const perPage = searchParams.get(SearchParams.PerPage) || ITEMS_PER_PAGE.All;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const filteredTablets = applyFilterAndSort(tablets, searchParams);
  const firstItem = (+perPage * currentPage) - +perPage;
  const lastItem = (+perPage * currentPage);
  const visibleTablets = perPage === ITEMS_PER_PAGE.All
    ? filteredTablets
    : filteredTablets.slice(firstItem, lastItem);
  const pagesNumber = perPage === ITEMS_PER_PAGE.All
    ? 1
    : Math.ceil(filteredTablets.length / +perPage);
  const isNoSearchResults = !filteredTablets.length && !isLoader
    && !!tablets.length;
  const showError = !isLoader && isError;
  const isOutOfStock = !tablets.length && !isLoader && !isError;
  const showDropdowns = !isLoader && !!tablets.length;

  useEffect(() => {
    setIsLoader(true);
    getProducts()
      .then((response) => {
        setTablets(response.filter(p => p.category === 'tablets'));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="tablets-page">
      <PathBar />
      <Title
        text="Tablets"
        length={tablets.length}
        filteredLength={filteredTablets.length}
        isLoader={isLoader}
      />
      {showDropdowns && (
        <div className="tablets-page__sort">
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
      <ProductList products={visibleTablets} />
      {pagesNumber > 1 && (
        <Pagination length={filteredTablets.length} />
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
