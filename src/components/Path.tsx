import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone } from '../interfaces';

interface Props {
  activePhone: Phone;
}

export const Path: React.FC<Props> = ({ activePhone }) => {
  return (
    <>
      <div className="path">
        <NavLink to="/">
          <img src="img/images/home/Home.png" alt="home-logo" />
          &nbsp;&nbsp;&#62;&nbsp;&nbsp;
        </NavLink>
        <NavLink to="/phones">
          Phones &nbsp;&nbsp;&#62;&nbsp;&nbsp;
        </NavLink>
        <NavLink className="grey" to={`${activePhone.id}`}>
          &nbsp;
          {activePhone.name}
        </NavLink>

      </div>
    </>
  );
};
