import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './phonecatalog.css';

const PhoneCatalog = ({ phones, match, history }) => {
  const { url } = match;

  const addToBasket = (id, name) => {
    if (localStorage.getItem('buy')) {
      localStorage.buy += `&${id}*1`;
    } else {
      localStorage.buy = `${id}*1`;
    }

    localStorage.setItem(id, name);

    history.replace(history.location);
  };

  return (
    <main className="phone-catalog">
      {
        localStorage.length !== 0 && (
          <div className="header__basket--count">
            {localStorage.length !== 0 && localStorage.length - 1}
          </div>
        )
      }

      {phones.map(phone => (
        <div className="phone-catalog__phone" key={phone.id}>
          <div className="phone-catalog__phone--img">
            <img src={`./${phone.imageUrl}`} alt="" />
          </div>

          <div className="phone-catalog__phone--info">
            <Link to={`${url}/${phone.id}`}>
              {phone.name}
            </Link>

            <p>
              {phone.snippet}
            </p>
          </div>

          <button
            type="button"
            disabled={localStorage.getItem(phone.id) && true}
            className="phone-catalog__phone--buy"
            onClick={() => addToBasket(phone.id, phone.name)}
          >
            {
              localStorage.getItem(phone.id)
                ? 'Added to basket'
                : 'Buy'
            }
          </button>
        </div>
      ))}
    </main>
  );
};

PhoneCatalog.propTypes = {
  phones: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    snippet: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
};

export default withRouter(PhoneCatalog);
