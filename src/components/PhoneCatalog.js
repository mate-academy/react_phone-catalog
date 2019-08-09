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
        <div className="catalog__sort-filter-container">
          <input
            name="filterValue"
            value={filterValue}
            onChange={this.handleFilter}
            className="catalog__filter"
            placeholder="Filter phones by names"
          />

          <select
            name="sortValue"
            value={sortValue}
            onChange={this.handleFilter}
            className="catalog__sort-select"
          >
            <option value="abc">Alphabet</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <ul className="phone__card-list">
          {sortedAndFilteredPhones.map(phone => (
            <li key={phone.id} className="phone__card-item">
              <div>
                <div>
                  <img src={phone.imageUrl} alt="phone" width="100" />
                </div>

                <h4 className="phone__card-header">
                  <Link to={`/phones/${phone.id}`}>
                    {phone.name}
                  </Link>
                </h4>

                <p>{phone.snippet}</p>
              </div>

              <button
                name={phone.id}
                type="button"
                className={
                  basketPhones.some(bp => bp.id === phone.id)
                    ? 'button button--added'
                    : 'button'
                }

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
                {
                  basketPhones.some(bp => bp.id === phone.id)
                    ? `Phone in Basket ${
                      basketPhones.find(bp => bp.id === phone.id).quantity
                    }`
                    : 'Add to Basket'
                }
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
