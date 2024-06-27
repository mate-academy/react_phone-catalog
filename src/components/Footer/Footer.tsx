import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';
import { getButtonSecondaryClass } from '../../utils/utils';

export const Footer = () => {
  const { darkTheme } = useContext(ProductContext);
  const buttonClass = `${styles.buttonBack__arrow} button--small ${getButtonSecondaryClass(darkTheme)}`;
  const getLinkClass = classNames(`${styles.link} link--underline`, {
    [styles.link__darkTheme]: darkTheme,
  });
  const getLogoLink = darkTheme ? 'img/logo--white.png' : 'img/logo--dark.png';
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={classNames(`${styles.container}`, {
        darkTheme: darkTheme,
      })}
    >
      <Link to="/" className={`${styles.logo} hover--scale`}>
        <img src={getLogoLink} alt="logo" className={styles.logo_img} />
      </Link>
      <ul className={styles.nav}>
        <li>
          <Link
            to="https://github.com/TetianaBukhenko"
            className={getLinkClass}
          >
            GITHUB
          </Link>
        </li>
        <li>
          <Link to="/" className={getLinkClass}>
            CONTACTS
          </Link>
        </li>
        <li>
          <Link to="/" className={getLinkClass}>
            RIGHTS
          </Link>
        </li>
      </ul>

      <div className={styles.buttonBack} onClick={handleButtonClick}>
        <p className={`${styles.link} link--underline`}>Back to top</p>
        <Link to="#">
          <button className={buttonClass}>
            <div className=" icon icon--arrow"></div>
          </button>
        </Link>
      </div>
    </div>
  );
};
