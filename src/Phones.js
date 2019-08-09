import React from 'react';
import { Link } from 'react-router-dom';

import Loader from './Loader';
import Pagination from './Pagination';
import './styles/phones.css';


const imageFromUrl = 'https://mate-academy.github.io/phone-catalogue-static';

class Phones extends React.Component {
  state = {
    page: 0,
    perPage: 4,
    phones: [],
    isLoaded: false,
    inputedValue: '',
  }

  componentDidMount() {
    fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json')
      .then(response => response.json())
      .then(phones => {
        this.setState({
          phones,
          isLoaded: true,
        })
      })
  };

  handlePageChange = (currentPage) => {
    this.setState({
      page: currentPage,
      })
    };

  handleInput = ({target: {value}}) => {
     this.setState({
      inputedValue: value.toLowerCase(),
      page: 0,
    });
  };

  getFilteredPhones = (inputedValue) => {
    const { phones } = this.state;
      return phones.filter(
        phone => (
          (phone.name + phone.id + phone.snippet)
            .toLowerCase()
            .includes(inputedValue.trim())
        ),
      );
  };

  getSortedPhones = ({target: {value}}) => {
    switch (value) {
      case 'age':
        return this.setState(prevState => ({
          phones: [...prevState.phones]
            .sort((a, b) => a.age - b.age),
        }));
      case 'alphabet':
        return this.setState(prevState => ({
          phones: [...prevState.phones]
            .sort((a, b) => a.name.localeCompare(b.name)),
          }));
          default:
            return this.setState(prevState => ({
              phones: prevState.phones,
            }));
    }
  };

  render() {
    const {inputedValue, page, perPage} = this.state;
    const {handleClick} = this.props;
    const filteredPhones = this.getFilteredPhones(inputedValue);
    const firstPosition = page * perPage;
    const lastPosition = page * perPage + perPage;
    return (
      <div>
        {this.state.isLoaded ?
        <div>
          <label htmlFor="filter-input">
            <input
              type="text"
              className="filter__input"
              value={inputedValue}
              onChange={this.handleInput}
              placeholder="Search:"
            />
          </label>
          <label htmlFor="sort-field">
            <select
              className="filter__selector"
              onChange={this.getSortedPhones}
            >
              <option value="" style={{display: 'none'}}>
                Sort by:
              </option>
              <option value="age">
               Newest
              </option>
              <option value="alphabet">
                Alphabetical
              </option>
            </select>
          </label>
          <div className="phones_list">
            {filteredPhones.slice(firstPosition, lastPosition).map(phone => (
              <div  key={phone.id}>
                <ul>
                  <li className="details_list">
                  <Link
                    to={`/phones/${phone.id}`}
                    className="phone_names"
                    >
                    <img
                      src={`${imageFromUrl}/${phone.imageUrl}`}
                      className="img_preview"
                      alt={`${phone.name}`}
                    />
                  </Link>
                  </li>
                  <li className="details_list">
                    <Link
                      to={`/phones/${phone.id}`}
                      className="phone_names"
                    >
                      {phone.name}
                    </Link>
                  </li>
                  <li className="details_list">
                    {phone.snippet}
                  </li>
                </ul>
                  <div>
                    <button
                    onClick={() => handleClick(phone)}
                    className="add-to-basket_button"
                    >
                      Add to Basket
                    </button>
                  </div>
              </div>

            ))}
          </div>
          <Pagination
            page={page}
            perPage={perPage}
            total={filteredPhones.length}
            handlePageChange={this.handlePageChange}
          />
        </div>
        : <Loader />}
      </div>
    )
  };
}
export default Phones;
