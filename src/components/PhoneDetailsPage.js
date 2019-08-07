import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

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

    return (
      <div>
        {error
          ? (<h2>Phone was not found</h2>)
          : (
            <>
              {isLoaded
                ? <PhoneDetails details={phoneDetails} />
                : (
                  <Loader
                    type="ThreeDots"
                    color="#049dfcde"
                    height="100"
                    width="100"
                  />
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
};

export default PhoneDetailsPage;
