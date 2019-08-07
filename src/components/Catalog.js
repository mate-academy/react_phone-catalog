/* eslint-disable */
import React from 'react';
import GetData from './GetData';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Catalog extends React.Component {
  state = {
    phones: [],
    isLoaded: false,
  };

  async componentDidMount() {
    const phones = await GetData('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
    const details = await GetData('https://mate-academy.github.io/phone-catalogue-static/api/phones/motorola-xoom.json');
    this.setState({
      phones: phones,
      isLoaded: true,
    });
  }

  render() {
    const { isLoaded } = this.state;
    console.log(this.state.phones);
    if (!isLoaded) {
      return (
        <div className="Loader">
          <Loader
            type="TailSpin"
            color="#0072bc"
          />
        </div>
      )
    }
    return (
      <div className="catalog">
        {this.state.phones.map(phone => (
          <div className="catalog__item">
            <img
              className="catalog__item-img"
              src={`${phone.imageUrl}`}
              alt={phone.name}
            />
            <h3 className="catalog__item-head">{phone.name}</h3>
            <p className="catalog__item-snippet">{phone.snippet}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Catalog;
