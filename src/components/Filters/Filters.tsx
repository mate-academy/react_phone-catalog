import React, { FC } from 'react';
import { connect } from 'react-redux';
import './_Filters.scss';
import { setSortBy, setPagination } from '../../store/actionCreators';

interface Props {
  setSortBy: (value: string) => void;
  setPagination: (value: number) => void;
}

export const FiltersTemplate: FC<Props> = (props) => {
  const {
    setSortBy: setSortByTemplate,
    setPagination: setPaginationTemplate,
  } = props;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSortByTemplate(value);
  };

  const handlePagination = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setPaginationTemplate(+value);
  };

  return (
    <div className="filters">
      <div className="filters__box">
        <span className="filters__type-filter">Sort by</span>
        <select
          className="filters__filter"
          onChange={handleSelect}
          defaultValue="disabled"
        >
          <option value="disabled" disabled>Sort by</option>
          <option value="year">Year</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div className="filters__box">
        <span className="filters__type-filter">Items on page</span>
        <select
          className="filters__filter"
          onChange={handlePagination}
          defaultValue="disabled"
        >
          <option value="disabled" disabled>Choose quantity</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </select>
      </div>

    </div>
  );
};

const mapDispatchToProps = {
  setSortBy, setPagination,
};

export const Filters = connect(null, mapDispatchToProps)(FiltersTemplate);
