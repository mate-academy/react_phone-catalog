/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import { getPhones } from '../api/getPhones';
import SearchPanel from './SearchPanel';
import Pagination from './Pagination';
import PhoneItem from './PhoneItem';

export default class PhonesPage extends PureComponent {
  state = {
    phones: [],
    copyPhones: [],
    lastPhone: '',
    firstPhone: '',
  };

  async componentDidMount() {
    const data = await getPhones();

    this.setState({ phones: data, copyPhones: data });
  }

  handleSearchChange = (event) => {
    const searchedValue = event;

    this.setState(state => ({
      phones: state.copyPhones.filter(phone => [phone.snippet, phone.name]
        .join('')
        .toLowerCase()
        .includes(searchedValue)),
    }));
  };

  handleSortChange = (event) => {
    switch (event) {
      case 'alphabet':
        return this.setState(state => ({
          phones: state.phones.sort((a, b) => a.name.localeCompare(b.name)),
          copyPhones: state.copyPhones.sort(
            (a, b) => a.name.localeCompare(b.name)
          ),
        }));

      case 'age':
        return this.setState(state => ({
          phones: state.phones.sort((a, b) => a.age - b.age),
          copyPhones: state.copyPhones.sort(
            (a, b) => a.age - b.age
          ),
        }));

      default:
        return this.setState(state => ({
          phones: state.phones,
          copyPhones: state.copyPhones,
        }));
    }
  };

  togglePagination = (btnId, perPage) => {
    const firstIndex = btnId * perPage - perPage;
    const lastIndex = btnId * perPage;

    this.setState(state => ({
      lastPhone: lastIndex,
      firstPhone: firstIndex + 1,
      phones: [...state.copyPhones].slice(firstIndex, lastIndex),
    }));
  };

  perPagePhoneCounter = () => {
    const { firstPhone, lastPhone, copyPhones } = this.state;

    return (
      <span>
        {firstPhone}
        {firstPhone
          ? '-'
          : `${[...copyPhones].length} `}
        {lastPhone
        > `${[...copyPhones].length}`
          ? `${[...copyPhones].length} `
          : `${lastPhone} `}
        of
        {` ${copyPhones.length}`}
      </span>
    );
  }

  render() {
    const { phones, copyPhones } = this.state;

    return (
      <>
        {copyPhones.length < 1 ? (
          <Loader />
        ) : (
          <>
            <SearchPanel
              handleSearchChange={this.handleSearchChange}
              handleSortChange={this.handleSortChange}
            />
            <h2>Phones Page({this.perPagePhoneCounter()})</h2>
            <Pagination
              phones={phones}
              togglePagination={this.togglePagination}
            />
            <PhoneItem
              phones={phones}
              handleAddToCart={this.props.handleAddToCart}
            />
          </>
        )}
      </>
    );
  }
}

PhonesPage.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
};
