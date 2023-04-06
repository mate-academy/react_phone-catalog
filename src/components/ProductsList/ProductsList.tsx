/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { ProductCard } from '../ProductCard';
import { ProductItem } from '../../types/ProductItem';
import { Pagination } from '../Pagination';

import './productsList.scss';

type Props = {
  phonesList: ProductItem[];
};

export const ProductsList: React.FC<Props> = ({ phonesList }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const newSearch = new URLSearchParams(searchParams.toString());

  const sortOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'name', label: 'Aplphabetical' },
    { value: 'price', label: 'Cheapest' },
  ];

  const initialSortValue = searchParams.has('sort')
    ? sortOptions.find((item) => item.value === searchParams.get('sort'))
      || sortOptions[0]
    : sortOptions[0];

  const [sortBy, setSortBy] = useState(initialSortValue);
  let sortedList = [...phonesList];

  useMemo(() => {
    switch (sortBy.value) {
      case 'price':
        sortedList.sort((a: ProductItem, b: ProductItem) => (
          (a.price - ((a.price / 100) * a.discount))
          - (b.price - ((b.price / 100) * b.discount))
        ));
        break;
      case 'name':
        sortedList.sort((a: ProductItem, b: ProductItem) => (
          a.name.localeCompare(b.name)
        ));
        break;

      default:
        sortedList.sort((a: ProductItem, b: ProductItem) => (
          a.age - b.age
        ));
    }
  }, [sortBy, sortedList]);

  if (query) {
    sortedList = sortedList.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  const totalItemsCount = sortedList.length;
  const paginationOptions = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: totalItemsCount, label: 'All' },
  ];

  const initialPerPageValue = () => {
    const search = searchParams.get('perPage');

    if (search) {
      return paginationOptions.find((item) => (
        item.value === Number(search)
      )) || paginationOptions[1];
    }

    return paginationOptions[1];
  };

  const initialPageValue = searchParams.get('page') || 1;
  const [page, setPage] = useState(+initialPageValue);
  const [perPage, setPerPage] = useState(initialPerPageValue());

  const startIndex = perPage.value * (page - 1);
  const endIndex = page * perPage.value > totalItemsCount
    ? totalItemsCount
    : page * perPage.value;

  const onPageChange = (pageNum: number) => {
    setPage(pageNum);
    newSearch.set('page', `${pageNum}`);
    setSearchParams(newSearch.toString());
  };

  const nextPage = () => {
    setPage(prevState => prevState + 1);
    newSearch.set('page', `${page + 1}`);
    setSearchParams(newSearch.toString());
  };

  const prevPage = () => {
    setPage(prevState => prevState - 1);
    newSearch.set('page', `${page - 1}`);
    setSearchParams(newSearch.toString());
  };

  sortedList = sortedList.slice(startIndex, endIndex);

  return (
    <div className="products">
      {sortedList.length > 0 && (
        <>
          <p className="products-list__count">
            {`${sortedList.length} models`}
          </p>

          <div className="products-nav">
            <div className="products-nav__item products-nav__item_sort">
              <span>Sort by</span>
              <Select
                value={sortBy}
                onChange={(selected: any) => {
                  setSortBy(selected);

                  newSearch.set('sort', `${selected.value}`);
                  setSearchParams(newSearch.toString());
                }}
                options={sortOptions}
              />
            </div>
            <div className="products-nav__item products-nav__item_pagination">
              <span>Items on page</span>
              <Select
                value={perPage}
                onChange={(selected: any) => {
                  onPageChange(1);
                  setPerPage(selected);
                  newSearch.set('perPage', `${selected.value}`);
                  setSearchParams(newSearch.toString());
                }}
                options={paginationOptions}
              />
            </div>
          </div>

          <div className="products-list">
            {sortedList && sortedList.map((item: ProductItem) => (
              <ProductCard
                key={item.id}
                card={item}
              />
            ))}
          </div>
        </>
      )}

      {sortedList.length === 0 && (
        <p className="products-list__not-found">
          Items not found
        </p>
      )}

      {totalItemsCount > perPage.value && (
        <Pagination
          total={totalItemsCount}
          perPage={perPage.value}
          page={page}
          onPageChange={onPageChange}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
};
