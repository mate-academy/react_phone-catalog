import React from 'react';
import propTypes from 'prop-types';
import { getPhones } from './GetData';
import Loader from './Loader';
import Filter from './Filter';
import PhoneCatalog from './PhoneCatalog';
import './styles/phones.css';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    phonesToShow: [],
    filterStr: '',
    loading: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async() => {
    const phones = await getPhones();

    this.setState({
      loading: true,
      phones,
      phonesToShow: phones,
    });
  };

  onHandlerChange = (event) => {
    const { value, valueSelect, name } = event.target;

    if (name === 'filter') {
      this.setState({ filterStr: value });
    }

    this.setState(prevState => ({
      phonesToShow: prevState.phonesToShow
        .filter(phone => (
          phone.name.toLowerCase().includes(value.toLowerCase())
        ))
        .sort((a, b) => {
          switch (valueSelect) {
            case 'newest':
              return a.id - b.id;
            case 'alpha':
              return a.name.localeCompare(b.name);
            default:
              return null;
          }
        }),
    }));
  };

  onHandlerFilter = (event) => {
    const { value } = event.target;

    if (value === '^$') {
      return;
    }

    this.setState(prevState => ({
      filterStr: value,
      phonesToShow: prevState.phones
        .filter(phone => (
          phone.name.toLowerCase().includes(value.toLowerCase())
        )),
    }));
  };

  getClearFilter = () => {
    this.setState(prevState => ({
      filterStr: '',
      phonesToShow: prevState.phones,
    }));
  };

  onHandlerSort = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      phonesToShow: prevState.phonesToShow
        .sort((a, b) => {
          switch (value) {
            case 'newest':
              return a.age - b.age;
            case 'alpha':
              return a.name.localeCompare(b.name);
            default:
              return null;
          }
        }),
    }));
  };

  render() {
    const { filterStr, phonesToShow, loading } = this.state;

    return (
      loading ? (
        <div className="phones">
          <Filter
            filterStr={filterStr}
            onHandlerFilter={this.onHandlerFilter}
            clearFilter={this.getClearFilter}
            onHandlerSort={this.onHandlerSort}
          />
          <PhoneCatalog
            phones={phonesToShow}
          />
        </div>
      ) : (
        <Loader />
      )
    );
  }
}

PhonesPage.propTypes = {
  match: propTypes.shape().isRequired,
};

export default PhonesPage;
