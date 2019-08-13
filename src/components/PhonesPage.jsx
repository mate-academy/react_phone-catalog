import React from 'react';
import { Link } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { getPhones } from '../api/getData';
import sortPhones from '../utils';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    sortedPhones: [],
    searchText: '',
    isLoading: true,
  }

  async componentDidMount() {
    const phonesFromApi = await getPhones();

    this.setState({
      phones: [...phonesFromApi],
      sortedPhones: [...phonesFromApi],
      isLoading: false,
    });
  }

  handleSetSearchText = (event) => {
    const { value } = event.target;

    this.setState({
      searchText: value,
    });
  };

  getPhonesByFilter = (phones, searchText) => {
    const filteringPhones = [...phones].filter(phone => (
      (phone.id.includes(searchText) || phone.snippet.includes(searchText))
    ));

    return filteringPhones;
  };

  handleSort = (event) => {
    const { value } = event.target;

    if (value === 'alphabetial') {
      this.setState(prevState => ({
        phones: prevState.phones.sort(sortPhones),
      }));
    }

    if (value === 'newest') {
      this.setState(prevState => ({
        phones: prevState.sortedPhones,
      }));
    }
  };

  render() {
    const { isLoading, phones, searchText } = this.state;
    const shownPhones = this.getPhonesByFilter(phones, searchText);

    return (
      <div className="PhonesPage">

        <div className="PhonesPage__sorting">

          <div className="search">
            <span>Search:</span>
            <input
              className="search__fieled"
              type="search"
              placeholder="Tap for searching"
              onChange={this.handleSetSearchText}
            />
          </div>

          <div>
            <span>Sort by:</span>
            <select onChange={this.handleSort}>
              <option value="newest">Newest</option>
              <option value="alphabetial">Alphabetial</option>
            </select>
          </div>

        </div>

        {isLoading && (
          <Loader
            type="Oval"
            color="rgb(22, 105, 105)"
            height="50"
            width="50"
            className="loader"
          />
        )}

        <ul className="catalog">
          {shownPhones.map(phone => (
            <li key={phone.id}>
              <div className="phone">

                <Link to={`/phones/${phone.id}`}>
                  <div>
                    <img
                      className="phone__img"
                      src={phone.imageUrl}
                      alt="Phone"
                    />
                  </div>
                </Link>

                <div>
                  <Link
                    to={`/phones/${phone.id}`}
                    className="phone__description"
                  >
                    {phone.name}
                  </Link>
                  <p>{phone.snippet}</p>
                </div>

                <button
                  type="button"
                  className="addPhone styleAddToBasket"
                  onClick={() => this.props.handleAddToBasket(phone)}
                >
                  Add to basket
                </button>

              </div>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default PhonesPage;
