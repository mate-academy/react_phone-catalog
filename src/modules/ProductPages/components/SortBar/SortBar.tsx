/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Select, { components, GroupBase, MenuProps } from 'react-select';
import styles from './SortBar.module.scss';
import {
  ItemsSortEnum,
  ItemsValueEnum,
  SearchEnum,
  SortEnum,
} from '../../../../types/SearchType';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../utils/searchHelper';
import { customSelectStyles } from './customSelectStyle';
import './select.scss';
import { SearchBar } from '../SearchBar/SearchBar';

const sortBy = [
  { label: SortEnum.Default, value: null, removeSelected: false },
  { label: SortEnum.Newest, value: SortEnum.Newest.toLowerCase() },
  { label: SortEnum.Oldest, value: SortEnum.Oldest.toLowerCase() },
  { label: SortEnum.Expensivest, value: SortEnum.Expensivest.toLowerCase() },
  { label: SortEnum.Cheapest, value: SortEnum.Cheapest.toLowerCase() },
];

const itemsPage = [
  { label: ItemsSortEnum.All, value: null },
  { label: ItemsSortEnum.Twelve, value: ItemsValueEnum.Twelve },
  { label: ItemsSortEnum.TwentyFour, value: ItemsValueEnum.TwentyFour },
  { label: ItemsSortEnum.ThirtySix, value: ItemsValueEnum.ThirtySix },
  { label: ItemsSortEnum.FortyEight, value: ItemsValueEnum.FortyEight },
];

const placeHolder = {
  sort: 'choose sort type',
  items: 'items on page',
  search: 'Search by name',
};

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const CustomMenu: React.FC<
  MenuProps<unknown, boolean, GroupBase<unknown>>
> = props => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={menuVariants}
    transition={{ duration: 0.3 }}
  >
    <components.Menu {...props} />
  </motion.div>
);

type SortByType = (typeof sortBy)[0] | (typeof sortBy)[1];
type ItemsPageType = (typeof itemsPage)[0] | (typeof itemsPage)[1];

export const SortBar: React.FC = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get(SearchEnum.SORT);
  const itemsParam = searchParams.get(SearchEnum.ITEMS);

  const [selectedSort, setSelectedSort] = useState<SortByType | null>(() => {
    const found = sortBy.find(opt => opt.value === sortParam);

    return sortParam && found ? found : null;
  });

  const [selectedItems, setSelectedItems] = useState<ItemsPageType | null>(
    () => {
      const found = itemsPage.find(opt => opt.value === Number(itemsParam));

      return itemsParam && found ? found : null;
    },
  );

  const handleSortByChange = (newValue: unknown) => {
    const option = newValue as SortByType | null;

    setSelectedSort(option && option.value ? option : null);
  };

  const handleItemsChange = (newValue: unknown) => {
    const option = newValue as ItemsPageType | null;

    setSelectedItems(option && option.value ? option : null);
  };

  const isFirstRender = React.useRef(true);

  useEffect(() => {
    const newParams: Record<string, string | null> = {
      [SearchEnum.SORT]: selectedSort ? selectedSort.value : null,
      [SearchEnum.ITEMS]: selectedItems?.value
        ? String(selectedItems.value)
        : null,
    };

    if (!selectedItems?.value || selectedSort?.value) {
      newParams[SearchEnum.PAGE] = null;
    }

    const updatedParams = getSearchWith(searchParams, newParams);

    const currentParamsStr = searchParams.toString();
    const updatedParamsStr = new URLSearchParams(updatedParams).toString();

    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    if (currentParamsStr !== updatedParamsStr) {
      setSearchParams(updatedParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort, selectedItems, setSearchParams]);

  return (
    <div className={cn(styles['sort-bar'])}>
      <div
        className={cn(
          styles['sort-bar__select-content'],
          styles['sort-bar__search-bar'],
        )}
      >
        <p className={cn(styles['sort-bar__select-title'])}>
          {placeHolder.search}
        </p>
        <SearchBar />
      </div>
      <div
        className={cn(
          styles['sort-bar__select-content'],
          styles['sort-bar__select-content--first'],
        )}
      >
        <p className={cn(styles['sort-bar__select-title'])}>
          {placeHolder.sort}
        </p>
        <Select
          value={selectedSort}
          options={sortBy}
          onChange={handleSortByChange}
          isSearchable={false}
          placeholder={placeHolder.sort}
          className={cn(
            styles['sort-bar__select-item'],
            styles['sort-bar__select-item--first'],
          )}
          classNamePrefix="select"
          styles={customSelectStyles}
          components={{ Menu: CustomMenu }}
        />
      </div>
      <div
        className={cn(
          styles['sort-bar__select-content'],
          styles['sort-bar__select-content--second'],
        )}
      >
        <p className={cn(styles['sort-bar__select-title'])}>
          {placeHolder.items}
        </p>

        <div
          className={cn(
            styles['sort-bar__select-item'],
            styles['sort-bar__select-item--second'],
          )}
        >
          <Select
            value={selectedItems}
            options={itemsPage}
            onChange={handleItemsChange}
            isSearchable={false}
            placeholder={placeHolder.items}
            classNamePrefix="select"
            styles={customSelectStyles}
            components={{ Menu: CustomMenu }}
          />
        </div>
      </div>
    </div>
  );
});

SortBar.displayName = 'SortBar';
