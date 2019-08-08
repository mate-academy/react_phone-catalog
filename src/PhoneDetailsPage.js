import React from 'react';
import { getPhoneDetails } from './GetData';

class PhoneDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneDetails: [],
    };
  }

  componentDidMount() {
    console.log(this.state.phone);
    this.getDetails();
  }

  getDetails = async() => {
    const url = `https://mate-academy.github.io/
    phone-catalogue-static/api/phones/${this.state.phone.id}.json`;
    const phoneDetails = await getPhoneDetails(url);

    this.setState({ phoneDetails });
    console.log(phoneDetails);
  };

  render() {
    const { phoneDetails } = this.state;

    return (
      <div className="">
        {phoneDetails.id}
      </div>
    );
  }

}

export default PhoneDetailsPage;
