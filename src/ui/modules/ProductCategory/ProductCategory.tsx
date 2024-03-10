/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  Pagination,
  getStartItemIndexInPage,
  getEndItemIndexInPage,
  getMaxPageNumber,
  CustomDropdown,
  Counter,
  NoProducts,
  Breadcrumb,
  ProductList,
} from '../../components';

import {
  getSearchWith,
  getEnumKeyByEnumValue,
  capitalize,
} from '../../../utils';
import {
  PerPage,
  SortBy,
  Product,
  SortByOptions,
  PerPageOptions,
} from '../../../types';
import { useSearch } from '../../../hooks';
import './ProductCategory.scss';
import { Typography } from '../../base';

type Props = {
  products: Product[];
  category: string;
};

export const ProductCategory: React.FC<Props> = ({ products, category }) => {
  const [productsToRender, setProductsToRender] = useState<Product[]>(products);
  const [perPageFilterValue, setPerPageFilterValue] = useState<PerPage>(
    PerPage.perPage16,
  );
  const [sortByFilterValue, setSortByFilterValue] =
    useState<keyof typeof SortBy>('name');

  const [isInitialParams, setIsInitialParams] = useState<boolean>(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchedItems = useSearch(products, 'name');
  const productsQty = searchedItems.length;
  const categoryName = capitalize(category);

  const location = useLocation();
  const page = searchParams.get('page') || '';
  const perPage = searchParams.get('perPage') || '';
  const sort = searchParams.get('sort') || '';

  // #region handlers change page and perPage
  function setSearchWith(params: { [key: string]: string | string[] | null }) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function sortProducts(
    productsList: Product[],
    key: keyof typeof SortBy | null,
  ) {
    let sorted = [];

    switch (key) {
      case 'age': {
        sorted = [...productsList].sort(
          (item1, item2) => item2.year - item1.year,
        );
        break;
      }

      case 'name': {
        sorted = [...productsList].sort((item1, item2) =>
          item1.name.localeCompare(item2.name),
        );
        break;
      }

      case 'price': {
        sorted = [...productsList].sort(
          (item1, item2) => item1.price - item2.price,
        );
        break;
      }

      default: {
        sorted = [...productsList];
      }
    }

    return sorted;
  }

  const handleChangePage = (pageNum: number) => {
    setSearchWith({
      page: pageNum !== 1 ? `${pageNum}` : null,
    });
  };

  const handleChangePerPage = (perPageQty: string) => {
    setSearchWith({
      perPage: +perPageQty !== -1 ? `${+perPageQty}` : null,
    });

    const keyFilterBy = getEnumKeyByEnumValue(PerPage, perPageQty);
    const filterBy = keyFilterBy ? PerPage[keyFilterBy] : PerPage.perPageAll;

    setPerPageFilterValue(filterBy);
  };

  const handleChangeSortBy = (sortByKey: string) => {
    setSearchWith({
      sort: sortByKey,
    });
    const keyFilterBy = sortByKey as keyof typeof SortBy;

    setSortByFilterValue(keyFilterBy);
  };

  // #endregion

  useEffect(() => {
    if (!isInitialParams) {
      const perPageQty =
        !perPage && perPageFilterValue !== -1
          ? perPageFilterValue
          : +perPage || (-1 as PerPage);

      const firstItemIndex = getStartItemIndexInPage(
        page ? +page : 1,
        perPageQty ? +perPageQty : -1,
        getMaxPageNumber(productsQty, perPageFilterValue),
      );

      const lastItemIndex = getEndItemIndexInPage(
        page ? +page : 1,
        perPageQty,
        productsQty,
      );

      const sortKey = sort ? (sort as keyof typeof SortBy) : sortByFilterValue;

      const sorted = sortKey
        ? sortProducts(searchedItems, sortKey)
        : searchedItems;

      const filtered = [...sorted].slice(firstItemIndex, lastItemIndex);

      setPerPageFilterValue(perPageQty as PerPage);
      setProductsToRender(filtered);
    }
  }, [searchParams, searchedItems]);

  useEffect(() => {
    const firstItemIndex = 0;
    const lastItemIndex =
      productsQty - 1 > perPageFilterValue
        ? perPageFilterValue
        : productsQty - 1;
    const sorted = sortProducts(searchedItems, sortByFilterValue);
    const filtered = [...sorted].slice(firstItemIndex, lastItemIndex);

    if (perPage) {
      setPerPageFilterValue(+perPage as PerPage);
    }

    setProductsToRender(filtered);
    setIsInitialParams(false);
  }, []);

  return (
    <>
      <Breadcrumb path={location.pathname} />
      <Typography type="title" level="1" className="category__name">
        {productsToRender.length > 0
          ? categoryName
          : `${categoryName} not found`}
      </Typography>
      <div data-cy="productList">
        {productsQty > 0 && (
          <Counter qty={productsQty} className="category__counter" />
        )}
        {productsToRender.length > 0 && (
          <>
            <div className="filters">
              <CustomDropdown
                options={SortByOptions}
                selectedValue={sortByFilterValue}
                label="Sort by"
                onChangeOption={handleChangeSortBy}
              />
              <CustomDropdown
                options={PerPageOptions}
                selectedValue={perPageFilterValue as unknown as string}
                label="Items on page"
                onChangeOption={handleChangePerPage}
              />
            </div>

            <ProductList products={productsToRender} />

            <Pagination
              total={productsQty}
              perPage={perPageFilterValue}
              page={+page === 0 ? 1 : +page}
              onChangePage={(pageNum: number) => handleChangePage(pageNum)}
            />
          </>
        )}
        {productsToRender.length === 0 && (
          <NoProducts label="No Products Found" />
        )}
      </div>
    </>
  );
};
