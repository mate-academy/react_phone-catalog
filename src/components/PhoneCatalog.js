import React from 'react';
import { NavLink } from 'react-router-dom';

import url from './url';

const PhoneCatalog = ({ phones, addToCart }) => (
  <ul>
    {phones.map(phone => (
      <NavLink key={phone.id} to={`/phones/${phone.id}`}>
        <li>
          <img src={url + phone.imageUrl} alt="" />
          <h2>{phone.name}</h2>
          <p>{phone.snippet}</p>
          <button
            onClick={event => addToCart(phone, event)}
          >
            add to cart
          </button>
        </li>
      </NavLink>
    ))}
  </ul>
);

export default PhoneCatalog;
