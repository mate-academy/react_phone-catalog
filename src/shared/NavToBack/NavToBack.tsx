import './NavToBack.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NavToBack = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-to-back" onClick={() => navigate(-1)}>
      <div className="icon--arrow-left"></div>
      <p className="text-small secondary nav-to-back__text">Back</p>
    </div>
  );
};

export default NavToBack;
