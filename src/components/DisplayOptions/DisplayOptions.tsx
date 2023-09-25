import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Select, {
  components,
  DropdownIndicatorProps,
  MultiValue,
} from 'react-select';

import {
  ReactComponent as ArrowDown,
} from '../../images/icons/arrow_down.svg';
import { getSearchWith } from '../../helpers/searchHelper';
import { defaultSearchParams } from '../../data/defaultSearchParams';

type Option = {
  value: string;
  label: string;
};

const COUNT_OPTIONS: Option[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const DEFAULT_COUNT_OPTION = COUNT_OPTIONS[1];

const SORT_OPTIONS: Option[] = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const DEFAULT_SORT_OPTIONS = SORT_OPTIONS[0];

const DropdownIndicator = (
  props: DropdownIndicatorProps<{ value: string, label: string }, true>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDown />
    </components.DropdownIndicator>
  );
};

export const DisplayOptions: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortSelectChange = (option: MultiValue<Option>) => {
    const currentValue: string = Object(option).value || '';

    const newSort = getSearchWith(searchParams, {
      sort: currentValue || null,
    });

    setSearchParams(newSort);
  };

  const handleLimitSelectChange = (option: MultiValue<Option>) => {
    const currentValue: string = Object(option).value || '';

    const newSort = getSearchWith(searchParams, {
      limit: currentValue || null,
      page: null,
    });

    setSearchParams(newSort);
  };

  const sort = searchParams.get('sort') || defaultSearchParams.sort;
  const limit = searchParams.get('limit') || defaultSearchParams.limit;

  function getDefaultValue(
    value: string, options: Option[], defaultValue: Option,
  ): Option {
    return options.find(option => option.value === value) || defaultValue;
  }

  const defaultSort = getDefaultValue(
    sort, SORT_OPTIONS, DEFAULT_SORT_OPTIONS,
  );

  const defaultLimit = getDefaultValue(
    limit, COUNT_OPTIONS, DEFAULT_COUNT_OPTION,
  );

  return (
    <div className="display-options">
      <div className="display-options__sort">
        <p className="display-options__title">
          Sort by
        </p>
        <Select
          components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          defaultValue={defaultSort}
          options={SORT_OPTIONS}
          className="display-options__react-select"
          classNamePrefix="select"
          onChange={handleSortSelectChange}
        />
      </div>
      <div className="display-options__count">
        <p className="display-options__title">
          Items on page
        </p>
        <Select
          components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          defaultValue={defaultLimit}
          options={COUNT_OPTIONS}
          className="display-options__react-select"
          classNamePrefix="select"
          onChange={handleLimitSelectChange}
        />
      </div>
    </div>
  );
};
