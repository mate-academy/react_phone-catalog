import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PhoneDetails extends React.Component {
  state = {
    imageNumber: 0,
  }

  switchImage = (index) => {
    this.setState({ imageNumber: index });
  }

  render() {
    const { details, addPhone } = this.props;
    const { imageNumber } = this.state;

    return (
      <div>
        <img
          src={details.images[imageNumber]}
          alt="phone"
          className="increased-img"
        />

        <h2 className="phone__title">{details.name}</h2>

        <p className="phone__description">{details.description}</p>

        <ul className="phone-thumbs">
          {details.images.map((image, index) => (
            <li key={image}>
              <img
                onClick={() => this.switchImage(index)}
                className={classnames('phone-thumbs__img', {
                  selected: imageNumber === index,
                })}
                src={image}
                alt="phone"
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => addPhone(details)}
        >
          Add to basket
        </button>
      </div>
    );
  }
}

PhoneDetails.propTypes = {
  details: PropTypes.objectOf(PropTypes.object).isRequired,
  addPhone: PropTypes.func.isRequired,
};

export default PhoneDetails;
