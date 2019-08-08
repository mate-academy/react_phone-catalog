import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cashedFilteredPhones, cashedSorteredPhones } from '../helpers';

class PhoneCatalog extends React.Component {
  state={
    filterValue: '',
    sortValue: 'newest',
  };

  handleFilter = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { phones, chandgeBasketItems, basketPhones } = this.props;
    const { filterValue, sortValue } = this.state;

    const filterPhones = cashedFilteredPhones(phones, filterValue);

    const sortedAndFilteredPhones = cashedSorteredPhones(
      filterPhones, this.state.sortValue
    );

    return (
      <div>
        <input
          name="filterValue"
          value={filterValue}
          onChange={this.handleFilter}
        />

        <select
          name="sortValue"
          value={sortValue}
          onChange={this.handleFilter}
        >
          <option value="abc">Alphabet</option>
          <option value="newest">Newst</option>
        </select>

        <ul className="phone__card-list">
          {sortedAndFilteredPhones.map(phone => (
            <li key={phone.id} className="phone__card-item">
              <div>
                <div>
                  <img src={phone.imageUrl} alt="phone" width="100" />
                </div>

                <Link to={`/phones/${phone.id}`}>
                  <h4>{phone.name}</h4>
                </Link>

                <p>{phone.snippet}</p>
              </div>

              <button
                name={phone.id}
                type="button"
                className="button"

                onClick={() => {
                  if (basketPhones
                    .some(basketPhone => basketPhone.id === phone.id)) {
                    return chandgeBasketItems(basketPhones.map(basketPhone => (
                      basketPhone.id === phone.id
                        ? { ...basketPhone, quantity: basketPhone.quantity + 1 }
                        : basketPhone
                    )));
                  }

                  return chandgeBasketItems([
                    ...basketPhones,
                    {
                      id: phone.id,
                      quantity: 1,
                      name: phone.name,
                      imageUrl: phone.imageUrl,
                    },
                  ]);
                }}
              >
                Add to card
              </button>
            </li>

          ))}
        </ul>
      </div>
    );
  }
}

PhoneCatalog.propTypes = {
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  chandgeBasketItems: PropTypes.func.isRequired,
};

export default PhoneCatalog;
