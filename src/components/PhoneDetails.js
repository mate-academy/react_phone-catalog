import React from 'react';
import PropTypes from 'prop-types';

class PhoneDetails extends React.Component {
  state = {
    imageNumber: 0,
  }

  switchImage = (index) => {
    this.setState({ imageNumber: index });
  }

  render() {
    const { details } = this.props;
    const { imageNumber } = this.state;

    return (
      <div>
        <h2>{details.name}</h2>

        <p>{details.description}</p>

        <img src={details.images[imageNumber]} alt="phone" />

        <ul className="phone-thumbs">
          {details.images.map((image, index) => (
            <li key={image}>
              <img
                onClick={() => this.switchImage(index)}
                src={image}
                alt="phone"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

PhoneDetails.propTypes = {
  details: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default PhoneDetails;
