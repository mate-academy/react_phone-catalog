import React from 'react';
import Loader from '../components/Loader';
import DetailsForOnePhone from './DetailsForOnePhone';
import { BASE_URL } from "../components/constants";
import PropTypes from 'prop-types';

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

    const responseDetails = await
      fetch(`${BASE_URL}/api/phones/${currentId}.json`);
    const detailsOfCurrentPhone = await responseDetails.json();

    this.setState({
      detailsOfCurrentPhone,
      isLoading: false,
      isLoaded: true,
    });
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

    return (
      <main className="wrapper__main">
        {
          isLoaded
            ? (
              <>
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
                    : 'No any data for this phone'
                }
              </>
            )
            : (
              <Loader
                isLoading={isLoading}
              />
            )
        }
      </main>
    );
  }
}

LoaderDetailsForOnePhone.propTypes = {
  id: PropTypes.string.isRequired,
  phones: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadDataPhones: PropTypes.func.isRequired,
};

export default LoaderDetailsForOnePhone;
