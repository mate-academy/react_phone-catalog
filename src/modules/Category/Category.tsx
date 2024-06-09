/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Category as CategoryType } from '../../types';
import { SELECT_CATEGORY, useProducts } from '../../app/features/products';
import { Pagination } from '../shared/Pagination';
import { Text } from '../shared/ui/Text';
import { Select } from '../shared/ui/Select';
import { Container } from '../shared/Container';
import { Info } from './components/Info';
import { Products } from './components/Products';
import {
  QuerySelectOption,
  SORT_SELECT_OPTIONS,
  SORT_VALUES,
  TAKE_SELECT_OPTIONS,
  sortSelectOptionDefault,
  takeSelectOptionDefault,
} from './variables';
import classes from './category.module.scss';
import { Breadcrumbs } from '../shared/Breadcrumbs';

type Props = {
  category: CategoryType;
};

export const Category: FC<Props> = ({ category }) => {
  const { products, status } = useProducts(SELECT_CATEGORY[category]);
  const [searchParams, setSearchParams] = useSearchParams();
  const isChangedByApp = useRef(false);
  const currentSortOption =
    SORT_SELECT_OPTIONS.find(
      option => option.value === searchParams.get('sort'),
    ) ?? sortSelectOptionDefault;

  const currentTakeOption =
    TAKE_SELECT_OPTIONS.find(
      option => option.value === searchParams.get('take'),
    ) ?? takeSelectOptionDefault;

  const setAppSearchParams = useCallback(
    (arg: Parameters<typeof setSearchParams>[0]) => {
      isChangedByApp.current = true;
      setSearchParams(arg, { preventScrollReset: true });
    },
    [setSearchParams],
  );
  const take = Math.min(+currentTakeOption.value, products.length);
  const numberOfPages = Math.ceil(products.length / take);
  const page = Math.max(
    Math.min(Number(searchParams.get('page')) || 1, numberOfPages),
    1,
  );
  const currentProducts = [...products]
    .sort((productA, productB) => {
      switch (currentSortOption.value) {
        case SORT_VALUES.title:
          return productA.name.localeCompare(productB.name);

        case SORT_VALUES.age:
          return productB.year - productA.year;

        case SORT_VALUES.price:
          return productA.price - productB.price;

        default:
          return 0;
      }
    })
    .slice((page - 1) * take, page * take);

  useEffect(() => {
    if (isChangedByApp.current) {
      isChangedByApp.current = false;

      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (currentTakeOption.value !== newSearchParams.get('take')) {
      newSearchParams.delete('take');
    }

    if (
      currentSortOption.value !== newSearchParams.get('sort') ||
      currentSortOption.value === sortSelectOptionDefault.value
    ) {
      newSearchParams.delete('sort');
    }

    if (
      (String(page) !== newSearchParams.get('page') &&
        status === 'fulfilled') ||
      page < 2
    ) {
      newSearchParams.delete('page');
    }

    setAppSearchParams(newSearchParams);
  }, [
    currentSortOption.value,
    currentTakeOption.value,
    page,
    searchParams,
    setAppSearchParams,
    status,
  ]);

  const onTakeChange = (value: unknown) => {
    const newTakeOption =
      TAKE_SELECT_OPTIONS[
        TAKE_SELECT_OPTIONS.indexOf(value as QuerySelectOption)
      ];

    if (!newTakeOption) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (newTakeOption === takeSelectOptionDefault) {
      newSearchParams.delete('take');
    } else {
      newSearchParams.set('take', newTakeOption.value);
      newSearchParams.delete('page');
    }

    setAppSearchParams(newSearchParams);
  };

  const onSortChange = (value: unknown) => {
    const newSortOption = SORT_SELECT_OPTIONS.find(option => option === value);

    if (!newSortOption) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (newSortOption === sortSelectOptionDefault) {
      newSearchParams.delete('sort');
    } else {
      newSearchParams.set('sort', newSortOption.value);
    }

    setAppSearchParams(newSearchParams);
  };

  const selectPage = (pageIndex: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (pageIndex > 0 && pageIndex < numberOfPages) {
      newSearchParams.set('page', String(pageIndex + 1));
    } else {
      newSearchParams.delete('page');
    }

    setAppSearchParams(newSearchParams);
    setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  return (
    <div className={classes.page}>
      <Breadcrumbs />
      <Info
        numberOfProducts={products.length}
        status={status}
        category={category}
        className={classes.page__info}
      />
      <Container.Grid
        className={cn(classes.page__selects, classes.selectContaienr)}
      >
        <label className={cn(classes.select, classes.select_sort)}>
          <Text.Small className={classes.select__text}>Sort</Text.Small>

          <Select
            onChange={onSortChange}
            value={currentSortOption}
            options={SORT_SELECT_OPTIONS}
            className={classes.select__control}
          />
        </label>
        <label className={cn(classes.select, classes.select_take)}>
          <Text.Small className={classes.select__text}>
            Items on page
          </Text.Small>

          <Select
            onChange={onTakeChange}
            value={currentTakeOption}
            options={TAKE_SELECT_OPTIONS}
            className={classes.select__control}
          />
        </label>
      </Container.Grid>
      <Products
        take={4}
        status={status}
        products={currentProducts}
        className={classes.page__products}
      />
      {numberOfPages > 1 && (
        <Pagination
          className={classes.page__pagination}
          currentSelectedIndex={page - 1}
          pageCount={numberOfPages}
          select={selectPage}
          nextButton={<Pagination.NextButton />}
          prevButton={<Pagination.PrevButton />}
          crumbs={<Pagination.Crumbs take={4} />}
        />
      )}
    </div>
  );
};
