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

  onHandlerFilter = (event) => {
    const { value } = event.target;

    this.setState({ filterStr: value });
  };

  filterPhones = (filter) => {
    const { phonesToShow, phones } = this.state;

    if (filter === '^$') {
      return phonesToShow;
    }

    return phones.filter(phone => (
      phone.name.toLowerCase().includes(filter.toLowerCase())
    ));
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
              return {
                phonesToShow: prevState.phones,
              };
          }
        }),
    }));
  };

  render() {
    const { filterStr, loading } = this.state;
    const { handlerAddToBasket } = this.props;
    const filterPhones = this.filterPhones(filterStr);

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
            phones={filterPhones}
            handlerAddToBasket={handlerAddToBasket}
          />
        </div>
      ) : (
        <Loader />
      )
    );
  }
}

PhonesPage.propTypes = {
  handlerAddToBasket: propTypes.func.isRequired,
};

export default PhonesPage;
