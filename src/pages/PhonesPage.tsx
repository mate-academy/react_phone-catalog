/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
// eslint-disable-next-line import/no-cycle
// import CustomSelect from './components/CustomSelect';
import { Product } from '../types/Product';

import '../styles/styles.scss';
import { Pagination } from './components/Pagination';
import {
  updateStateProductsAndUrl,
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import { Loader } from './components/Loader';
import { AsyncStatus } from '../types/AsyncStatus';
import { incrementAsync as loadedPhones } from '../features/phones/phonesSlice';
// eslint-disable-next-line import/no-cycle
import CustomSelect from './components/CustomSelect';
import { SortByOptions } from '../types/SortByOptions';
import { SelectAmountItems } from '../types/SelectAmountItems';
import { filteringVisibleSearchedProducts } from '../app/utils';
import { itemsOnPageOptions, sortByOptions } from '../types/SelectOptionsArr';
import { phonesSelector, phonesStatusSelector } from '../app/selector';

export const PhonesPage: FC = () => {
  const phones: Product[] = useAppSelector(phonesSelector);
  const statusLadingPhones = useAppSelector(phonesStatusSelector);
  const [selectedOptions, setSelectedOptions] = useState({
    sortBy: SortByOptions.AGE,
    itemsShow: SelectAmountItems.SIXTEEN,
  });

  const [visiblePhones, setVisiblePhones] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lastPhoneIndex = currentPage * +`${selectedOptions.itemsShow === 'all' ? Infinity : selectedOptions.itemsShow}`;
  const firstPhoneIndex = lastPhoneIndex - +selectedOptions.itemsShow;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const searchBarValue = useAppSelector(state => state.searchBar.value);
  const paginate = (pagenumber: number) => setCurrentPage(pagenumber);

  useEffect(() => {
    dispatch(loadedPhones());
  }, []);

  useEffect(() => {
    updateStateProductsAndUrl(
      setVisiblePhones,
      phones,
      selectedOptions,
      statusLadingPhones,
      currentPage,
      setSearchParams,
    );

    setCurrentPage(1);
  }, [selectedOptions]);

  useEffect(() => {
    updateStateProductsAndUrl(
      setVisiblePhones,
      phones,
      selectedOptions,
      statusLadingPhones,
      currentPage,
      setSearchParams,
    );
  }, [currentPage, phones]);

  const phonesSearched = filteringVisibleSearchedProducts(
    visiblePhones, searchBarValue,
  );

  const phonesSliced = phonesSearched.slice(firstPhoneIndex, lastPhoneIndex);

  return (
    <div className="phones-page">
      {!searchBarValue ? (
        <>
          <Breadcrumbs />
          <h1 className="phones-page__title">Mobile phones</h1>
          <p className="phones-page__amount-phone-text">
            {`${visiblePhones.length} models`}
          </p>
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
        </>
      ) : (
        <p className="phones-page__result-items">{`${phonesSearched.length} results`}</p>
      )}
      {statusLadingPhones === AsyncStatus.LOADING ? (
        <Loader />
      ) : (
        <>
          <ProductsList products={phonesSliced} />
          {!searchBarValue && visiblePhones.length > phonesSliced.length && (
            <Pagination
              phonesPepPege={+selectedOptions.itemsShow}
              totalPhones={visiblePhones.length}
              onPaginate={paginate}
            />
          )}
        </>
      )}
    </div>
  );
};
