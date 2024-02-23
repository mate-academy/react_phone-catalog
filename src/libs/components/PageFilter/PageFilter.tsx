/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

import { FILTER_OPTIONS } from '../../constants/filterValues';
import { SORT_OPTIONS } from '../../constants/sortValues';
import { DropDown } from '../DropDown';
import { getSearchWith } from '../../utils/getSearchWith';

import './PageFilter.scss';
import { SearchParamsNames } from '../../constants/searchParamsNames';

type Props = {
  sortValue: string,
  filterValue: string,
};

export const PageFilter: React.FC<Props> = ({
  filterValue,
  sortValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSaveSearchParams
    = useCallback((paramName: string) => (value: string | null) => {
      const newParams = getSearchWith({
        [paramName]: value,
        [SearchParamsNames.page]: 1,
      }, searchParams);

      setSearchParams(newParams);
    }, [searchParams, setSearchParams]);

  return (
    <div className="page-filter">
      <DropDown
        label="Sort by"
        value={sortValue}
        options={SORT_OPTIONS}
        setValue={handleSaveSearchParams(SearchParamsNames.sort)}
        width={176}
      />

      <DropDown
        value={filterValue}
        label="Items on page"
        options={FILTER_OPTIONS}
        setValue={handleSaveSearchParams(SearchParamsNames.filter)}
        width={128}
      />
    </div>
  );
};
