import { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  HandleIsMenuActiveContext,
} from '../../contexts/HandleIsMenuActiveContext';

export const Logo = () => {
  const setIsMenuActive = useContext(HandleIsMenuActiveContext);

  const onClick = () => setIsMenuActive(false);

  return (
    <Link
      to="/"
      className="logo header__logo"
      onClick={onClick}
    >
      <img
        src="./img/logo/logo.svg"
        alt="Logo"
        className="logo__image"
      />
    </Link>
  );
};
