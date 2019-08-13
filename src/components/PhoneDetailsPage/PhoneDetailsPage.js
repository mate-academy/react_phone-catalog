import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Loader from '../Loader/Loader';
import PhoneDetails from '../PhoneDetails/PhoneDetails';
import './PhoneDetailsPage.css';

class PhoneDetailsPage extends React.Component {
  state = {
    phone: [],
    isLoaded: false,
    error: false,
  }

  async componentDidMount() {
    const { match } = this.props;

    fetch(
      // eslint-disable-next-line max-len
      `https://mate-academy.github.io/phone-catalogue-static/api/phones/${match.params.phoneId}.json`
    )
      .then(res => res.json())
      .then(phone => (
        this.setState({
          phone,
          isLoaded: true,
        })
      ))
      .catch(() => (
        this.setState({
          error: true,
          isLoaded: true,
        })
      ));
  }

  render() {
    const { isLoaded, phone, error } = this.state;

    return (
      <div>
        {error && (
          <>
            <h1 className="error">Phone was not found</h1>
            <NavLink
              className="error-link"
              to="/phones"
            >
              Back to Phones Page
            </NavLink>
          </>
        )}
        {isLoaded && !error
          ? <PhoneDetails phone={phone} />
          : <Loader />
        }
      </div>
    );
  }
}

PhoneDetailsPage.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PhoneDetailsPage;
