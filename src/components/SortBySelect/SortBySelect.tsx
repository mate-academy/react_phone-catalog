import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../helpers/enums';
import { isSortBy } from '../../helpers/pagesMethods';
import { getSearchWith } from '../../helpers/searchHelper';
import { DropdownSelect } from '../Dropdown/DropdownSelect';

export const SortBySelect: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';

  const handleSortBy = (value: string) => {
    if (isSortBy(value)) {
      const paramsToUpdate = { sort: !value ? null : value };

      setSearchParams(getSearchWith(searchParams, paramsToUpdate));
    }
  };

  return (
    <DropdownSelect
      title="Sort by"
      selectedValue={sort}
      options={Object.entries(SortBy)}
      onSelect={handleSortBy}
      defaultOption="Newest"
    />
  );
};
