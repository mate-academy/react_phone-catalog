import React from 'react';

import PhoneCatalog from './PhoneCatalog';
import Loading from './Loading';
import Filter from './Filter';

import { getPhones } from '../api/getPhones';

class Phones extends React.Component {
  state = {
    phones: [],
    filterPhones: [],
    loading: false,
    basketItems: [],
    filter: '',
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
      filterPhones: phones,
      loading: true,
    })
  }

  filterPhoneByName = (filter) => {
    return this.state.phones.filter(phone => {
      return phone.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    })
  }

  filterPhone = (event) => {
    const { value } = event.target;

    this.setState({
      filter: value,
    })
  }

  sortPhones = (event) => {
    const { value } = event.target;
    const { filterPhones } = this.state;
    
    switch (value) {
      case 'alphabetical':
        this.setState(prevState => ({
          filterPhones: prevState.phones.sort((a, b) => a.name.localeCompare(b.name)),
        }));

        break;
      case 'newest':
        this.setState(prevState => ({
          filterPhones: prevState.phones.sort((a, b) => a.age - b.age),
        }));

        break;
      default:
        this.setState(prevState => ({
          filterPhones: prevState.phones,
        }));
    }
  }

  addToBasketPhone = (event) => {
    const { phones } = this.state;
    const { name } = event.target;

    const addToBasketPhone = {
      id: name,
      phoneName: (phones.find(phone => phone.id === name)).name,
      quantity: 1,
    }

    this.props.addToBasket(addToBasketPhone);
  }

  render() {
    const { loading, filter } = this.state;
    const filterPhones = this.filterPhoneByName(filter);

    return (
      loading
        ? (
          <div className="phones-catalog">
            <Filter
              filterPhone={this.filterPhone}
              sortPhone={this.sortPhones}
            />
            <PhoneCatalog
              phones={filterPhones}
              addToBasket={this.addToBasketPhone}
            />
          </div>
        )
        : <Loading />
    )
  }
};

export default Phones;
