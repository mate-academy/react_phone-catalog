import React, { FC, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Favourites.css';

import { PhoneCard } from '../PhoneCard/PhoneCard';

interface StateProps {
  phonesFavourite: string[];
  phones: PhonesWithDetails[];
}

export const FavouritesTemplate: FC<StateProps> = ({
  phonesFavourite, phones,
}) => {
  const favouriteList = useMemo(() => {
    return phones.filter(phone => phonesFavourite.includes(phone.phoneId));
  }, [phonesFavourite, phones]);

  return (
    <div className="favourites__container">
      <div className="phones__path">
        <NavLink
          to="/"
          className="home-icon__link"
          exact
        >
          <img src="./img/Home.png" alt="home_icon" className="home-icon" />
        </NavLink>
        <img
          src="./img/Chevron.png"
          alt="arrow_icon"
          className="arrow-icon"
        />
        <span className="phones__path-title">Favourites</span>
      </div>
      <h2 className="phones__heding">Favourites</h2>
      <p className="phones__quantity">{`${phonesFavourite.length} items`}</p>
      <div className="phones__catalog">
        {favouriteList.map(phone => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  phonesFavourite: state.phonesFavourite,
  phones: state.phones,
});

export const Favourites = connect<StateProps, null, {}, State>(
  mapStateToProps, null,
)(FavouritesTemplate);
