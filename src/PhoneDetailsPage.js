import React from 'react';
import Loading from './Loading';

const getDetails = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static';
  const response = await fetch(`${url}/api/phones/motorola-xoom.json`);

  const currentContent = await response.json();

  return currentContent;
};

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: [],
  }

  async componentDidMount() {
    const phoneDetails = await getDetails();

    this.setState({ phoneDetails });
  }

  render() {
    const { phoneDetails } = this.state;

    return (
      phoneDetails.length === 0 ? <Loading />
        : (

          <div
            className="catalog__phones"
          >
            <img
              src=""
              alt="Motorrola"
              className="card__img"
            />

          </div>
        ));
  }
}

export default PhoneDetailsPage;
