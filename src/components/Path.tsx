import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  name: string;
  typeOfDevices: string;
}

export const Path: React.FC<Props> = ({ name, typeOfDevices }) => {
  return (
    <>
      <div className="path">
        <NavLink to="/">
          <img src="img/images/home/Home.png" alt="home-logo" />
          &nbsp;&nbsp;&#62;&nbsp;&nbsp;
        </NavLink>
        <NavLink to={`/${typeOfDevices}s/`}>
          {`${typeOfDevices}s`}
          {' '}
          &nbsp;&nbsp;&#62;&nbsp;&nbsp;
        </NavLink>
        <p>{name}</p>
      </div>
    </>
  );
};
