import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState, getAllPhones, search } from '../store';
import { Phones } from '../interfaces/interfaces';

type Props = {
  phones: Phones[];
  searchPhones: (phones: Phones[]) => void;
};

const SearchBar: FC<Props> = ({ phones, searchPhones }) => {
  const phonesSearch = (e: { target: { value: string } }) => {
    const value = e.target.value.toLowerCase();
    const filtered = phones.filter(phone => phone.name.toLowerCase().includes(value));

    console.log(filtered);

    return searchPhones(phones);
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search in phones..."
        className="searchbar__input"
        onChange={phonesSearch}
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
