import React from 'react';
import {
  Link,
} from 'react-router-dom';

class PhoneCatalog extends React.Component {
  state = {
    phones: [],
    phonesForShowing: [],
  }

  componentDidMount = () => {
    this.setState({
      phones: this.props.phones,
      phonesForShowing: this.props.phones,
    });
  };

  handleInput = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      phonesForShowing: [...prevState.phones]
        .filter(phone => phone.id.toLowerCase().includes(value.toLowerCase())),
    }));
  };

  sortFunc = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      phonesForShowing: [...prevState.phonesForShowing].sort((a, b) => {
        const valueA = a[value];
        const valueB = b[value];

        switch (typeof valueA) {
          case 'string':
            return valueA.localeCompare(valueB);
          case 'number':
            return valueA - valueB;
          default:
            return 0;
        }
      }),
    }));
  };

  render() {
    const { phonesForShowing } = this.state;
    const BASE_IMAGE_URL
      = 'https://mate-academy.github.io/phone-catalogue-static';

    return (
      <div className="phoneCatalog">
        <label
          className="searchField"
          htmlFor="search_field"
        >
          Search:
          <input
            onChange={this.handleInput}
            className="searchField__input"
            id="search_field"
            type="text"
          />
        </label>

        <label
          className="sortField"
          htmlFor="sort_select"
        >
          Sort by:
          <select
            onChange={this.sortFunc}
            className="sortField-select"
            id="sort_select"
          >
            <option selected value="age">Newest</option>
            <option value="name">Alphabetical</option>
          </select>
        </label>

        <ul className="listOfPhones">
          {
            phonesForShowing.map(phone => (
              <li className="listOfPhones__item">
                <img
                  className="listOfPhones__item-img"
                  src={`${BASE_IMAGE_URL}/${phone.imageUrl}`}
                  alt="altImg"
                />

                <Link
                  className="listOfPhones__item-link"
                  to={`/phones/${phone.id}`}
                >
                  {phone.name}
                </Link>

                <section className="listOfPhones__item-snippet">
                  {phone.snippet}
                </section>

                <button
                  onClick={() => this.props.addItemToBasket(phone)}
                >
                  Add to cart
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default PhoneCatalog;
