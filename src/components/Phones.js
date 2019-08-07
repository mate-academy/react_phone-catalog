import React from 'react';
import { getPhones } from '../api/getPhones';

import PhoneCatalog from './PhoneCatalog';
import Loading from './Loading';
import Filter from './Filter';

class Phones extends React.Component {
  state = {
    phones: [],
    filterPhones: [],
    loading: false,
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
      filterPhones: phones,
      loading: true,
    })
  }

  filterPhoneByName = (query) => {
    return this.state.phones.filter(phone => {
        return phone.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
  }

  filterPhone = (event) => {
    const { value } = event.target;

    console.log(value);
    this.setState({
      filterPhones: this.filterPhoneByName(value),
    })
  }

  sortPhone = (event) => {
    const {value} = event.target;

    switch (value) {
      case 'alphabetical':
        this.setState(prevState => ({
          filterPhones: prevState.filterPhones
            .sort((a, b) => a.name.localeCompare(b.name)),
        }));

        break;
      case 'newest':
        this.setState(prevState => ({
          filterPhones: prevState.filterPhones.sort((a, b) => a.age - b.age),
        }));

        break;
      default:
        this.setState(prevState => ({
          copyPhones: prevState.copyPhones,
        }));
    }
  }

  render() {
    const { filterPhones, loading } = this.state;
    console.log(filterPhones);

    return (
      loading
        ? (
          <div className="phones-catalog">
            <Filter filterPhone={this.filterPhone} sortPhone={this.sortPhone}/>
            <PhoneCatalog phones={filterPhones} />
          </div>
        )
        : <Loading />
    )
  }
};

export default Phones;
