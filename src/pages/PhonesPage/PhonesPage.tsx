import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PathBar } from '../../components/PathBar/PathBar';
import './PhonesPage.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { Title } from '../../components/Title/Title';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { ProductList } from '../../components/ProductList/ProductList';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import { SearchParams } from '../../types/SearchParams';
import { Pagination } from '../../components/Pagination/Pagination';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { Banner } from '../../components/Banner/Banner';
import { Loader } from '../../components/Loader/Loader';

export const PhonesPage = () => {
  const [searchParams] = useSearchParams();
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const perPage = searchParams.get(SearchParams.PerPage) || ITEMS_PER_PAGE.All;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const filteredPhones = applyFilterAndSort(phones, searchParams);
  const firstItem = (+perPage * currentPage) - +perPage;
  const lastItem = (+perPage * currentPage);
  const visiblePhones = perPage === ITEMS_PER_PAGE.All
    ? filteredPhones
    : filteredPhones.slice(firstItem, lastItem);
  const pagesNumber = perPage === ITEMS_PER_PAGE.All
    ? 1
    : Math.ceil(filteredPhones.length / +perPage);
  const isNoSearchResults = !filteredPhones.length && !isLoader
    && !!phones.length;
  const showError = !isLoader && isError;
  const isOutOfStock = !phones.length && !isLoader && !isError;
  const showDropdowns = !isLoader && !!phones.length;

  useEffect(() => {
    setIsLoader(true);
    getProducts()
      .then((response) => {
        setPhones(response.filter(p => p.category === 'phones'));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="phones-page">
      <PathBar />
      <Title
        text="Mobile phones"
        length={phones.length}
        filteredLength={filteredPhones.length}
        isLoader={isLoader}
      />
      {showDropdowns && (
        <div className="phones-page__sort">
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
      <ProductList products={visiblePhones} />
      {pagesNumber > 1 && (
        <Pagination length={filteredPhones.length} />
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
