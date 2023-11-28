import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../helpers/enums';
import { getSearchWith } from '../../helpers/searchHelpers';
import { DropdownSelect } from '../Dropdown/Dropdown';

export const SortBySelect: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';

  const isSortBy = (value: string) => {
    return Object.values<string>(SortBy).includes(value);
  };

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
