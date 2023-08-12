import { FC } from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

type Props = {
  onMenuClicked?: (isMenuClicked: boolean) => void;
};

export const Logo: FC<Props> = ({ onMenuClicked }) => {
  const handleLogoClick = () => {
    if (onMenuClicked) {
      onMenuClicked(false);
    }
  };

  return (
    <Link
      to="/"
      className="logo"
      onClick={handleLogoClick}
    >
      <img
        src="_new/img/icons/logo.svg"
        alt="Logo"
        className="logo__image"
      />
    </Link>
  );
};

Logo.defaultProps = {
  onMenuClicked: () => {},
};
