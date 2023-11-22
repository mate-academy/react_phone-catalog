import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';

import './Logo.scss';

export const Logo: FC = () => {
  const { setIsMenuClicked } = useContext(PhoneCatalogContext);

  const handleLogoClick = () => {
    if (setIsMenuClicked) {
      setIsMenuClicked(false);
    }
  };

  return (
    <Link
      to="/"
      className="logo"
      onClick={handleLogoClick}
    >
      <img
        src="new/img/icons/logo.svg"
        alt="Logo"
        className="logo__image"
      />
    </Link>
  );
};
