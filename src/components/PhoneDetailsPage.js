import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import getData from '../api/getData';
import PhoneDetails from './PhoneDetails';

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: {},
    isLoaded: false,
    error: '',
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const { phoneId } = this.props;

    try {
      const phoneDetails = await getData(`/${phoneId}`);

      this.setState({
        phoneDetails,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { phoneDetails, isLoaded, error } = this.state;
    const {
      addPhone,
      selectedPhones,
      increaseQuantity,
      decreaseQuantity,
    } = this.props;

    return (
      <div className="phone-page">
        {error
          ? (<h2>Phone was not found</h2>)
          : (
            <>
              {isLoaded
                ? (
                  <PhoneDetails
                    details={phoneDetails}
                    addPhone={addPhone}
                    selectedPhones={selectedPhones}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                ) : (
                  <div className="loader">
                    <Loader
                      type="ThreeDots"
                      color="#049dfcde"
                    />
                  </div>
                )
              }
            </>
          )
        }
      </div>
    );
  }
}

PhoneDetailsPage.propTypes = {
  phoneId: PropTypes.string.isRequired,
  addPhone: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PhoneDetailsPage;
