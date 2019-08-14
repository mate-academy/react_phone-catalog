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

  addToBasketPhone = (event) => {
    const { phoneDetails } = this.state;
    const id = event.target.name;

    const addToBasketPhone = {
      id,
      phoneName: phoneDetails.name,
      quantity: 1,
    }

    this.props.addToBasket(addToBasketPhone);
  }

  render() {
    const { loading, phoneDetails, errors } = this.state;
    const { addToBasket } = this.props;

    return (
      (errors === "")
        ? (loading
          ? <PhoneDetail
            phoneDetails={phoneDetails}
            addToBasketPhone={this.addToBasketPhone}
          />
          : <Loading />
        ) : (
          <h1 className="error-title centr">{errors}</h1>
        )
    )
  }
}

export default PhoneDetailsPage;
