import React, { FC, useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  loadPhone as loadPhoneStore,
  setFavouriteId as setFavouriteIdStore,
  deleteFavouriteId as deleteFavouriteIdStore,
} from '../../store/store';

import './PhoneDetailsPage.css';
import { MAIN_URL } from '../../utils/constants';

interface MatchParams {
  phoneId: string;
}

interface StateProps {
  phoneDetails: Details | null;
  phoneError: boolean;
  phonesFavourite: string[];
}

interface DispatchProps {
  loadPhone: (value: string) => void;
  setFavouriteId: (value: string) => void;
  deleteFavouriteId: (value: string) => void;
}

const PhoneDetailsPageTemplate: FC<
  RouteComponentProps<MatchParams> & StateProps & DispatchProps
> = ({
  phoneDetails,
  loadPhone,
  match,
  phoneError,
  setFavouriteId,
  phonesFavourite,
  deleteFavouriteId,
}) => {
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    loadPhone(match.params.phoneId);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const chooseMainImage = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, image: string) => {
      event.preventDefault();

      setMainImage(`${MAIN_URL}${image}`);
    },
    [mainImage],
  );

  const loadPhoneByColor = useCallback(
    (color: string) => {
      if (phoneDetails) {
        const tmpArr = phoneDetails.id.split('-');

        tmpArr.pop();
        tmpArr.push(color);
        const newId = tmpArr.join('-');

        loadPhone(newId);
        setMainImage('');
      }
    },
    [phoneDetails],
  );

  const loadPhoneByCapacity = useCallback(
    (capacity: string) => {
      if (phoneDetails) {
        const tmpArr = phoneDetails.id.split('-');

        tmpArr.splice(3, 1, `${parseInt(capacity, 10)}gb`);
        const newId = tmpArr.join('-');

        loadPhone(newId);
      }
    },
    [phoneDetails],
  );

  if (phoneError || !phoneDetails) {
    return (
      <>
        <div>Phone not found</div>
      </>
    );
  }

  return (
    <div className="phone__container">
      <div className="phones__path">
        <img src="./img/Home.png" alt="home_icon" className="home-icon" />
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">Phones</span>
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">{phoneDetails.name}</span>
      </div>
      <h2 className="phones__heding">{phoneDetails.name}</h2>
      <div className="phone__container-main">
        <div className="phone__images">
          <ul className="phone__images--list">
            {phoneDetails.images.map(image => (
              <li key={image} className="phone__images-item">
                <a
                  href="/"
                  className="phone__images-link"
                  onClick={(event) => chooseMainImage(event, image)}
                >
                  <img
                    src={`${MAIN_URL}${image}`}
                    alt="phone_small_img"
                    className="phone__images-img"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="phone__images--big">
            <img
              src={mainImage || `${MAIN_URL}${phoneDetails.images[0]}`}
              alt="phone_big_img"
              className="phone__images--big-img"
            />
          </div>
        </div>
        <div className="phone__main-info">
          <div className="phone__colors">
            <p className="main-info__title">Available colors</p>
            <div className="colors__color-list">
              {phoneDetails.colorsAvailable.map((color) => (
                <div
                  key={color}
                  className={color === phoneDetails.color
                    ? 'colors__color-active colors__color'
                    : 'colors__color'}
                >
                  <button
                    type="button"
                    style={{ backgroundColor: color }}
                    className="colors__color-item"
                    onClick={() => loadPhoneByColor(color)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="phone__capacity">
            <p className="main-info__title">Select capacity</p>
            <div className="capacity__capacity-list">
              {phoneDetails.capacityAvailable.map((capacity) => (
                <button
                  type="button"
                  key={capacity}
                  className={capacity === phoneDetails.capacity
                    ? 'capacity__capacity-active capacity__item'
                    : 'capacity__item'}
                  onClick={() => loadPhoneByCapacity(capacity)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="card__price price-discount">
              {`$${phoneDetails.priceDiscount}`}
            </span>
            <span className="card__price price-regular">
              {`$${phoneDetails.priceRegular}`}
            </span>
          </div>
          <div className="card__actions-details">
            <button
              type="button"
              className="card__button-cart button__cart-detail"
            >
              Add to cart
            </button>
            {!phonesFavourite.includes(phoneDetails.id)
              ? (
                <button
                  type="button"
                  className="card__button-favourite button__favourite-detail"
                  onClick={() => setFavouriteId(phoneDetails.id)}
                >
                  {/* eslint-disable-next-line max-len */}
                  <svg className="icon-card" width="18" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* eslint-disable-next-line max-len */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M100 34.976c0 8.434-3.635 16.019-9.423 21.274h0.048l-31.25 31.25c-3.125 3.125-6.25 6.25-9.375 6.25s-6.25-3.125-9.375-6.25l-31.202-31.25c-5.788-5.255-9.423-12.84-9.423-21.274 0-15.865 12.861-28.726 28.726-28.726 8.434 0 16.019 3.635 21.274 9.423 5.255-5.788 12.84-9.423 21.274-9.423 15.865 0 28.726 12.861 28.726 28.726z" fill="#fff" stroke="#2060f6" strokeWidth="6" />
                  </svg>
                </button>
              )
              : (
                <button
                  type="button"
                  className="card__button-favourite button__favourite-detail"
                  onClick={() => deleteFavouriteId(phoneDetails.id)}
                >
                  {/* eslint-disable-next-line max-len */}
                  <svg className="icon-card" width="18" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* eslint-disable-next-line max-len */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M100 34.976c0 8.434-3.635 16.019-9.423 21.274h0.048l-31.25 31.25c-3.125 3.125-6.25 6.25-9.375 6.25s-6.25-3.125-9.375-6.25l-31.202-31.25c-5.788-5.255-9.423-12.84-9.423-21.274 0-15.865 12.861-28.726 28.726-28.726 8.434 0 16.019 3.635 21.274 9.423 5.255-5.788 12.84-9.423 21.274-9.423 15.865 0 28.726 12.861 28.726 28.726z" fill="#2060f6" stroke="#2060f6" strokeWidth="6" />
                  </svg>
                </button>
              )}
          </div>
          <div className="card__details-main">
            <div className="card__detail">
              <span className="card__detail-name">Screen</span>
              <span className="card__detail-value">
                {phoneDetails.screen}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name">Resolution</span>
              <span className="card__detail-value">
                {phoneDetails.resolution}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name">Processor</span>
              <span className="card__detail-value">
                {phoneDetails.processor}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name">Ram</span>
              <span className="card__detail-value">
                {`${phoneDetails.ram
                  ? parseInt(phoneDetails.ram, 10)
                  : ''} ${phoneDetails.ram.slice(-2)}`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="phone__container-specification">
        <div className="phone__about">
          <h3 className="specification__heading">
            About
          </h3>
          <div className="specification__info">
            {phoneDetails.description.map(info => (
              <div key={info.title} className="specification__info-item">
                <h4 className="specification__info-heading">
                  {info.title}
                </h4>
                {info.text.map(text => (
                  <div key={text} className="specification__info-text">
                    {text}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="phone__description">
          <h3 className="specification__heading">
            Tech specs
          </h3>
          <div className="card__details-description">
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Screen
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.screen}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Resolution
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.resolution}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Processor
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.processor}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">Ram</span>
              <span className="card__detail-value specification__value">
                {`${phoneDetails.ram
                  ? parseInt(phoneDetails.ram, 10)
                  : ''} ${phoneDetails.ram.slice(-2)}`}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Capacity
              </span>
              <span className="card__detail-value specification__value">
                {`${phoneDetails.capacity
                  ? parseInt(phoneDetails.capacity, 10)
                  : ''
                } ${phoneDetails.capacity.slice(-2)}`}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Camera
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.camera}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Zoom
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.zoom}
              </span>
            </div>
            <div className="card__detail">
              <span className="card__detail-name specification__name">
                Cell
              </span>
              <span className="card__detail-value specification__value">
                {phoneDetails.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phoneDetails: state.phoneDetails,
  phoneError: state.phoneError,
  phonesFavourite: state.phonesFavourite,
});

const mapDispatchToProps = {
  setFavouriteId: setFavouriteIdStore,
  deleteFavouriteId: deleteFavouriteIdStore,
  loadPhone: loadPhoneStore,
};

export const PhoneDetailsPage = connect(
  mapStateToProps, mapDispatchToProps,
)(PhoneDetailsPageTemplate);
