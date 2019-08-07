import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';

import Loader from './Loader';
import { getPhones } from '../api/getPhones';
import SearchPanel from './SearchPanel';
import Pagination from './Pagination';

export default class PhonesPage extends Component {
  parsed = queryString.parse(this.props.location.search);

  state = {
    phones: [],
    copyPhones: [],
    // perPage: 0,
    lastPhone: '',
    firstPhone: '',

  }

  async componentDidMount() {
    const data = await getPhones();

    this.setState({ phones: data, copyPhones: data });

    // const pagesNum = Math.ceil(data.length / this.state.perPage)
    // this.handleSearchChange(this.parsed.query);
    // this.handleSortChange(this.parsed.sort);
  }

  handleSearchChange = (event) => {
    this.parsed.query = event;
    const searchedValue = event;

    this.setState(state => ({
      phones: state.copyPhones.filter(phone => [phone.snippet, phone.name]
        .join('')
        .toLowerCase()
        .includes(searchedValue)),

      // copyPhones: state.phones.filter(phone => [phone.snippet, phone.name]
      //   .join('')
      //   .toLowerCase()
      //   .includes(searchedValue)),
    }));
  }

  handleSortChange = (event) => {
    this.parsed.sort = event;

    switch (event) {
      case 'alphabet':
        return this.setState(state => ({
          phones: state.phones.sort((a, b) => a.name.localeCompare(b.name)),
          copyPhones: state.copyPhones
            .sort((a, b) => a.name.localeCompare(b.name)),
        }));

      case 'age':
        return this.setState(state => ({
          phones: state.phones.sort((a, b) => a.age - b.age),
          copyPhones: state.copyPhones.sort((a, b) => a.age - b.age),
        }));

      default:
        return this.setState(state => ({
          phones: state.phones,
          copyPhones: state.copyPhones,
        }));
    }
  }

  handleAddtoCart = () => {
  }

  togglePagination = (btnId, perPage) => {
    const firstIndex = btnId * perPage - (perPage);
    const lastIndex = btnId * perPage;

    // const visiblePhones = this.state.copyPhones
    //   .slice(firstIndex - 1, lastIndex);
    // console.log(firstIndex);
    // console.log(lastIndex);

    this.setState(state => ({
      lastPhone: lastIndex,
      firstPhone: firstIndex + 1,
      // perPage,
      phones: [...state.copyPhones].slice(firstIndex, lastIndex),
      // copyPhones: state.copyPhones,
    }));
  }

  render() {
    // console.log(this.props.match);
    // console.log(this.props.location);
    // console.log(this.props.history);
    const { phones, copyPhones } = this.state;

    return (
      <>
        {copyPhones.length < 1 ? (
          <Loader />
        ) : (
          <>
            <Link
              to={`/phones/?query=${this.parsed.query}&sort=${
                this.parsed.sort
              }`}
            >
              <SearchPanel
                handleSearchChange={this.handleSearchChange}
                handleSortChange={this.handleSortChange}
                // match={this.props.match}
                location={this.props.location}
                // history={this.props.history}
              />
            </Link>

            <h2>
              Phones Page
              (
              {this.state.firstPhone}
              {this.state.firstPhone ? '-' : '20'}
              {this.state.lastPhone > 20 ? '20 ' : `${this.state.lastPhone} ` }
              из
              {` ${this.state.copyPhones.length}`}
              )
            </h2>

            <Pagination
              phones={phones}
              togglePagination={this.togglePagination}
            />

            <ul className="phones-list">
              {phones.map(phone => (
                <li key={phone.id} className="phones-item">
                  <section className="phones-item-info">
                    <Link to={`/phones/${phone.id}`}>
                      <img
                        className="phones-main-photo"
                        src={phone.imageUrl}
                        alt={phone.name}
                      />
                    </Link>

                    <div className="phones-item-text">
                      <h3>
                        <Link
                          className="phones-item-title"
                          to={`/phones/${phone.id}`}
                        >
                          {phone.name}
                        </Link>
                      </h3>
                      <p>{phone.snippet}</p>
                    </div>
                    <div className="phones-item-add-btn">
                      <Link to="/cart">
                        <button
                          onClick={this.handleAddtoCart}
                          className="add-btn"
                          type="button"
                        >
                          {'ADD TO CART'}
                        </button>
                      </Link>
                    </div>
                  </section>
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
  parsed: PropTypes.shape({
    query: PropTypes.string,
    sort: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
