import React from 'react';
import { phoneDetailsPropType } from '../../../propTypesConstants';
import { PageNotFound } from '../../PageNotFound/PageNotFound';
import './PhoneDetails.scss';
import './slider.scss';
import './order.scss';

export const PhoneDetails = (props) => {
  const { details } = props;

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
        <div className="phoneDetails__slider slider">
          <ul className="slider__list">
            {details.images.map(img => (
              <li
                key={img}
                className="slider__item"
              >
                <img
                  src={img}
                  alt="motorola-xoom"
                  className="slider__images"
                />
              </li>
            ))}
          </ul>
          <div className="slider__image">
            <img src={details.images[0]} alt="motorola-xoom" />
          </div>
        </div>
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
            <span className="order__price-new">$799</span>
            <span className="order__price-old">$899</span>
          </p>
        </div>
      </div>
      <p>{details.id}</p>

    </div>
  );
};

PhoneDetails.propTypes = {
  details: phoneDetailsPropType.isRequired,
};
