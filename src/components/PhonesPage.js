import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import { getPhones } from '../api/getPhones';
import SearchPanel from './SearchPanel';

export default class PhonesPage extends Component {
  state = {
    phones: [],
    copyPhones: [],
  }

  async componentDidMount() {
    const data = await getPhones();

    this.setState({ phones: data, copyPhones: data });
  }

  handleSearchChange = (event) => {
    const { value } = event.target;
    const searchedValue = value.toLowerCase().trim();

    this.setState(state => ({
      phones: [...state.copyPhones].filter(phone => (
        [phone.snippet, phone.name]
          .join('')
          .toLowerCase()
          .includes(searchedValue)
      )),
    }));
  }

  handleSortChange = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'Alphabetical':
        return this.setState(state => ({
          phones: [...state.phones]
            .sort((a, b) => (a.name).localeCompare(b.name)),
        }));

      case 'Newest':
        return this.setState(state => ({
          phones: [...state.phones]
            .sort((a, b) => a.age - b.age),
        }));

      default:
        return this.setState(state => ({
          phones: state.copyPhones,
        }));
    }
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
            <h2>Phones Page</h2>
            <ul className="phones-list">
              {phones.map(phone => (
                <li key={phone.id} className="phones-item">
                  <section className="phones-item-info">
                    <Link to={`/phones/${phone.id}`}>
                      <img
                        style={{ height: '100%' }}
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
                        <button className="add-btn" type="button">
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
