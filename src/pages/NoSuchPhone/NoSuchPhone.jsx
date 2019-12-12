import React from 'react';
import { NavLink } from 'react-router-dom'

const NoSuchPhone = () => (
  <>
    <h1 className="heading heading--m no-such-phone__heading">No any data for this phone</h1>
    <img
      className="no-such-phone__img"
      src="https://i.kym-cdn.com/entries/icons/original/000/022/146/azazazazazazaz.jpg"
      alt="zhdun mem"
    />
    <NavLink
      className="link button button--home "
      to="/phones"
    >
      Watch phones
    </NavLink>
  </>
)

export default NoSuchPhone;
