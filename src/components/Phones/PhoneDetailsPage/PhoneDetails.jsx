import React from 'react';
import { phoneDetailsPropType } from '../../../propTypesConstants';
import { PageNotFound } from '../../PageNotFound/PageNotFound';
import favoriteIcon from '../../../assets/images/icons/favorite-icon.svg';
import './PhoneDetails.scss';
import './slider.scss';
import './order.scss';
import { Slider } from './Slider';

export const PhoneDetails = (props) => {
  const { details, itemPrice } = props;

  if (details === null) {
    return null;
  }

  if (details === undefined) {
    return <PageNotFound />;
  }

  return (
    <div className="phoneDetails">
      <p>PhonesDetails</p>
      <h1 className="phoneDetails__title">{details.name}</h1>
      <div className="phoneDetails__heading">
        <Slider details={details} />
        <div className="phoneDetails__order order">
          <div className="order__colors">
            <p className="order__colors-heading">Available colors</p>
            <ul className="order__colors-list">
              <li className="order__colors-item">
                <button
                  className="order__colors-button"
                  type="button"
                />
              </li>
              <li className="order__colors-item">
                <button
                  className="order__colors-button colors__button--1"
                  type="button"
                />
              </li>
              <li className="order__colors-item">
                <button
                  className="order__colors-button colors__button--2"
                  type="button"
                />
              </li>
              <li className="order__colors-item">
                <button
                  className="order__colors-button colors__button--3"
                  type="button"
                />
              </li>
            </ul>
          </div>
          <div className="order__capacity">
            <p className="order__capacity-heading">Select capacity</p>
            <button
              className="order__capacity-button"
              type="button"
            >
              64 GB
            </button>
            <button
              className="order__capacity-button"
              type="button"
            >
              256 GB
            </button>
            <button
              className="order__capacity-button"
              type="button"
            >
              512 GB
            </button>
          </div>
          <p className="order__price">
            <span className="order__price-new">{`$${itemPrice}`}</span>
            <span className="order__price-old">$299</span>
          </p>
          <div className="order__buttons">
            <button
              className="order__add-to-cart"
              type="button"
            >
              Add to cart
            </button>
            <button className="order__favorite" type="button">
              <img
                src={favoriteIcon}
                alt="favorite icon"
                className="order__favorite-icon"
              />
              {' '}
            </button>
          </div>
          <div className="order__product-details">
            <p className="product-details">
              <span className="product-details__title">Screen</span>
              <span className="product-details__value">
                {details.display.screenSize}
              </span>
            </p>
            <p className="product-details">
              <span className="product-details__title">Resolution</span>
              <span className="product-details__value">
                {details.display.screenResolution}
              </span>
            </p>
            <p className="product-details">
              <span className="product-details__title">Processor</span>
              <span className="product-details__value">
                {details.hardware.cpu}
              </span>
            </p>
            <p className="product-details">
              <span className="product-details__title">RAM</span>
              <span className="product-details__value">
                {details.storage.ram}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="additionalDetails">
        <div className="phoneDetails__about about">
          <h2 className="about__heading">About</h2>
          <h3 className="about__title">Description</h3>
          <p className="about__value">{details.description}</p>
          <h3 className="about__title">Additional features</h3>
          <p className="about__value">{details.additionalFeatures}</p>
        </div>
        <div className="phoneDetails__tech-specs tech-specs">
          <h2 className="tech-specs__heading">Tech specs</h2>
          <p className="product-details">
            <span className="product-details__title">Screen</span>
            <span className="product-details__value">
              {details.display.screenSize}
            </span>
          </p>
          <p className="product-details">
            <span className="product-details__title">Resolution</span>
            <span className="product-details__value">
              {details.display.screenResolution}
            </span>
          </p>
          <p className="product-details">
            <span className="product-details__title">Processor</span>
            <span className="product-details__value">
              {details.hardware.cpu}
            </span>
          </p>
          <p className="product-details">
            <span className="product-details__title">RAM</span>
            <span className="product-details__value">
              {details.storage.ram}
            </span>
          </p>
          <p className="product-details">
            <span className="product-details__title">Built in memory</span>
            <span className="product-details__value">
              {details.storage.flash}
            </span>
          </p>
          <p className="product-details">
            <span className="product-details__title">Camera</span>
            <span className="product-details__value">
              {details.camera.primary}
            </span>
          </p>
          <p className="product-details">
            <span className="product-details__title">Cell</span>
            <span className="product-details__value">
              {details.connectivity.cell}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

PhoneDetails.propTypes = {
  details: phoneDetailsPropType.isRequired,
};
