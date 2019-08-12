import React from 'react';

import PhoneCatalog from './PhoneCatalog';

const getPhones = async() => {
  const url
    = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const response = await fetch(url);
  const phones = await response.json();

  return phones;
};

class Phones extends React.Component {
  state = {
    phones: [],
  }

  async componentDidMount() {
    const phones = await getPhones();

    console.log(phones);

    this.setState({
      phones,
    });
  }

  render() {
    return (
      <div>
        <h1>Phones</h1>
        <PhoneCatalog
          phones={this.state.phones}
          addToCart={this.props.addToCart}
        />
      </div>
    );
  }
}

export default Phones;
