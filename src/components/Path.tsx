import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  name: string;
  id: string;
}

export const Path: React.FC<Props> = ({ name, id }) => {
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
        <NavLink className="grey" to={`${id}`}>
          &nbsp;
          {name}
        </NavLink>

      </div>
    </>
  );
};
