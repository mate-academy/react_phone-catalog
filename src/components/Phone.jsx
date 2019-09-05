import React from 'react';
import { Link } from 'react-router-dom';
import { loadPhoneDetailsAPI } from '../api/API_DATA';
import LoadAnimation from './LoadAnimation';
import ImagesCarousel from './ImagesCarousel';
import Specefications from './Specifications'

class Phone extends React.Component {
  state = {
    currentPhone: [],
    currentImage: 0,
    isLoaded: false,
    isLoading: false,
  }

  componentDidMount = async() => {
    const { phone } = this.props;

    this.setState({
      isLoading: true,
    });

    const loadPhoneDetails = await loadPhoneDetailsAPI(phone.id);

    this.setState({
      currentPhone: loadPhoneDetails,
      isLoaded: true,
      isLoading: false,
    });
  }

  handleChangePhoto = (index) => {
    this.setState({ currentImage: index });
  }

  render() {
    const { currentPhone, isLoading, isLoaded } = this.state;
    const { handleClickAddPhoneToCart } = this.props

    if (isLoaded) {
      return (
        <main>

          <section className="phone-details">
            <button
              className="phone-details_add"
              onClick={() => handleClickAddPhoneToCart(currentPhone)}
            >
              Add to Cart
            </button>
            <Link
              className="cart-phones_link-back-phone-details"
              to="/phones"
            >
              Go back to catalog
            </Link>
          </section>

          <p className="phone-details_name">
              {currentPhone.name}
          </p>

          <div className="phone-details_header">
            <div className="phone-details_images">
              <ImagesCarousel image={currentPhone.images} />
            </div>
          </div>

          <div className="phone-details-wrapper_description">
            <div className="phone-details_description" title={currentPhone.description}>
              {currentPhone.description}
            </div>
          </div>

          <Specefications currentPhone={currentPhone}/>

        </main>
      );
    }

    return (
      <div className="load-sign">
        {isLoading ? <LoadAnimation /> : ''}
      </div>
    );
  }
}

export default Phone;
