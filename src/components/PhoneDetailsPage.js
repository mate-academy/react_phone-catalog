import React from 'react';
import PropTypes from 'prop-types';

import NoPhone from './NoPhone';
import PhoneDetails from './PhoneDetails';
import { getPhoneDetails } from '../API_DATA';

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: null,
    isLoaded: false,
  };

  async componentDidMount() {
    const { phoneId } = this.props;
    const temp = await getPhoneDetails(phoneId);

    this.setState({ phoneDetails: temp, isLoaded: true });
  }

  render() {
    const { phone } = this.props;
    const { phoneDetails, isLoaded } = this.state;
    const loaderUrl = './img/giphy.webp';

    if (!isLoaded && !phone) {
      return (
        <NoPhone />
      );
    }

    return (
      <main className="main-container">
        <h1>{isLoaded && phoneDetails.name}</h1>
        <h3>{isLoaded && phoneDetails.description}</h3>

        {!isLoaded && <img src={loaderUrl} alt="loader" />}

        {isLoaded && <PhoneDetails phoneDetails={phoneDetails} />}
      </main>
    );
  }
}

PhoneDetailsPage.propTypes = {
  phone: PropTypes.shape({
    name: PropTypes.string,
    snippet: PropTypes.string,
  }).isRequired,
  phoneId: PropTypes.string.isRequired,
};

export default PhoneDetailsPage;
