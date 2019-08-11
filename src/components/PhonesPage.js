/* eslint-disable react/jsx-one-expression-per-line */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { getPhones } from '../api/getPhones';
import Loader from './Loader';
import SearchPanel from './SearchPanel';
import Pagination from './Pagination';
import PhoneItem from './PhoneItem';

export default class PhonesPage extends PureComponent {
  state = {
    phones: [],
    searchValue: '',
    sortType: '',
    lastPhone: '',
    firstPhone: '',
  };

  async componentDidMount() {
    const data = await getPhones();

    const searchParams = new URLSearchParams(this.props.location.search);

    const newSearch = searchParams.get('query') || '';
    const newSort = searchParams.get('sort') || '';

    this.setState({
      phones: data,
      searchValue: newSearch,
      sortType: newSort,
    });
  }

  componentDidUpdate() {
    const searchParams = new URLSearchParams();

    searchParams.append('query', this.state.searchValue.toString());
    searchParams.append('sort', this.state.sortType.toString());
    this.props.history.push({
      pathname: '/phones/',
      search: `?${searchParams.toString()}`,
    });
  }

  getSearchValue = (event) => {
    const searchValue = event.target.value.toLowerCase().trim();

    this.setState({ searchValue });
  };

  getSortType = (event) => {
    const { value } = event.target;

    this.setState({ sortType: value });
  };

  handleSearch = (phones, searchValue) => phones.filter(phone => (
    [phone.snippet, phone.name]
      .join('')
      .toLowerCase()
      .includes(searchValue)));

  sortBy = (phones, type) => {
    switch (type) {
      case 'alphabet':
        return phones.sort((a, b) => a.name.localeCompare(b.name));

      case 'age':
        return phones.sort((a, b) => a.age - b.age);

      default:
        return phones;
    }
  };

  togglePagination = (btnId, perPage) => {
    const firstIndex = btnId * perPage - perPage;
    const lastIndex = btnId * perPage;

    this.setState(state => ({
      lastPhone: lastIndex,
      firstPhone: firstIndex + 1,
      phones: [...this.sortBy(
        this.props.initialPhones, state.sortType
      )].slice(firstIndex, lastIndex),
    }));
  };

  perPagePhoneCounter = () => {
    const { firstPhone, lastPhone } = this.state;
    const total = this.props.initialPhones.length;

    return (
      <span>
        {firstPhone}
        {firstPhone ? '-' : `${total} `}
        {lastPhone > `${total}` ? `${total} ` : `${lastPhone} `}
        of
        {` ${total}`}
      </span>
    );
  }

  render() {
    const { phones, searchValue, sortType } = this.state;
    const { handleSearch, sortBy } = this;

    const preparedPhones = sortBy(
      handleSearch(phones, searchValue),
      sortType
    );

    return (
      <>
        {phones.length < 1 ? (
          <Loader />
        ) : (
          <>
            <SearchPanel
              getSearchValue={this.getSearchValue}
              getSortType={this.getSortType}
            />
            <h2>Phones Page({this.perPagePhoneCounter()})</h2>
            <Pagination
              total={this.props.initialPhones.length}
              togglePagination={this.togglePagination}
            />
            <PhoneItem
              phones={preparedPhones}
              handleAddToCart={this.props.handleAddToCart}
            />
          </>
        )}
      </>
    );
  }
}

PhonesPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  initialPhones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
