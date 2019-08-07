import React from 'react';

import { getPhoneDetails } from '../api/getPhones';
import PhoneDetail from './PhoneDetail';
import Loading from './Loading';

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: [],
    loading: false,
    errors: '',
  }

  async componentDidMount() {
    const { phoneId } = this.props;

    try {
      const phoneDetails = await getPhoneDetails(phoneId);

      this.setState({
        phoneDetails,
        loading: true,
      })
    } catch (error) {
      this.setState({
        errors: 'Phone was not found',
      })
    };
  }

  render() {
    const { loading, phoneDetails, errors } = this.state;

    return (
      (errors === "")
        ? (loading
          ? <PhoneDetail phoneDetails={phoneDetails} />
          : <Loading />
        ) : (
          <h1 className="error-title centr">{errors}</h1>
        )
    )
  }
}

export default PhoneDetailsPage;
