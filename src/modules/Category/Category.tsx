/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import cn from 'classnames';

import { Category as CategoryType } from '../../types';
import { Pagination } from '../shared/Pagination';
import { Text } from '../shared/ui/Text';
import { Select } from '../shared/ui/Select';
import { Container } from '../shared/Container';
import { Info } from './components/Info';
import { Products } from './components/Products';
import { SORT_SELECT_OPTIONS, TAKE_SELECT_OPTIONS } from './variables';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { SearchInput } from './components/SearchInput';
import { useCategory } from './useCategory';
import classes from './category.module.scss';

type Props = {
  category: CategoryType;
};

export const Category: FC<Props> = ({ category }) => {
  const {
    handleSortChange,
    handleTakeChange,
    preparedProducts,
    selectPage,
    setSearchQuery,
    status,
    filteredProducts,
    sortOption,
    takeOption,
    numberOfPages,
    page,
    searchQueryParam,
  } = useCategory(category);

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <Info
        numberOfProducts={filteredProducts.length}
        status={status}
        category={category}
        className={classes.page__info}
      />
      <Container.Grid>
        <label className={cn(classes.select, classes.select_sort)}>
          <Text.Small className={classes.select__text}>Sort</Text.Small>

          <Select
            onChange={handleSortChange}
            value={sortOption}
            options={SORT_SELECT_OPTIONS}
            className={classes.select__control}
          />
        </label>
        <label className={cn(classes.select, classes.select_take)}>
          <Text.Small className={classes.select__text}>
            Items on page
          </Text.Small>

          <Select
            onChange={handleTakeChange}
            value={takeOption}
            options={TAKE_SELECT_OPTIONS}
            className={classes.select__control}
          />
        </label>
      </Container.Grid>
      {preparedProducts.length > 0 || status !== 'fulfilled' ? (
        <Products
          take={4}
          status={status}
          products={preparedProducts}
          className={classes.page__products}
        />
      ) : (
        <Container className={classes.page__products}>
          <Text.H3>No products were found</Text.H3>
        </Container>
      )}
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
      <SearchInput
        initialQuery={searchQueryParam}
        setQuery={setSearchQuery}
        placeholder={'Find ' + category}
      />
    </Container>
  );
};
