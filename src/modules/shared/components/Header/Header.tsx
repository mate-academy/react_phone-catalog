import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/Logo.png';
// eslint-disable-next-line max-len
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';

const Header = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuClicked(true);

    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseMenu = () => {
    setIsMenuClicked(false);

    document.body.style.overflow = 'unset';
    document.body.style.height = '100vh';
  };

  return (
    <header className={styles.header}>
      <Link to="/" id="top">
        <img src={logo} alt="logo" className={styles.logo} />
      </Link>
      <Navbar
        isMenuClicked={isMenuClicked}
        onMenuClosed={handleCloseMenu}
        onMenuOpen={handleOpenMenu}
      />
      <div
        className={classNames(`${styles.menu}`, {
          [styles.menuActive]: isMenuClicked,
        })}
      >
        <Menu onMenuClosed={handleCloseMenu} />
      </div>
    </header>
  );
};

export default Header;
