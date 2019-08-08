/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';
import GetData from './GetData';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Filter from "./Filter";

class FullCatalog extends React.Component {
  state = {
    initialPhones: [],
    phones: [],
    isLoaded: false,
  };

  async componentDidMount() {
    const phones = await GetData('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
    this.setState({
      initialPhones: phones,
      phones: phones,
      isLoaded: true,
    });
  }
  
  injectFilteredPhones = (filteredPhones) => {
      this.setState({
        phones: filteredPhones,
      })
  };

  render() {
    const { isLoaded, initialPhones, phones } = this.state;
    if (!isLoaded) {
      return (
        <div className="Loader">
          <Loader
            type="TailSpin"
            color="#0072bc"
          />
        </div>
      );
    }

    return(
      <div className="Catalog-container">
       <Filter
         injectFilteredPhones={this.injectFilteredPhones}
         initialPhones={initialPhones}
       />
        <div className="catalog">
          {phones.map(phone => (
            <Link
              key={phone.id}
              className="catalog__item"
              to={`/catalog/${phone.id}`}
            >
              <img
                className="catalog__item-img"
                src={`${phone.imageUrl}`}
                alt={phone.name}
              />
              <h3 className="catalog__item-head">{phone.name}</h3>
              <p className="catalog__item-snippet">{phone.snippet}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default FullCatalog;
