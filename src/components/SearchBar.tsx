import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState, getAllPhones, search } from '../store';

type Props = {
  searchPhones: (inputData: string) => void;
};

const SearchBar: FC<Props> = ({ searchPhones }) => {
  const searchedData = (event: { target: { value: string } }) => {
    searchPhones(event.target.value);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search in phones..."
        className="searchbar__input"
        onChange={searchedData}
      />
      <img
        src="img/icons/search.svg"
        alt="search icon"
        className="searchbar__icon"
      />
    </div>
  );
};

const mapState = (state: RootState) => ({
  phones: getAllPhones(state),
});

const mapDispatch = {
  searchPhones: search,
};

export default connect(mapState, mapDispatch)(SearchBar);
