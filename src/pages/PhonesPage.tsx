import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
// eslint-disable-next-line import/no-cycle
import CustomSelect from './components/CustomSelect';
import { Phone } from '../types/Phone';

import '../styles/styles.scss';
import { Pagination } from './components/Pagination';
import { useAppSelector } from '../app/hooks';
import { Loader } from './components/Loader';
import { AsyncStatus } from '../types/AsyncStatus';

export enum SortByOptions {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

export const PhonesPage: FC = () => {
  const phones: Phone[] = useAppSelector(state => state.phones.value);
  const statusLadingPhones = useAppSelector(state => state.phones.status);
  const [selectedOptions, setSelectedOptions] = useState({
    sortBy: 'age',
    itemsShow: '16',
  });
  const [visiblePhones, setVisiblePhones] = useState<Phone[]>([]);
  // const breadcrumbItems = [
  //   { text: 'Home', link: '/' },
  //   { text: 'Phones', link: '/phones' },
  // ];
  const sortByOptions = ['age', 'name', 'price'];
  const itemsOnPageOptions = ['4', '8', '16', 'all'];
  const [currentPage, setCurrentPage] = useState(1);
  const lastPhoneIndex = currentPage * +`${selectedOptions.itemsShow === 'all' ? Infinity : selectedOptions.itemsShow}`;
  const firstPhoneIndex = lastPhoneIndex - +selectedOptions.itemsShow;
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line no-console
  console.log(searchParams);

  const paginate = (pagenumber: number) => setCurrentPage(pagenumber);

  function getVisiblePhones(arr: Phone[]) {
    let result: Phone[] = [...arr];

    switch (selectedOptions.sortBy) {
      case SortByOptions.AGE:
        result = result.sort((a, b) => b.year - a.year);
        break;
      case SortByOptions.NAME:
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortByOptions.PRICE:
        result = result.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }

    return result;
  }

  useEffect(() => {
    const result = getVisiblePhones(phones);

    setVisiblePhones(result);
    const params = new URLSearchParams();

    params.set('page', currentPage.toString());
    params.set('sort', selectedOptions.sortBy);
    params.set('perPage', selectedOptions.itemsShow);
    setSearchParams(params);
  }, [phones]);

  useEffect(() => {
    const result = getVisiblePhones(phones);
    const params = new URLSearchParams();

    params.set('page', `${currentPage}`);
    params.set('sort', selectedOptions.sortBy);
    params.set('perPage', selectedOptions.itemsShow);

    setSearchParams(params);

    setVisiblePhones(result);
  }, [selectedOptions]);

  useEffect(() => {
    const result = getVisiblePhones(phones);
    const params = new URLSearchParams();

    params.set('page', `${currentPage}`);
    params.set('sort', selectedOptions.sortBy);
    params.set('perPage', selectedOptions.itemsShow);
    setSearchParams(params);
    setVisiblePhones(result);
  }, [currentPage]);

  const phonesSliced = visiblePhones.slice(firstPhoneIndex, lastPhoneIndex);

  return (
    <div className="phones-page">
      <Breadcrumbs />
      <h1 className="phones-page__title">Mobile phones</h1>
      <p className="phones-page__amount-phone-text">95 models</p>
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
      {statusLadingPhones === AsyncStatus.LOADING ? (
        <Loader />
      ) : (
        <>
          <ProductsList products={phonesSliced} />
          <Pagination
            phonesPepPege={+selectedOptions.itemsShow}
            totalPhones={phones.length}
            onPaginate={paginate}
          />
        </>
      )}
    </div>
  );
};
