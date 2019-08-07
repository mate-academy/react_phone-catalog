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
    if (this.props.phoneId) {
      const { phoneId } = this.props;

      const temp = await getPhoneDetails(phoneId);

      this.setState({ phoneDetails: temp, isLoaded: true });
    }
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
      <div>
        <h1>{isLoaded && phone.name}</h1>
        <h3>{isLoaded && phone.snippet}</h3>

        {!isLoaded && <img src={loaderUrl} alt="loader" />}

        {isLoaded && <PhoneDetails phoneDetails={phoneDetails} />}
      </div>
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
