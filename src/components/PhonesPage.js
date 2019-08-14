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
    perPage: 20,
    page: 1,
  };

  async componentDidMount() {
    const data = await getPhones();

    const searchParams = new URLSearchParams(this.props.location.search);

    const urlSearch = searchParams.get('query') || '';
    const urlSort = searchParams.get('sort') || '';

    this.setState({
      phones: data,
      searchValue: urlSearch,
      sortType: urlSort,
    });
  }

  componentDidUpdate() {
    const searchParams = new URLSearchParams();
    const { searchValue, sortType } = this.state;

    if (searchValue !== '' || sortType !== '') {
      searchParams.append('query', searchValue.toString());
      searchParams.append('sort', sortType.toString());

      this.props.history.push({
        pathname: '/phones/',
        search: `?${searchParams.toString()}`,
      });
    }
  }

  setSearchValue = (event) => {
    const searchValue = event.target.value.toLowerCase().trim();

    this.setState({
      searchValue,
      page: 1,
    });
  };

  setSortType = (event) => {
    const { value } = event.target;

    this.setState(state => ({
      sortType: value,
      phones: this.sortBy(state.phones, value),
      page: 1,
    }));
  };

  handleSearch = (phones, searchValue) => phones.filter(phone => (
    [phone.snippet, phone.name]
      .join('')
      .toLowerCase()
      .includes(searchValue)));

  sortBy = (phones, type) => {
    switch (type) {
      case 'alphabet':
        return [...phones].sort((a, b) => a.name.localeCompare(b.name));

      case 'age':
        return [...phones].sort((a, b) => a.age - b.age);

      default:
        return phones;
    }
  };

  togglePagination = (btnId, perPage) => this.setState({ page: btnId, perPage })

  render() {
    const {
      phones, searchValue, sortType, page, perPage,
    } = this.state;
    const { handleSearch, sortBy } = this;

    const firstIndex = page * perPage - perPage;
    const lastIndex = page * perPage;

    const preparedPhones = sortBy(handleSearch(phones, searchValue), sortType);

    const phonesPerPage = preparedPhones.slice(firstIndex, lastIndex);

    return (
      <>
        {this.props.initialPhones.length === 0 ? (
          <Loader />
        ) : (
          <>
            <SearchPanel
              getSearchValue={this.setSearchValue}
              getSortType={this.setSortType}
            />
            <h2>
              Phones Page ({firstIndex + 1}-
              {lastIndex > preparedPhones.length
                ? `${preparedPhones.length}`
                : `${lastIndex}`}
              {' of '}
              {preparedPhones.length})
            </h2>
            <Pagination
              page={page}
              perPage={perPage}
              total={preparedPhones.length}
              togglePagination={this.togglePagination}
            />

            <ul className="phones-list">
              {phonesPerPage.map(phone => (
                <li key={phone.id} className="phones-item">
                  <PhoneItem
                    phone={phone}
                    handleAddToCart={this.props.handleAddToCart}
                  />
                </li>
              ))}
            </ul>
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
