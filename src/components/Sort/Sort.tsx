import React from 'react';
import { SortType } from '../../utils/sortProducts';
import '../../styles/style.scss';
import Select from 'react-select';

type OptionType = {
  value: SortType;
  label: string;
};

const optionsby: OptionType[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const optionsPerPage = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'all' },
];

type Props = {
  sort: SortType;
  handleSortChange: (value: SortType) => void;
  itemsPerPage: number | 'all';
  handlePerPageChange: (value: string) => void;
};

export const Sort: React.FC<Props> = ({
  sort,
  handleSortChange,
  itemsPerPage,
  handlePerPageChange,
}) => {
  return (
    <div className="sort__filters">
      <div className="sort__filters__leftcontainer">
        <div className="sort__filters__container--text">Sort by</div>
        <div className="sort__by">
          <Select
            className="custom-select"
            classNamePrefix="custom-select"
            options={optionsby}
            isSearchable={false}
            value={optionsby.find(option => option.value === sort)}
            onChange={option => {
              if (option) {
                handleSortChange(option.value);
              }
            }}
          />
        </div>
        <div className="sort__filters__container--sort"></div>
      </div>
      <div className="sort__filters__rightcontainer">
        <div className="form-group row">
          <div className="sort__filters__container--text">Items on page</div>
          <div className="sort__by">
            <Select
              className="custom-select"
              classNamePrefix="custom-select"
              options={optionsPerPage}
              isSearchable={false}
              value={optionsPerPage.find(
                option => option.value === String(itemsPerPage),
              )}
              onChange={option => {
                if (option) {
                  handlePerPageChange(option.value);
                }
              }}
            />
          </div>
        </div>

        <div className="sort__filters__container--filter"></div>
      </div>
    </div>
  );
};
