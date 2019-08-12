import React from 'react';
import { NavLink } from 'react-router-dom';
import { loadPhonesAPI } from '../api/API_DATA';
import Phone from './Phone';
import LoadAnimation from './LoadAnimation';
import SearchField from './SearchField';

class PhoneCatalog extends React.Component {
  state = {
    phones: [],
    visipblePhones: [],
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
      visipblePhones: loadPhones,
      isLoaded: true,
      isLoading: false,
    });
  }

  handleChangeFilter = ({target: {value}}) => {
    this.setState({
      valueForSearch: value.toLowerCase(),
    });
  };

  getFilteredPhones = (value) => {
    const { visipblePhones } = this.state;

    return visipblePhones.filter(phone =>
      (phone.name.toLowerCase().includes(value))
    );
  };

  getSortedBy = (event) => {
    const { value } = event.target;

    switch (value) {
      case 'age':
        return this.setState(prevState => ({
          visipblePhones: [...prevState.phones]
            .sort((a, b) => a.age - b.age),
        }));
      case 'alphabet':
        return this.setState(prevState => ({
          visipblePhones: [...prevState.phones]
            .sort((a, b) => a.name.localeCompare(b.name)),
        }));
      default:
        return this.setState(prevState => ({
          visipblePhones: prevState.phones,
        }));
    }
  }

  render() {
    const { valueForSearch, isLoading, isLoaded } = this.state;
    const { id } = this.props;
    const visipblePhones = this.getFilteredPhones(valueForSearch)

    if (isLoaded) {
      return (

        id
          ? (
            <Phone
              phone={visipblePhones.find(phone => phone.id === id)}
              handleClickAddPhoneToCart={this.props.handleClickAddPhoneToCart}
            />
          )
          : (
            <>
              <SearchField
                visipblePhones={visipblePhones}
                handleChangeFilter={this.handleChangeFilter}

              />
              <div className="sorting">
                <label htmlFor="sort-field">
                  <p className="sort-field-sign">Select sorting method</p>
                  <select
                    id="sort-field"
                    name="sort-field"
                    className="sort-field"
                    onChange={this.getSortedBy}
                  >
                    <option value="age">
                      Newest
                    </option>

                    <option value="alphabet">
                      Alphabetical
                    </option>
                  </select>
                </label>
              </div>
              <div className="catalog">
                {visipblePhones.map(phone => (
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
                      <img className="catalog_phone-img" src={phone.imageUrl} alt="" />
                      <div className="catalog_phone-name">
                        {phone.name}
                      </div>
                    </NavLink>
                  </div>
                ))}
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
