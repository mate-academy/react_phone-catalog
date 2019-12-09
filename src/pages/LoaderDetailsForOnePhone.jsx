import React from 'react';
import Loader from '../components/Loader';
import DetailsForOnePhone from './DetailsForOnePhone';
import { BASE_URL } from "../components/constants";
import PropTypes from 'prop-types';
import NoSuchPhone from '../components/NoSuchPhone';

class LoaderDetailsForOnePhone extends React.Component {
  state = {
    detailsOfCurrentPhone: {},
    isLoading: false,
    isLoaded: false,
  }

  componentDidMount = () => {
    this.props.loadDataPhones();
    this.loadDataDetails(this.props.id);
  };

  loadDataDetails = async (currentId) => {
    this.setState({
      isLoading: true,
    });

    try {
      const responseDetails = await
        fetch(`${BASE_URL}/api/phones/${currentId}.json`);
      const detailsOfCurrentPhone = await responseDetails.json();

      this.setState({
        detailsOfCurrentPhone,
        isLoading: false,
        isLoaded: true,
      });
    } catch {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const {
      id,
      phones,
      itemsInBasket,
      addItemToBasket
    } = this.props;
    const {
      detailsOfCurrentPhone,
      isLoading,
      isLoaded,
    } = this.state;

    if (isLoading) {
      return (
        <main className="wrapper__main">
          <Loader
            isLoading={isLoading}
          />
        </main>
      )
    } else if (isLoaded) {
      return (
        <main className="wrapper__main">
          {
            id === detailsOfCurrentPhone.id
              ? (
                <>
                  {
                    phones
                      .filter(phone => phone.id === id)
                      .map(phone => (
                        <DetailsForOnePhone
                          id={id}
                          phone={phone}
                          itemsInBasket={itemsInBasket}
                          addItemToBasket={addItemToBasket}
                          key={phone.id}
                          detailsOfCurrentPhone={detailsOfCurrentPhone}
                        />
                      ))
                  }
                </>
              )
              : <NoSuchPhone />
          }
        </main>
      )
    } else {
      return (
        <main className="wrapper__main">
          <NoSuchPhone />
        </main>
      )
    }
  }
}

LoaderDetailsForOnePhone.propTypes = {
  id: PropTypes.string.isRequired,
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadDataPhones: PropTypes.func.isRequired,
  addItemToBasket: PropTypes.func.isRequired,
  itemsInBasket: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LoaderDetailsForOnePhone;
