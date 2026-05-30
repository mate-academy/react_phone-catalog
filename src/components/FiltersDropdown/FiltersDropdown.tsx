import React, { useContext, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './FiltersDropdown.module.scss';
import {
  ItemsPerPageOptions,
  ProductsContext,
  SearchOptions,
  SortOptions,
} from '../../contexts/ProductsContext';

type DropdownOption = {
  value: SortOptions | ItemsPerPageOptions;
  label: string;
};

const sortOptions: DropdownOption[] = [
  { value: SortOptions.Newest, label: 'Newest' },
  { value: SortOptions.NameAsc, label: 'Name: A to Z' },
  { value: SortOptions.NameDesc, label: 'Name: Z to A' },
  { value: SortOptions.PriceAsc, label: 'Price: Low to High' },
  { value: SortOptions.PriceDesc, label: 'Price: High to Low' },
];

const itemsPerPageOptions: DropdownOption[] = [
  { value: ItemsPerPageOptions.Sixteen, label: '16' },
  { value: ItemsPerPageOptions.TwentyFour, label: '24' },
  { value: ItemsPerPageOptions.ThirtyTwo, label: '32' },
  { value: ItemsPerPageOptions.Forty, label: '40' },
  { value: ItemsPerPageOptions.FortyEight, label: '48' },
];

type DropdownProps = {
  label: string;
  options: DropdownOption[];
  isOpen: boolean;
  onClick: () => void;
  onBlur: () => void;
  currentValue: SortOptions | ItemsPerPageOptions;
  onOptionSelect: (value: SortOptions | ItemsPerPageOptions) => void;
  getSelectedLabel: (
    options: DropdownOption[],
    selectedValue: SortOptions | ItemsPerPageOptions,
  ) => React.ReactNode;
  getOptionStyles: (
    value: SortOptions | ItemsPerPageOptions,
    currentValue: SortOptions | ItemsPerPageOptions,
  ) => React.CSSProperties;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  isOpen,
  onClick,
  onBlur,
  currentValue,
  onOptionSelect,
  getSelectedLabel,
  getOptionStyles,
}) => (
  <div className={styles.buttons__button} tabIndex={0} onBlur={onBlur}>
    <p className={styles.button__label}>{label}</p>
    <div
      className={classNames(styles.button__select, {
        [styles['button__select--active']]: isOpen,
      })}
      onClick={onClick}
    >
      {getSelectedLabel(options, currentValue)}
      <div
        className={styles.button__icon}
        style={
          isOpen ? { backgroundImage: 'url(./icons/chevron-arrow-up.svg)' } : {}
        }
      ></div>
    </div>
    <div
      className={classNames(styles.button__items, { 'not-visible': !isOpen })}
    >
      {options.map(option => (
        <p
          key={option.value}
          className={styles.button__option}
          onClick={() => onOptionSelect(option.value)}
          style={getOptionStyles(option.value, currentValue)}
        >
          {option.label}
        </p>
      ))}
    </div>
  </div>
);

export const FiltersDropdown: React.FC = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const { sortOption, itemsPerPage, isSortDropdownOpen, isItemDropdownOpen } =
    state;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDropdownChange = useCallback(
    (value: SortOptions | ItemsPerPageOptions) => {
      const params = new URLSearchParams(searchParams);

      if (isNaN(+value)) {
        dispatch({ type: 'SET_SORT_OPTION', payload: value as SortOptions });

        if (value !== SortOptions.Newest) {
          params.set(SearchOptions.Sort, String(value));
        } else {
          params.delete(SearchOptions.Sort);
        }

        dispatch({ type: 'SET_IS_SORT_DROPDOWN_OPEN', payload: false });
      } else {
        dispatch({
          type: 'SET_ITEMS_PER_PAGE',
          payload: value as ItemsPerPageOptions,
        });
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
        params.delete(SearchOptions.Page);

        if (value !== ItemsPerPageOptions.Sixteen) {
          params.set(SearchOptions.Items, String(value));
        } else {
          params.delete(SearchOptions.Items);
        }

        dispatch({ type: 'SET_IS_ITEM_DROPDOWN_OPEN', payload: false });
      }

      setSearchParams(params);
    },
    [dispatch, searchParams, setSearchParams],
  );

  const getSelectedLabel = useCallback(
    (
      options: DropdownOption[],
      selectedValue: SortOptions | ItemsPerPageOptions,
    ) => {
      const selectedOption = options.find(
        option => option.value === selectedValue,
      );

      return (
        <span className={styles['button__content-value']}>
          {selectedOption?.label}
        </span>
      );
    },
    [],
  );

  const getOptionStyles = useCallback(
    (
      value: SortOptions | ItemsPerPageOptions,
      currentValue: SortOptions | ItemsPerPageOptions,
    ): React.CSSProperties => {
      return value === currentValue
        ? { pointerEvents: 'none', opacity: 0.5 }
        : {};
    },
    [],
  );

  return (
    <div className={styles.buttons}>
      <div className={classNames(styles.button, styles.button__sort)}>
        <Dropdown
          label="Sort by"
          options={sortOptions}
          isOpen={isSortDropdownOpen}
          onClick={() =>
            dispatch({
              type: 'SET_IS_SORT_DROPDOWN_OPEN',
              payload: !isSortDropdownOpen,
            })
          }
          onBlur={() =>
            dispatch({ type: 'SET_IS_SORT_DROPDOWN_OPEN', payload: false })
          }
          currentValue={sortOption}
          onOptionSelect={handleDropdownChange}
          getSelectedLabel={getSelectedLabel}
          getOptionStyles={getOptionStyles}
        />
      </div>

      <div className={classNames(styles.button, styles.button__quantity)}>
        <Dropdown
          label="Items on page"
          options={itemsPerPageOptions}
          isOpen={isItemDropdownOpen}
          onClick={() =>
            dispatch({
              type: 'SET_IS_ITEM_DROPDOWN_OPEN',
              payload: !isItemDropdownOpen,
            })
          }
          onBlur={() =>
            dispatch({ type: 'SET_IS_ITEM_DROPDOWN_OPEN', payload: false })
          }
          currentValue={itemsPerPage}
          onOptionSelect={handleDropdownChange}
          getSelectedLabel={getSelectedLabel}
          getOptionStyles={getOptionStyles}
        />
      </div>
    </div>
  );
};
