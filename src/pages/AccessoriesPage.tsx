/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
// eslint-disable-next-line import/no-cycle
import CustomSelect from './components/CustomSelect';
import '../styles/styles.scss';
import { Pagination } from './components/Pagination';
import {
  updateStateProductsAndUrl,
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import { Loader } from './components/Loader';
import { AsyncStatus } from '../types/AsyncStatus';
import {
  incrementAsync as loadedProducts,
} from '../features/products/productsSlice';
import { Product } from '../types/Product';
import { SortByOptions } from '../types/SortByOptions';
import { SelectAmountItems } from '../types/SelectAmountItems';
import { filteringVisibleSearchedProducts } from '../app/utils';
import { itemsOnPageOptions, sortByOptions } from '../types/SelectOptionsArr';
import {
  productsSelector,
  productsStatusSelector,
  searchBarSelector,
} from '../app/selector';

export const AccessoriesPage: FC = () => {
  const products: Product[] = useAppSelector(productsSelector);
  const statusLadingProducts = useAppSelector(productsStatusSelector);
  const [selectedOptions, setSelectedOptions] = useState({
    sortBy: SortByOptions.AGE,
    itemsShow: SelectAmountItems.SIXTEEN,
  });
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lastPhoneIndex = currentPage * +`${selectedOptions.itemsShow === 'all' ? Infinity : selectedOptions.itemsShow}`;
  const firstPhoneIndex = lastPhoneIndex - +selectedOptions.itemsShow;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const searchBarValue = useAppSelector(searchBarSelector);

  const paginate = (pagenumber: number) => setCurrentPage(pagenumber);

  useEffect(() => {
    dispatch(loadedProducts());
  }, []);

  useEffect(() => {
    updateStateProductsAndUrl(
      setVisibleProducts,
      products,
      selectedOptions,
      statusLadingProducts,
      currentPage,
      setSearchParams,
    );
    setCurrentPage(1);
  }, [selectedOptions]);

  useEffect(() => {
    updateStateProductsAndUrl(
      setVisibleProducts,
      products,
      selectedOptions,
      statusLadingProducts,
      currentPage,
      setSearchParams,
    );
  }, [currentPage, products]);

  const accessoriesSearched = useMemo(() => {
    return filteringVisibleSearchedProducts(
      visibleProducts, searchBarValue,
    ).filter(
      p => p.type === 'accessory',
    );
  }, [products]);

  const accessoriesSliced = accessoriesSearched.slice(
    firstPhoneIndex, lastPhoneIndex,
  );

  return (
    <div className="phones-page">
      {!searchBarValue ? (
        <>
          <Breadcrumbs />
          <h1 className="phones-page__title">Accessories</h1>
          <p className="phones-page__amount-phone-text">
            {`${accessoriesSearched.length} models`}
          </p>
          {accessoriesSearched.length > 0 && (
            <div className="phones-page__filter filter">
              <div className="filter__container">
                <h2 className="filter__title">Sort by</h2>
                <CustomSelect
                  options={sortByOptions}
                  defaultOption={selectedOptions.sortBy}
                  onChange={setSelectedOptions}
                />
              </div>
              <div className="filter__container">
                <h2 className="filter__title">Items on page</h2>
                <CustomSelect
                  options={itemsOnPageOptions}
                  defaultOption={selectedOptions.itemsShow}
                  onChange={setSelectedOptions}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="phones-page__result-items">{`${accessoriesSearched.length} results`}</p>
      )}

      {statusLadingProducts === AsyncStatus.LOADING ? (
        <Loader />
      ) : (
        <>
          <ProductsList products={accessoriesSliced} />
          {!searchBarValue
          && accessoriesSearched.length > accessoriesSliced.length
          && (
            <Pagination
              phonesPepPege={+selectedOptions.itemsShow}
              totalPhones={visibleProducts.length}
              onPaginate={paginate}
            />
          )}
        </>
      )}
    </div>
  );
};
