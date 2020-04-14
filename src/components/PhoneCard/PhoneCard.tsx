import React, { FC, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setFavouriteId as setFavouriteIdStore,
  deleteFavouriteId as deleteFavouriteIdStore,
} from '../../store/store';

import './PhoneCard.css';
import { getPhoneId } from '../../utils/constants';

interface Props {
  phone: PhonesWithDetails;
}

interface StateProps {
  phonesFavourite: string[];
}

interface DispatchProps {
  setFavouriteId: (value: string) => void;
  deleteFavouriteId: (value: string) => void;
}

export const PhoneCardTemplate: FC<Props & StateProps & DispatchProps> = ({
  phone,
  setFavouriteId,
  phonesFavourite,
  deleteFavouriteId,
}) => {
  const phoneID = useMemo(() => getPhoneId(phone.phoneId), []);

  return (
    <div className="card catalog__card">
      <img
        // eslint-disable-next-line max-len
        src={`https://alexandershpilka.github.io/phones_api/img/phones/${phoneID}/${phone.color}/00.jpg`}
        alt="phone_image"
        className="card__image"
      />
      <NavLink
        to={`/phones/${phone.phoneId}`}
        className="card__heading"
        activeClassName="card__heading"
        exact
      >
        {phone.name}
      </NavLink>
      <div>
        <span className="card__price price-discount">
          {`$${phone.priceDiscount}`}
        </span>
        <span className="card__price price-regular">
          {`$${phone.priceRegular}`}
        </span>
      </div>
      <div className="card__details">
        <div className="card__detail">
          <span className="card__detail-name">Screen</span>
          <span className="card__detail-value">
            {phone.screen}
          </span>
        </div>
        <div className="card__detail">
          <span className="card__detail-name">Capacity</span>
          <span className="card__detail-value">
            {`${phone.capacity
              ? parseInt(phone.capacity, 10)
              : ''
            } ${phone.capacity.slice(-2)}`}
          </span>
        </div>
        <div className="card__detail">
          <span className="card__detail-name">Ram</span>
          <span className="card__detail-value">
            {`${phone.ram
              ? parseInt(phone.ram, 10)
              : ''} ${phone.ram.slice(-2)}`}
          </span>
        </div>
      </div>
      <div className="card__actions">
        <button type="button" className="card__button-cart">Add to cart</button>
        {!phonesFavourite.includes(phone.phoneId)
          ? (
            <button
              type="button"
              className="card__button-favourite"
              onClick={() => setFavouriteId(phone.phoneId)}
            >
              {/* eslint-disable-next-line max-len */}
              <svg className="icon-card" width="16" height="14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* eslint-disable-next-line max-len */}
                <path fillRule="evenodd" clipRule="evenodd" d="M100 34.976c0 8.434-3.635 16.019-9.423 21.274h0.048l-31.25 31.25c-3.125 3.125-6.25 6.25-9.375 6.25s-6.25-3.125-9.375-6.25l-31.202-31.25c-5.788-5.255-9.423-12.84-9.423-21.274 0-15.865 12.861-28.726 28.726-28.726 8.434 0 16.019 3.635 21.274 9.423 5.255-5.788 12.84-9.423 21.274-9.423 15.865 0 28.726 12.861 28.726 28.726z" fill="#fff" stroke="#2060f6" strokeWidth="6" />
              </svg>
            </button>
          )
          : (
            <button
              type="button"
              className="card__button-favourite"
              onClick={() => deleteFavouriteId(phone.phoneId)}
            >
              {/* eslint-disable-next-line max-len */}
              <svg className="icon-card" width="16" height="14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* eslint-disable-next-line max-len */}
                <path fillRule="evenodd" clipRule="evenodd" d="M100 34.976c0 8.434-3.635 16.019-9.423 21.274h0.048l-31.25 31.25c-3.125 3.125-6.25 6.25-9.375 6.25s-6.25-3.125-9.375-6.25l-31.202-31.25c-5.788-5.255-9.423-12.84-9.423-21.274 0-15.865 12.861-28.726 28.726-28.726 8.434 0 16.019 3.635 21.274 9.423 5.255-5.788 12.84-9.423 21.274-9.423 15.865 0 28.726 12.861 28.726 28.726z" fill="#2060f6" stroke="#2060f6" strokeWidth="6" />
              </svg>
            </button>
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phonesFavourite: state.phonesFavourite,
});

const mapDispatchToProps = {
  setFavouriteId: setFavouriteIdStore,
  deleteFavouriteId: deleteFavouriteIdStore,
};

export const PhoneCard = connect(
  mapStateToProps, mapDispatchToProps,
)(PhoneCardTemplate);
