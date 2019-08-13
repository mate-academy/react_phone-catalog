import React from 'react';
import { getPhoneDetails } from './GetData';
import PhoneDetails from './PhoneDetails';
import Loader from './Loader';

class PhoneDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneDetails: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { phoneId } = this.props;

    this.getDetails(phoneId);
  }

  getDetails = async(phoneId) => {
    const staticUrl = `https://mate-academy.github.io/phone-catalogue-static/api/phones/`;
    const url = `${staticUrl}${phoneId}.json`;
    const phoneDetails = await getPhoneDetails(url);

    this.setState({
      phoneDetails,
      loading: true,
    });
  };

  render() {
    const { phoneDetails, loading } = this.state;
    console.log(phoneDetails);

    return (
      loading
        ? <PhoneDetails phoneDetails={phoneDetails} />
        : <Loader />
    );
  }

}

export default PhoneDetailsPage;
