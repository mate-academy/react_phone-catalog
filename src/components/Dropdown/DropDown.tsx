import { memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { setActiveDropdown } from '../../features/dropdown/dropdownSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ParamValue } from '../../hooks/useSearchParamValue';

import { DropDownItemsPerPage } from '../../types/DropDownItemsPerPage';
import {
  DropDownSort,
  SortOption,
  SortKey,
  getSortOptionFromKey,
  getSortKeyFromOption,
} from '../../types/DropDownSortOptions';

import styles from './DropDown.module.scss';
const {
  dropdown,
  dropdown__sort,
  dropdown__description,
  dropdown__list,
  dropdown__options,
  dropdown__optionsOpen,
  dropdown__optionsClosed,
  dropdown__option,
  dropdown__activeOption,
  dropdown__arrowBlock,
  dropdown__arrow,
  dropdown__arrowIsOpen,
} = styles;

type Props = {
  dropdownConfig: DropDownSort | DropDownItemsPerPage;
  value: ParamValue;
  onChange: (newValue: ParamValue) => void;
};

export const DropDown = memo(
  ({ dropdownConfig, value: currentValue, onChange }: Props) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();


    const { name, urlSearchName, values } = dropdownConfig;

    const { activeDropdown } = useAppSelector((state) => state.dropdown);

    const handleDropDownClick = useCallback(() => {
      dispatch(
        setActiveDropdown(
          activeDropdown === urlSearchName ? null : urlSearchName,
        ),
      );
    }, [dispatch, activeDropdown, urlSearchName]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          activeDropdown === urlSearchName
        ) {
          dispatch(setActiveDropdown(null));
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dispatch, activeDropdown, urlSearchName]);

    const isOpen = useMemo(
      () => activeDropdown === urlSearchName,
      [activeDropdown, urlSearchName],
    );

    const options = useMemo(
      () =>
        values.map((value) => {
          const isSort = urlSearchName === 'sort';
          const currentSortValue = isSort
            ? typeof currentValue === 'string'
              ? getSortOptionFromKey(currentValue as SortKey)
              : currentValue
            : currentValue;

          return (
            <div
              key={value}
              className={`${dropdown__option} ${
                value === currentSortValue && dropdown__activeOption
              }`}
              onClick={() => {
                onChange(
                  isSort
                    ? getSortKeyFromOption(value as SortOption) || value
                    : value,
                );
                dispatch(setActiveDropdown(null));
              }}
            >
              {value}
            </div>
          );
        }),
      [values, onChange, currentValue, urlSearchName],
    );

    return (
      <div
        ref={dropdownRef}
        className={`${dropdown} ${dropdownConfig.urlSearchName === 'sort' ? dropdown__sort : ''}`}
      >
        <label className={dropdown__description}>{name}</label>

        <div className={dropdown__list} onClick={handleDropDownClick}>
          {urlSearchName === 'sort'
            ? typeof currentValue === 'string'
              ? getSortOptionFromKey(currentValue as SortKey)
              : currentValue
            : currentValue}

          <div className={dropdown__arrowBlock}>
            <div
              className={`${dropdown__arrow} ${isOpen && dropdown__arrowIsOpen}`}
            />
          </div>
        </div>

        <div
          className={`${dropdown__options} ${isOpen ? dropdown__optionsOpen : dropdown__optionsClosed}`}
        >
          {options}
        </div>
      </div>
    );
  },
);

DropDown.displayName = 'DropDown';
