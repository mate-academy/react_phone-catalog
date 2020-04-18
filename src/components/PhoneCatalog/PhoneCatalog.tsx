import React, { FC, useMemo, useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import {
  loadPhones as loadPhonesStore,
  setSortBy as setSortByStore,
} from '../../store/store';

import './PhoneCatalog.css';

const PhoneCardLazy = React.lazy(() => import('../PhoneCard/PhoneCard')
  .then(({ PhoneCard }) => ({ default: PhoneCard })));

interface StateProps {
  phones: PhonesWithDetails[];
  sortBy: string;
}

interface DispatchProps {
  loadPhones: () => void;
  setSortBy: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PhoneCatalogTemplate: FC<StateProps & DispatchProps> = ({
  phones, sortBy, loadPhones, setSortBy,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const sortedPhoneList = useMemo(() => {
    switch (sortBy) {
      case 'Name':
        return [...phones].sort((a, b) => a.name.localeCompare(b.name));

      case 'Price':
        return [...phones].sort((a, b) => a.priceDiscount - b.priceDiscount);

      case 'RAM':
        return [...phones].sort((a, b) => {
          const firstNum = Number(a.ram.replace(/\D+/, ''));
          const secondNum = Number(b.ram.replace(/\D+/, ''));

          return firstNum - secondNum;
        }).reverse();

      case 'Capacity':
        return [...phones].sort((a, b) => {
          const firstNum = Number(a.capacity.replace(/\D+/, ''));
          const secondNum = Number(b.capacity.replace(/\D+/, ''));

          return firstNum - secondNum;
        }).reverse();

      default:
        return phones;
    }
  }, [sortBy, phones]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);
  };

  const filteredPhoneList = useMemo(() => {
    const filterValue = query.toLowerCase();

    return sortedPhoneList.filter(phone => (
      phone.name.toLowerCase().includes(filterValue)
    ));
  }, [query, sortedPhoneList]);

  const phoneList = useMemo(() => {
    if (filteredPhoneList.length || query) {
      return filteredPhoneList;
    }

    return sortedPhoneList;
  }, [query, filteredPhoneList, sortedPhoneList]);

  return (
    <div className="phones__container">
      <div className="phones__path">
        <img src="./img/Home.png" alt="home_icon" className="home-icon" />
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">Phones</span>
      </div>
      <h2 className="phones__heding">Mobile phones</h2>
      <p className="phones__quantity">{`${phones.length} models`}</p>
      <div className="action-container">
        <p className="phones__action-title">Sort by</p>
        <select
          className="phones__sort-select"
          value={sortBy}
          onChange={setSortBy}
        >
          <option className="select-option" value="Name">Name</option>
          <option className="select-option" value="Price">Price</option>
          <option className="select-option" value="RAM">RAM</option>
          <option className="select-option" value="Capacity">Capacity</option>
        </select>
      </div>
      <div className="action-container">
        <p className="phones__action-title">Search</p>
        <label className="phones__search-label">
          <input
            type="text"
            value={query}
            className="phones__search-input"
            onChange={handleChange}
          />
        </label>
      </div>
      <Suspense fallback={(
        <div className="loader__container">
          <Loader
            type="TailSpin"
            color="#000000"
            height={100}
            width={100}
          />
        </div>
      )}
      >
        <div className="phones__catalog">
          {phoneList.map(phone => (
            <PhoneCardLazy key={phone.id} phone={phone} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phones: state.phones,
  sortBy: state.sortBy,
});

const mapDispatchToProps = {
  loadPhones: loadPhonesStore,
  setSortBy: setSortByStore,
};

export const PhoneCatalog = connect<StateProps, DispatchProps, {}, State>(
  mapStateToProps, mapDispatchToProps,
)(PhoneCatalogTemplate);
