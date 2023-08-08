import {
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { getData, getSortedProducts } from '../../api/dataOfProducts';
import { Loader } from '../../components/Loader';
import { SortBy } from '../../types/sortBy';
import { Dropdown } from '../../components/Dropdown';
import { ItemsOnPage, options } from '../../helpers/constants';
import { useLocalStorage } from '../../helpers/customHooks';
import { Pagination } from '../../components/Pagination';
import { PerPage } from '../../types/itemsPerPage';
import './style.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getFilteredItem } from '../../helpers/getFilteredItems';
import { NoSearchResults } from '../../components/NoSearchResults';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useLocalStorage('sorting', SortBy.Newest);
  const [searchParams, setSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useLocalStorage('perPage', PerPage.All);

  //*
  const query = searchParams.get('query');
  //*
  const updateSearchParams = () => {
    searchParams.set('sort', sortBy);
    searchParams.set('perPage', perPage);
    const page = searchParams.get('page');
    const all = searchParams.get('perPage') === 'all';
    const allAndPage = all && searchParams.has('page');

    if (!all && page !== '1') {
      searchParams.set('page', '1');
    }

    if (allAndPage) {
      searchParams.delete('page');
    }

    const sort = searchParams.get('sort');
    const ipP = searchParams.get('perPage');
    const defValue = sort === 'age' && ipP === 'all';

    if (defValue) {
      searchParams.delete('sort');
      searchParams.delete('perPage');
      searchParams.delete('page');
    }

    setSearchParams(searchParams);
  };

  const loadPhones = async () => {
    try {
      setIsLoader(true);
      const phonesFromServer = await getData();
      const dataPhones = getSortedProducts(phonesFromServer, sortBy);

      setPhones(dataPhones);
    } catch {
      setErrorMessage('something went wrong');
    } finally {
      setIsLoader(false);
    }
  };

  const updateStateBySort = (sorting: string) => {
    if (phones) {
      const dataNew = getSortedProducts(phones, sorting, false);

      setSortBy(sorting);
      setPhones(dataNew);
    }

    return null;
  };

  const getItems = () => {
    if (!phones || !getFilteredItem(phones, query).length) {
      return [];
    }

    return getFilteredItem(phones, query);
  };

  useEffect(() => {
    getItems();
  }, [phones, query]);

  useEffect(() => {
    loadPhones();
  }, []);

  useEffect(() => {
    updateStateBySort(sortBy);
  }, [sortBy]);

  useEffect(() => {
    updateSearchParams();
  }, [sortBy, perPage]);

  return (
    <>
      {!phones
        ? (isLoader && <Loader />)
        : (
          <>
            <div className="breadcrumbsContainer">
              <Breadcrumbs page="Phone" />
            </div>

            <h1 className="pageTitle">Mobile phones</h1>

            {!!getItems().length && (
              <h4 className="subTitle">
                {`${getItems().length} models`}
              </h4>
            )}

            {getItems().length ? (
              <>
                <div className="product__selection">
                  <div className="product__sorting">
                    <div className="product__title">
                      Sort by
                    </div>
                    <Dropdown
                      options={options}
                      selectOption={updateStateBySort}
                      localStorageName="dropdownOption"
                      localValueStart="0"
                      width={176}
                    />
                  </div>
                  <div className="product__sorting">
                    <div className="product__title">
                      Items on page
                    </div>
                    <Dropdown
                      options={ItemsOnPage}
                      selectOption={setPerPage}
                      localStorageName="itemsOnPage"
                      localValueStart="0"
                      width={128}
                    />
                  </div>
                </div>
                <Pagination
                  items={getFilteredItem(phones, query)}
                  itemsPerPage={+perPage}
                />
              </>
            ) : (<NoSearchResults />)}
            {!!errorMessage && (<p>{errorMessage}</p>)}
          </>
        )}
    </>
  );
};
