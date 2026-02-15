import { Link } from 'react-router-dom';
import Logo from '../../../img/Logo.png';
import styles from './Footer.module.scss';
import IconArrowToTop from '../../../img/icons/icon-arrow-to-top.png';

const links = [
  { website: 'Github', url: 'https://github.com/Serhii-Khobotov' },
  {
    website: 'Contacts',
    url: 'https://www.linkedin.com/in/serhii-khobotov-6887b8302/',
  },
  { website: 'Rights', url: '/rights' },
];

export const Footer = () => {

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__main_content}>
          <Link to="home" className={styles.footer__logo}>
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
                    rel="noreferrer"
                  >
                    {website}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <label htmlFor="backToTop" className={styles.footer__arrow_content}>
            Back to top
            <button onClick={() => window.scroll(0, 0)} className={styles.footer__backToTop}>
              <img
                id="backToTop"
                src={IconArrowToTop}
                alt="Icon-arrow-to-top"
              />
            </button>
          </label>
        </div>
      </div>
    </footer>
  );
};
