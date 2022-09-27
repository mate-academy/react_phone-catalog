import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { NoSearchResultsL } from '../NoSearchResults';

import './ProductList.scss';

type Props = {
  devices: Product[];
};

export const ProductsList: React.FC<Props> = ({ devices }) => {
  const [page, setPage] = useState(1);
  const [allPhones, setAllPhones] = useState<Product[]>([]);

  useEffect(() => {
    setAllPhones(devices);
  }, [devices]);

  const optionsSort = [
    { value: 'age', label: 'Newest' },
    { value: 'name', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const optionsPagination = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: '100', label: 'All' },
  ];

  const history = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const itemsOnPage = searchParams.get('prePage') || 4;
  const visiblePage = searchParams.get('page') || 1;

  const handlerSortChange = (
    newValue: SingleValue<{ value: string; label: string; }>,
  ) => {
    const value = newValue?.value;

    setPage(1);

    if (newValue && value) {
      searchParams.set('sortBy', value);
      searchParams.set('page', '1');
    }

    history(`?${searchParams.toString()}`);
  };

  const handlerPagination = (
    newValue: SingleValue<{ value: string; label: string; }>,
  ) => {
    const value = newValue?.value;

    setPage(1);

    if (newValue && value) {
      searchParams.set('prePage', value);
    }

    history(`?${searchParams.toString()}`);
  };

  const visiblePhones = allPhones;

  if (sortBy) {
    visiblePhones.sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'age':
          return a.age - b.age;
        case 'name':
          return (
            a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
          );
        case 'price':
          return a.price - b.price;
        default:
          return a.age - b.age;
      }
    });
  }

  useEffect(() => {
    setPage(+visiblePage);
  }, [visiblePage]);

  const total = visiblePhones.length;

  const pageChange = (num: number) => {
    setPage(num);

    searchParams.set('page', `${num}`);

    history(`?${searchParams.toString()}`);
  };

  const prePage = +itemsOnPage;

  const coutPage = Math.ceil(total / prePage);

  const btn = Array.from({ length: coutPage }, (_, k: number) => k + 1);

  const firstItemOnPage = ((page * prePage) - prePage + 1) - 1;
  const lastItemOnPage = (page * prePage) - 1;

  return (
    <div className="ProductsList">
      <div className="ProductsList__settings">
        <div className="ProductsList__setting-sort">
          <span className="ProductsList__select-title">Sort by</span>
          <Select
            classNamePrefix="ProductsList"
            className="ProductsList__sort"
            defaultValue={optionsSort[0]}
            options={optionsSort}
            isSearchable={false}
            onChange={handlerSortChange}
          />
        </div>
        <div className="ProductsList__setting-pagination">
          <span className="ProductsList__select-title">Item on page</span>
          <Select
            classNamePrefix="ProductsList"
            className="ProductsList__sort"
            defaultValue={optionsPagination[0]}
            options={optionsPagination}
            isSearchable={false}
            onChange={handlerPagination}
          />
        </div>
      </div>
      {visiblePhones.length > 0 ? (
        <div className="ProductsList__content">
          {visiblePhones.filter((phone, index) => {
            if (index >= firstItemOnPage && index <= lastItemOnPage) {
              return phone;
            }

            return false;
          }).map(phone => <ProductCard key={phone.id} product={phone} />)}
        </div>
      ) : (
        <NoSearchResultsL />
      )}
      {coutPage > 1 && (
        <Pagination
          btn={btn}
          coutPage={coutPage}
          page={+visiblePage}
          pageChange={pageChange}
        />
      )}
    </div>
  );
};
