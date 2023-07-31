/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Breadcrumbs from './components/Breadcrumbs';
import { ProductsList } from './components/ProductsList';
// eslint-disable-next-line import/no-cycle
import CustomSelect from './components/CustomSelect';

import '../styles/styles.scss';
import { Pagination } from './components/Pagination';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './components/Loader';
import { AsyncStatus } from '../types/AsyncStatus';
import {
  incrementAsync as loadedProducts,
} from '../features/products/productsSlice';
import { Product } from '../types/Product';

export enum SortByOptions {
  AGE = 'age',
  NAME = 'name',
  PRICE = 'price',
}

export const TabletsPage: FC = () => {
  const products: Product[] = useAppSelector(state => state.products.value);
  const statusLadingProducts = useAppSelector(state => state.products.status);
  const [selectedOptions, setSelectedOptions] = useState({
    sortBy: 'age',
    itemsShow: '16',
  });
  const [visiblePrroducts, setVisibleProducts] = useState<Product[]>([]);
  const sortByOptions = ['age', 'name', 'price'];
  const itemsOnPageOptions = ['4', '8', '16', 'all'];
  const [currentPage, setCurrentPage] = useState(1);
  const lastPhoneIndex = currentPage * +`${selectedOptions.itemsShow === 'all' ? Infinity : selectedOptions.itemsShow}`;
  const firstPhoneIndex = lastPhoneIndex - +selectedOptions.itemsShow;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const searchBarValue = useAppSelector(state => state.searchBar.value);

  const paginate = (pagenumber: number) => setCurrentPage(pagenumber);

  function getVisibleProducts(arr: Product[]) {
    let result: Product[] = [...arr.filter(
      product => product.type === 'tablet',
    )];

    switch (selectedOptions.sortBy) {
      case SortByOptions.AGE:
        result = result.sort((a, b) => b.age - a.age);
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
    dispatch(loadedProducts());
  }, []);

  useEffect(() => {
    if (statusLadingProducts === AsyncStatus.IDLE && products.length > 0) {
      const result = getVisibleProducts(products);

      setVisibleProducts(result);
    }

    const params = new URLSearchParams();

    params.set('page', currentPage.toString());
    params.set('sort', selectedOptions.sortBy);
    params.set('perPage', selectedOptions.itemsShow);
    setSearchParams(params);
  }, [products]);

  useEffect(() => {
    if (statusLadingProducts === AsyncStatus.IDLE && products.length > 0) {
      const result = getVisibleProducts(products);

      setVisibleProducts(result);
    }

    const params = new URLSearchParams();

    params.set('page', `${currentPage}`);
    params.set('sort', selectedOptions.sortBy);
    params.set('perPage', selectedOptions.itemsShow);

    setSearchParams(params);
  }, [selectedOptions]);

  useEffect(() => {
    if (statusLadingProducts === AsyncStatus.IDLE && products.length > 0) {
      const result = getVisibleProducts(products);

      setVisibleProducts(result);
    }

    const params = new URLSearchParams();

    params.set('page', `${currentPage}`);
    params.set('sort', selectedOptions.sortBy);
    params.set('perPage', selectedOptions.itemsShow);
    setSearchParams(params);
  }, [currentPage]);

  const phonesSearched = visiblePrroducts.filter((product) => {
    if (searchBarValue.trim() === '') {
      return true;
    }

    const queryWords = searchBarValue.toLowerCase().split(' ');
    const productName = product.name.toLowerCase();

    return queryWords.every((word) => productName.includes(word));
  });

  const phonesSliced = phonesSearched.slice(firstPhoneIndex, lastPhoneIndex);

  return (
    <div className="phones-page">
      {!searchBarValue ? (
        <>
          <Breadcrumbs />
          <h1 className="phones-page__title">Tablets</h1>
          <p className="phones-page__amount-phone-text">
            {`${phonesSearched.length} models`}
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

      {statusLadingProducts === AsyncStatus.LOADING ? (
        <Loader />
      ) : (
        <>
          <ProductsList products={phonesSliced} />
          {!searchBarValue && (
            <Pagination
              phonesPepPege={+selectedOptions.itemsShow}
              totalPhones={phonesSearched.length}
              onPaginate={paginate}
            />
          )}
        </>
      )}
    </div>
  );
};
