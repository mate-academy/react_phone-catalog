/* eslint-disable jsx-a11y/control-has-associated-label */
import { FILTER_OPTIONS } from '../../constants/filterValues';
import { SORT_OPTIONS } from '../../constants/sortValues';
import { SortType, FilterType } from '../../types';
import { DropDown } from '../DropDown';
import './PageFilter.scss';

type Props = {
  setSortValue: (value: SortType) => void;
  setFilterValue: (value: FilterType) => void;
  sortBy: SortType,
  filterBy: FilterType
};

export const PageFilter: React.FC<Props> = ({
  setSortValue,
  setFilterValue,
  filterBy,
  sortBy,
}) => {
  return (
    <div className="page-filter">
      <DropDown
        label="Sort by"
        value={sortBy}
        options={SORT_OPTIONS}
        setValue={setSortValue}
        width={176}
      />

      <DropDown
        label="Items on page"
        value={filterBy}
        options={FILTER_OPTIONS}
        setValue={setFilterValue}
        width={128}
      />
    </div>
  );
};
