import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PhoneDetails from './PhoneDetails';
import { getPhoneDetails } from '../API_DATA';

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: null,
    isLoaded: false,
    imageUrl: [],
    imageOrder: true,
  };

  async componentDidMount() {
    const { phoneId } = this.props;
    const temp = await getPhoneDetails(phoneId);

    this.setState({
      phoneDetails: temp,
      imageUrl: temp.images[0],
      isLoaded: true,
    });
  }

  handleImageIndex = (event) => {
    this.setState({
      imageUrl: event.target.name,
    });

    this.setState(prevState => ({ imageOrder: !prevState.imageOrder }));
  }

  render() {
    const {
      phone, basketPhones, chandgeBasketItems,
    } = this.props;
    const {
      phoneDetails, isLoaded, imageUrl, imageOrder,
    } = this.state;
    const loaderUrl = './img/giphy.webp';

    return (
      <main className="main-container">
        {!isLoaded && <img src={loaderUrl} alt="loader" />}
        {isLoaded && (
          <>
            <div className="phone__main-info">
              <div className="phone__galary">
                <div className="phone__image">
                  <img
                    src={imageUrl}
                    alt={phoneDetails.name}
                    className={
                      imageOrder
                        ? 'phone__image-animation--in'
                        : 'phone__image-animation--out phone__image-out'
                    }
                  />

                  <img
                    src={imageUrl}
                    alt={phoneDetails.name}
                    className={
                      !imageOrder
                        ? 'phone__image-animation--in'
                        : 'phone__image-animation--out phone__image-out'
                    }
                  />
                </div>

                {phoneDetails.images.map(imgUrl => (
                  <input
                    name={imgUrl}
                    onClick={this.handleImageIndex}
                    key={imgUrl}
                    type="image"
                    className="phone__preview"
                    src={imgUrl}
                    alt={phoneDetails.name}
                  />
                ))}
              </div>

              <div className="phone__info">
                <h1>{phoneDetails.name}</h1>
                <h4>{phoneDetails.description}</h4>

                <div className="phone__buttons">
                  <button
                    name={phone.id}
                    type="button"
                    className={
                      basketPhones.some(bp => bp.id === phone.id)
                        ? 'button button--added button--added-phone-page'
                        : 'button'
                    }

                    onClick={() => {
                      if (basketPhones
                        .some(basketPhone => basketPhone.id === phone.id)) {
                        return basketPhones;
                      }

                      localStorage.setItem('basketPhones', JSON.stringify([
                        ...basketPhones,
                        {
                          id: phone.id,
                          quantity: 1,
                          name: phone.name,
                          imageUrl: phone.imageUrl,
                        },
                      ]));

                      return chandgeBasketItems([
                        ...basketPhones,
                        {
                          id: phone.id,
                          quantity: 1,
                          name: phone.name,
                          imageUrl: phone.imageUrl,
                        },
                      ]);
                    }}
                  >
                    {
                      basketPhones.some(bp => bp.id === phone.id)
                        ? `Phone in Basket ${
                          basketPhones.find(bp => bp.id === phone.id).quantity
                        }`
                        : 'Add to Basket'
                    }
                  </button>

                  {basketPhones
                    .some(basketPhone => basketPhone.id === phone.id)
                    && (
                      <Link
                        to="/basket"
                        className="button"
                      >
                      To Basket
                      </Link>
                    )}
                </div>
              </div>
            </div>

            {<PhoneDetails phoneDetails={phoneDetails} />}
          </>
        )}
      </main>
    );
  }
}

PhoneDetailsPage.propTypes = {
  phone: PropTypes.shape({
    name: PropTypes.string,
    snippet: PropTypes.string,
  }),
  phoneId: PropTypes.string.isRequired,
  chandgeBasketItems: PropTypes.func.isRequired,
  basketPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
};

PhoneDetailsPage.defaultProps = {
  phone: { name: '', snippet: '' },
};

export default PhoneDetailsPage;
