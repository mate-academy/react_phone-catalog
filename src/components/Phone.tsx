import React, { FC } from 'react';

export const Phone: FC<Phone> = (phone) => (
  <div className="phone">
    <img className="phone__img" src={phone.imageUrl} alt="phoneImg" />
    <div className="phone__info">
      <h3 className="phone__name">{phone.name}</h3>
      <p className="phone__description">{phone.snippet}</p>
    </div>
  </div>
);
