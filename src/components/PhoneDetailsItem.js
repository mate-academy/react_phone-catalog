/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const PhoneDetailsItem = ({
  extraData,
  selectedPhoto,
  handleChoosePhoto,
  handleAddToCart,
}) => {
  const {
    name,
    description,
    images,
    id,
    camera,
    battery,
    hardware,
    sizeAndWeight,
  } = extraData;

  return (
    <>
      <div className="extra-details">
        <div className="extra-details-photo-selected">
          <img
            className="selected-photo"
            src={selectedPhoto}
            alt={selectedPhoto}
          />
        </div>
        <article>
          <span className="extra-details-title">{name}</span>
          <div className="extra-details-description">
            <span className="extra-details-text">{description}</span>
            <ul className="extra-details-photos">
              {images.map(imgItem => (
                <li key={imgItem}>
                  <img
                    onClick={handleChoosePhoto}
                    className="extra-details-photos-item"
                    src={imgItem}
                    alt={imgItem}
                    name={imgItem}
                  />
                </li>
              ))}
              <li key="add-to-cart">
                <img
                  onClick={handleAddToCart}
                  id={id}
                  className="extra-details-photos-item
                          extra-details-photos-item-cart-add "
                  src="./img/cart-add.png"
                  alt="add-to-cart"
                  title="Click for adding to cart "
                  name={id}
                />
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div className="extra-details-more-details">
        <section className="more-info">
          <h3>Camera</h3>
          <i>features:</i>
          {camera.features.map(i => (
            <span key={i}>{i}</span>
          ))}
          <p>
            <i>primary:</i>
            <span>{camera.primary}</span>
          </p>
        </section>

        <section className="more-info">
          <h3>Battery</h3>
          <i>standbyTime:</i>
          <span>{battery.standbyTime}</span>
          <p>
            <i>talkTime:</i>
            {battery.talkTime}
          </p>
          <p>
            <i>type:</i>
          </p>
          {battery.type}
        </section>

        <section className="more-info">
          <h3>Hardware</h3>
          <i>audioJack:</i>
          {hardware.audioJack}
          <p>
            <i>cpu:</i>
            {hardware.cpu}
          </p>
          <p>
            <i>usb:</i>
            {hardware.usb}
          </p>
        </section>

        <section className="more-info">
          <h3>Size and Weight</h3>
          <i>dimensions:</i>
          <>
            {sizeAndWeight.dimensions.map(d => (
              <span key={d}>{d}</span>
            ))}
          </>
          weight:
          {sizeAndWeight.weight}
        </section>
      </div>
    </>
  );
};

PhoneDetailsItem.propTypes = {
  extraData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string.isRequired,
    camera: PropTypes.shape({
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      primary: PropTypes.string.isRequired,
    }).isRequired,
    hardware: PropTypes.shape({
      audiJack: PropTypes.string,
      cpu: PropTypes.string.isRequired,
      usb: PropTypes.string.isRequired,
    }).isRequired,
    battery: PropTypes.shape({
      standbyTime: PropTypes.string.isRequired,
      talkTime: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    sizeAndWeight: PropTypes.shape({
      dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
      weight: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  selectedPhoto: PropTypes.string.isRequired,
  handleChoosePhoto: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default PhoneDetailsItem;
