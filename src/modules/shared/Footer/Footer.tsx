import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../img/Logo.png';
import styles from './Footer.module.scss';
import IconHeart from '../../../img/icons/icon-heart.png';
import IconCart from '../../../img/icons/icon-shopping-cart.png';
import IconArrowToTop from '../../../img/icons/icon-arrow-to-top.png';
import { useContext } from 'react';
import { GlobalContext } from '../../../store/GlobalContext';
import classNames from 'classnames';

const links = [
  { website: 'Github', url: 'https://github.com/Serhii-Khobotov' },
  {
    website: 'Contacts',
    url: 'https://www.linkedin.com/in/serhii-khobotov-6887b8302/',
  },
  { website: 'Rights', url: '/rights' },
];

export const Footer = () => {
  const { isMenuClose } = useContext(GlobalContext);
  const getLinkActive = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.footer__navbar_link, {
      [styles.activeFooterLink]: isActive,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        {isMenuClose ? (
          <div className={styles.footer__main_content}>
            <Link to="/" className={styles.footer__logo}>
              <img src={Logo} alt="Logo" />
            </Link>

            <nav className={styles.footer__navbar}>
              <ul className={styles.footer__navbar_list}>
                {links.map(({ website, url }) => (
                  <li key={website} className={styles.footer__navbar_item}>
                    <a
                      href={url}
                      target="_blank"
                      className={styles.footer__navbar_link}
                    >
                      {website}
                    </a>
                )
                ))}
              </ul>
            </nav>

            <label htmlFor="backToTop" className={styles.footer__arrow_content}>
              Back to top
              <Link to="/" className={styles.footer__backToTop}>
                <img
                  id="backToTop"
                  src={IconArrowToTop}
                  alt="Icon-arrow-to-top"
                />
              </Link>
              {/* <a href="#header" className={styles.footer__backToTop}>
                <img id="backToTop" src={IconArrowToTop} alt="Icon-arrow-to-top" />
              </a> */}
            </label>
          </div>
        ) : (
            <div className={styles.footer__icons}>
              <Link
                className={classNames(styles.footer__icon, {
                  { [styles.footer__icon_heart]: true }
                )}
                to="/"
              >
                <img src={IconHeart} alt="Icon-heart" />
              </Link>
              <Link
                className={classNames(styles.footer__icon, {
                  { [styles.footer__icon_cart]: true }
                )}
                to="/"
              >
                <img src={IconCart} alt="Icon-cart" />
              </Link>
            </div>
          )}
      </div>
    </footer>
  );
};
