import React, { FC, useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { PhonesCatalog } from './PhonesCatalog';

interface Props {
  phones: Phone[];
}

export const PhonesPageTemplate: FC<Props> = ({ phones }) => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('age');

  const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className="phones">
      <h2 className="phones__header">Mobile phones</h2>
      <p className="phones__quantity">
        {phones.length}
        {' '}
         models
      </p>
      <div className="settings">
        <input
          type="text"
          value={filter}
          onChange={handleFilter}
          className="settings__search"
          placeholder="Search..."
        />
        <select
          defaultValue="disabled"
          onChange={(e) => handleSelect(e)}
          className="settings__select"
        >
          <option value="disabled" disabled>Sort by</option>
          <option value="age">Date</option>
          <option value="name">Name</option>
        </select>
      </div>
      <PhonesCatalog filter={filter} sort={sort} />
    </div>
  );
};

const mapStateToProps = (
  state: {
    catalogReducer: CatalogState;
  },
) => ({
  phones: state.catalogReducer.phones,
});

export const PhonesPage = connect(
  mapStateToProps,
  null,
)(PhonesPageTemplate);
