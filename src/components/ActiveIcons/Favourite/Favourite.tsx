import React from 'react';
import './Favourite.scss';
import favourite from './../../../img/Icons/favourite.png';

const Favourite = () => {
  const number = 0;

  return (
    <div className="favourite">
      <div className="favourite__icon">
        <img src={favourite} alt="favourite__logo" className="favorite__img" />
        <div className="favourite__counter">{number}</div>
      </div>
    </div>
  );
};

export default Favourite;
