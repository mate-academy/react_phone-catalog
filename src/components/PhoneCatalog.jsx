import React from 'react';
import { loadPhonesAPI } from '../api/API_DATA';
import { NavLink } from 'react-router-dom';
import Phone from './Phone'
import LoadAnimation from './LoadAnimation'


class PhoneCatalog extends React.Component {
  state = {
    phones: [],
    isLoaded: false,
    isLoading: false,
  }

  componentDidMount = async() => {
    this.setState({
      isLoading: true,
    });

    const loadPhones = await loadPhonesAPI();

    this.setState({
      phones: loadPhones,
      isLoaded: true,
      isLoading: false,
    });
  }

  render() {
    const { phones, isLoading, isLoaded } = this.state;
    const { id } = this.props;

    if (isLoaded) {
      return (
        id
          ? <Phone phone={phones.find(phone => phone.id === id)}/>
          : <>
              <div  className="catalog">
                {phones.map(phone => (
                  <div
                    className="catalog_phone"
                    key={phone.id}
                  >
                    <NavLink
                      to={`/phones/${phone.id}`}
                    >
                      <img className="catalog_phone-img" src={phone.imageUrl} alt=""/>
                      <div className="catalog_phone-name">
                        {phone.name}
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </>
      )
    }

    return (
      <div className="load-sign" >
          {isLoading ? <LoadAnimation /> : ''}
      </div>
    );
  }
}

export default PhoneCatalog;
