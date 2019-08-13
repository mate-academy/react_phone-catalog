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

            <div className="phone-details_name">
              {currentPhone.name}
            </div>

            <Link
              className="cart-phones_link-back"
              to="/phones"
            >
              Go back to catalog
            </Link>
          </section>

          <div className="phone-details_additionalFeatures">
            {currentPhone.additionalFeatures}
          </div>

          <article className="phone-details_header">
            <div className="phone-details_images">
              <ImagesCarousel image={currentPhone.images} />
            </div>
          </article>

          <div className="phone-details_description">
            {currentPhone.description}
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
