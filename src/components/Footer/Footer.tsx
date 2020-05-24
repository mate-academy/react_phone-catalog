import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';
import { Nav } from '../Nav';
import { Icon } from '../Icon';
import { footerLinks } from '../../helpers';

export const Footer = () => {
  const handleScroll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  };

  return (
    <footer className="Footer">
      <div className="Footer__Content container">
        <Link to="/" className="Footer__Logo">
          <img src="./images/logo.svg" alt="Logo" />
        </Link>
        <Nav links={footerLinks} />
        <Link
          to="#top"
          className="Footer__Link"
          onClick={handleScroll}
        >
          Back to top
          <Icon
            name="arrow-up"
            size={2}
            border
            inActive={false}
          />
        </Link>

      </div>
    </footer>
  );
};
