import React from 'react';
import PropTypes from 'prop-types';
import PhoneCatalog from '../phonecatalog/PhoneCatalog';
import Filter from '../filter/Filter';
import { getPhones } from '../loadingData';
import './phonespage.css';

const getSortFunc = (value) => {
  const values = value.split('*');
  const field = values[0];
  const sortWay = +values[1];

  switch (field) {
    case 'age':
      return (a, b) => sortWay * (a[field] - b[field]);
    case 'name':
      return (a, b) => sortWay * a[field].localeCompare(b[field]);
    default: return (a, b) => 0;
  }
};

class PhonePage extends React.Component {
  state = {
    phones: [],
  }

  componentDidMount() {
    getPhones().then(
      (data) => {
        this.setState({
          phones: [...data],
        });
      }
    );
  }

  getFiltredPhones = (values) => {
    let filtredPhones = [];
    const { phones } = this.state;

    if (values.query) {
      filtredPhones = phones.filter(phone => (
        phone.name.toLowerCase().includes(values.query)
      ));
    } else {
      filtredPhones = [...phones];
    }

    if (values.sort) {
      filtredPhones = [...filtredPhones].sort(getSortFunc(values.sort));
    }

    return filtredPhones;
  }

  render() {
    const { search } = this.props.location;

    const searchValues = {
      query: '',
      sort: '',
    };

    if (search) {
      const partsOfSeach = decodeURI(search).slice(1).split('&');

      for (let i = 0; i < partsOfSeach.length; i += 1) {
        const [key, value] = partsOfSeach[i].split('=');

        searchValues[key] = value;
      }
    }

    const filtredPhones = this.getFiltredPhones(searchValues);

    return (
      <div className="phones-page">
        <Filter searchValues={searchValues} />

        <div>
          <PhoneCatalog phones={filtredPhones} />
        </div>
      </div>
    );
  }
}

PhonePage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default PhonePage;
