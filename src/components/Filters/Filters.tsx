import React, { FC } from 'react';
import { connect } from 'react-redux';
import './_Filters.scss';
import { setSortBy } from '../../store/actionCreators';

interface Props {
  setSortBy: (value: string) => void;
}

export const FiltersTemplate: FC<Props> = (props) => {
  const { setSortBy: setSortByTemplate } = props;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSortByTemplate(value);
  };

  return (
    <div className="filters">
      <span className="filters__type-filter">Sort by</span>
      <select
        className="filters__filter"
        onChange={handleSelect}
        defaultValue="disabled"
      >
        <option value="disabled" disabled>Sort by</option>
        <option value="age">Age</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

const mapDispatchToProps = { setSortBy };

export const Filters = connect(null, mapDispatchToProps)(FiltersTemplate);
