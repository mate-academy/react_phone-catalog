import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Header/Logo.svg';
import { useProduct } from '../../store/Store';

const Logo: React.FC = () => {
  const { handleClose } = useProduct();

  return (
    <Link to="/" className="logo footer__logo" onClick={handleClose}>
      <img src={logo} alt="Logo" className="logo__img" />
    </Link>
  );
};

export default Logo;
