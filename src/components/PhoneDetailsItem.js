/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const PhoneDetailsItem = ({
  extraData,
  selectedPhoto,
  handleChoosePhoto,
  handleAddToCart,
}) => (
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
        <span className="extra-details-title">{extraData.name}</span>
        <div className="extra-details-description">
          <span className="extra-details-text">
            {extraData.description}
          </span>
          <ul className="extra-details-photos">
            {extraData.images.map(img => (
              <li key={img}>
                <img
                  onClick={handleChoosePhoto}
                  className="extra-details-photos-item"
                  src={img}
                  alt={img}
                  name={img}
                />
              </li>
            ))}
            <li key="add-to-cart">
              <img
                onClick={handleAddToCart}
                id={extraData.id}
                className="extra-details-photos-item
                        extra-details-photos-item-cart-add "
                src="./img/cart-add.png"
                alt="add-to-cart"
                title="Click for adding to cart "
                name={extraData.id}
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
        {extraData.camera.features.map(i => (
          <span key={i}>{i}</span>
        ))}
        <p>
          <i>primary:</i>
          <span>{extraData.camera.primary}</span>
        </p>
      </section>

      <section className="more-info">
        <h3>Battery</h3>
        <i>standbyTime:</i>
        <span>{extraData.battery.standbyTime}</span>
        <p>
          <i>talkTime:</i>
          {extraData.battery.talkTime}
        </p>
        <p>
          <i>type:</i>
        </p>
        {extraData.battery.type}
      </section>

      <section className="more-info">
        <h3>Hardware</h3>
        <i>audioJack:</i>
        {extraData.hardware.audioJack}
        <p>
          <i>cpu:</i>
          {extraData.hardware.cpu}
        </p>
        <p>
          <i>usb:</i>
          {extraData.hardware.usb}
        </p>
      </section>

      <section className="more-info">
        <h3>Size and Weight</h3>
        <i>dimensions:</i>
        <>
          {extraData.sizeAndWeight.dimensions.map(d => (
            <span key={d}>{d}</span>
          ))}
        </>
        weight:
        {extraData.sizeAndWeight.weight}
      </section>
    </div>
  </>
);

PhoneDetailsItem.propTypes = {
  extraData: PropTypes.shape({
    sizeAndWeight: PropTypes.object.isRequired,
    hardware: PropTypes.object.isRequired,
    battery: PropTypes.object.isRequired,
    camera: PropTypes.object.isRequired,
  }).isRequired,
  selectedPhoto: PropTypes.string.isRequired,
  handleChoosePhoto: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default PhoneDetailsItem;
