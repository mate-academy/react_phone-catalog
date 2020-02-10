import React from 'react';
import { NavLink } from 'react-router-dom';
import { loadPhonesAPI } from '../api/API_DATA';
import Phone from './Phone';
import LoadAnimation from './LoadAnimation';
import SearchField from './SearchField';

class PhoneCatalog extends React.Component {
  state = {
    phones: [],
    visiblePhones: [],
    isLoaded: false,
    isLoading: false,
    direction: 1,
    valueForSearch: '',
  }

  componentDidMount = async() => {
    this.setState({
      isLoading: true,
    });

    const loadPhones = await loadPhonesAPI();

    this.setState({
      phones: loadPhones,
      visiblePhones: loadPhones,
      isLoaded: true,
      isLoading: false,
    });
  }

  debounce = (f, delay) => {
    let timerId = 0;

    const wrapper = (...args) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => f(...args), delay)
    }

    return wrapper;
  }

  handleChangeFilter = ({target: {value}}) => {
    this.setState({
      valueForSearch: value.toLowerCase(),
    });
  };

  wrapper = this.debounce(this.handleChangeFilter, 1000);

  getFilteredPhones = (value) => {
    const { visiblePhones } = this.state;

    return visiblePhones.filter(phone =>
      (phone.name.toLowerCase().includes(value))
    );
  };

  getSortedBy = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'age':
        return this.setState(prevState => ({
          visiblePhones: [...prevState.phones]
            .sort((a, b) => a.age - b.age),
        }));
      case 'alphabet':
        return this.setState(prevState => ({
          visiblePhones: [...prevState.phones]
            .sort((a, b) => a.name.localeCompare(b.name)),
        }));
      default:
        return this.setState(prevState => ({
          visiblePhones: prevState.phones,
        }));
    }
  }

  render() {
    const { valueForSearch, isLoading, isLoaded } = this.state;
    const { id } = this.props;
    const visiblePhones = this.getFilteredPhones(valueForSearch)

    if (isLoaded) {
      return (

        id
          ? (
            <Phone
              phone={visiblePhones.find(phone => phone.id === id)}
              handleClickAddPhoneToCart={this.props.handleClickAddPhoneToCart}
            />
          )
          : (
            <>
              <div>
                <div className='search_field-grid'>
                  <SearchField
                    className="search_field"
                    visiblePhones={visiblePhones}
                    handleChangeFilter={this.handleChangeFilter}
                  />
                </div>

                <div className="catalog">
                  {visiblePhones.map(phone => (
                    <div
                      className="catalog_phone"
                      key={phone.id}
                    >
                      <section className="catalog_phone-add-grid">
                        <button
                          className="catalog_phone-add"
                          onClick={() => this.props.handleClickAddPhoneToCart(phone)}
                        >
                          Add to Cart
                        </button>
                      </section>
                      <NavLink
                        className="catalog_phone-text-decoration"
                        to={`/phones/${phone.id}`}
                      >
                        <img className="catalog_phone-img" src={phone.imageUrl} alt={phone.name} />
                        <div className="catalog_phone-name">
                          {phone.name}
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
      );
    }

    return (
      <div className="load-sign">
        {isLoading ? <LoadAnimation /> : ''}
      </div>
    );
  }
}

export default PhoneCatalog;
