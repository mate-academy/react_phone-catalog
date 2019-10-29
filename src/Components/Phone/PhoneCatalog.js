import React from 'react';
import PropTypes from 'prop-types';

// Components
import Loading from './Loading';
import PhonesPage from './PhonesPage';

class PhoneCatalog extends React.Component {
  state = {
    phoneArrays: [],
  }

  render() {
    const {
      IMAGE_URL, phones, handleFilter,
      handleSort, setItemToBasket, sortField,
    } = this.props;
    const { phoneArrays } = this.state;

    return (
      <div className="table">
        <div className="table__header">
          <form action="/" className="adress-delivery__header">
            <div className="search__container">
              <div className="search__button" />
              <div className="hidden">{sortField}</div>
              <input
                type="text"
                className="input"
                placeholder="search"
                onChange={handleFilter}
              />
            </div>
            <div
              className="destination-details"
            >
              <button
                type="button"
                onClick={handleSort}
                className="adress-delivery__destination-details"
              >
                sort By Alphabet
              </button>
            </div>
          </form>
          {phoneArrays}
        </div>
        {phones.length === 0
          ? <Loading />
          : (
            <div className="catalog">
              {phones.map(phone => (
                <PhonesPage
                  key={phone.id}
                  phone={phone}
                  IMAGE_URL={IMAGE_URL}
                  setItemToBasket={setItemToBasket}
                />
              ))}
            </div>
          )
        }
      </div>
    );
  }
}

PhoneCatalog.propTypes = {
  phones: PropTypes.shape().isRequired,
  IMAGE_URL: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  setItemToBasket: PropTypes.func.isRequired,
  sortField: PropTypes.string.isRequired,
};

export default PhoneCatalog;
