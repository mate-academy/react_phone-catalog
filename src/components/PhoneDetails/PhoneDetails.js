import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToBasket } from '../../redux/actions';
import './PhoneDetails.css';

class PhoneDetails extends React.Component {
  state = {
    mainImg: this.props.phone.images[0],
  }

  handleMainImage = image => (
    this.setState({ mainImg: image })
  )

  render() {
    const { phone, addPhoneToBasket } = this.props;
    const { mainImg } = this.state;

    return (
      <div className="phone-wrap">
        <h1 className="phone-title">
          {phone.name}
        </h1>
        <div className="phone-details">
          <div className="phone-details__main-img">
            <img
              src={
                // eslint-disable-next-line max-len
                `https://mate-academy.github.io/phone-catalogue-static/${mainImg}`
              }
              alt={phone.name}
              width="100%"
            />
          </div>
          <div className="phone-details__overview">
            <div className="phone-details__desc">
              {phone.description}
            </div>
            <button
              type="button"
              className="phone-details__btn"
              onClick={() => addPhoneToBasket(phone.name)}
            >
              Add to basket
            </button>
          </div>
          <div className="phone-details__img">
            <ul className="phone-details__img-list">
              {phone.images.map(image => (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={image}
                  className="phone-details__img-item"
                  onClick={() => this.handleMainImage(image)}
                >
                  <img
                    src={
                      // eslint-disable-next-line max-len
                      `https://mate-academy.github.io/phone-catalogue-static/${image}`
                    }
                    alt={phone.name}
                    width="100%"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToState = dispatch => ({
  addPhoneToBasket: phoneName => dispatch(addToBasket(phoneName)),
});

PhoneDetails.propTypes = {
  phone: PropTypes.arrayOf(PropTypes.object).isRequired,
  addPhoneToBasket: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToState)(PhoneDetails);
