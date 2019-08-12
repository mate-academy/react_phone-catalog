import React from 'react';
import { getPhones } from '../../getData';
import Phone from './Phone';

class PhoneCatalog extends React.Component {
  constructor() {
    super();
    this.state = {
      phones: [],
      isLoaded: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const phones = await getPhones();
    const preparedPhones = phones.map(phone => ({
      ...phone,
    }
    ));

    this.setState({
      isLoading: true,
      phones: [...preparedPhones],
      visiblePhones: preparedPhones,
    });
    this.setState(prevState => ({
      isLoaded: true,
      isLoading: false,
    }));
  };

  handleSearch = (event) => {
    const search = event.target.value;

    this.setState(prevState => ({
      phones: prevState.visiblePhones.filter(
        phone => [phone.name]
          .join('').toLowerCase().includes(search.toLowerCase())
      ),
    }));
  };

  render() {
    const { phones } = this.state;

    if (!this.state.isLoaded) {
      return (
        <div className="text-center">
          {this.state.isLoading ? (
            <div className="spinner-border" role="status" />
          )
            : (
              <div className="spinner-border mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )
          }
        </div>
      );
    }

    return (
      <div>
        <h1>Phone catalog</h1>
        <h1>
          Total:
          {' '}
          {phones.length}
          {' '}
phones
        </h1>
        <form className="form-horizontal">
          <input
            placeholder="Search..."
            onChange={this.handleSearch}
            className="form-control mb-4"
          />
        </form>

        <div className="phone-catalogue">
          <Phone phones={phones} />
        </div>
      </div>
    );
  }
}

export default PhoneCatalog;
