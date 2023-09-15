import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PerPage } from '../../helpers/enums';
import { getSearchWith } from '../../helpers/searchHelper';
import { DropdownSelect } from '../Dropdown/DropdownSelect';

export const ItemsOnPageSelect: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '8';

  const handleItemsPerPage = (value: string) => {
    const paramsToUpdate = {
      perPage: !value ? null : value,
      page: '1',
    };

    setSearchParams(getSearchWith(searchParams, paramsToUpdate));
  };

  return (
    <DropdownSelect
      title="Items on page"
      selectedValue={perPage}
      defaultOption="8"
      options={Object.entries(PerPage)}
      onSelect={handleItemsPerPage}
    />
  );
};
