import React from 'react';
import propTypes from 'prop-types';
import { getPhoneDetails } from './GetData';
import PhoneDetails from './PhoneDetails';
import Loader from './Loader';

class PhoneDetailsPage extends React.Component {
  state = {
    rightUrl: '',
    phoneDetails: [],
    loading: false,
  };

  phoneId = this.props.match.params.phoneId;

  async componentDidMount() {
    const staticUrl = `https://mate-academy.github.io/phone-catalogue-static/api/phones/`;
    const url = `${staticUrl}${this.phoneId}.json`;
    const phoneDetails = await getPhoneDetails(url);

    if (phoneDetails) {
      this.setState({ rightUrl: url });
    }

    this.setState({
      phoneDetails,
      loading: true,
    });
  }

  render() {
    const { phoneDetails, loading, rightUrl } = this.state;
    const { handlerAddToBasket } = this.props;

    return (
      !rightUrl ? (
        <h2>Phone was not found</h2>
      ) : (
        loading
          ? (
            <PhoneDetails
              phoneDetails={phoneDetails}
              handlerAddToBasket={handlerAddToBasket}
            />
          )
          : <Loader />
      )
    );
  }
}

PhoneDetailsPage.propTypes = {
  match: propTypes.shape().isRequired,
  addPhoneToBasket: propTypes.func.isRequired,
};

export default PhoneDetailsPage;
