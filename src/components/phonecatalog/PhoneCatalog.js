import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import './phonecatalog.css';
import Basket from '../basket/Basket';

const PhoneCatalog = ({ phones, match }) => {
  const { url } = match;

  return (
    <main className="phone-catalog">

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

          <Basket.AddButton phone={phone} />
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
};

export default withRouter(PhoneCatalog);
