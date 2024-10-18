import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { SvgIcon } from '../../components/SvgIcon';

import styles from './Footer.module.scss';
import { RoundButton } from '../../components/RoundButton';
import { scrollToTop } from '../../utils/utility';

export const Footer = () => {
  const links = [
    { title: 'Github', path: '#' },
    { title: 'Contacts', path: '#' },
    { title: 'Rights', path: '#' },
  ];

  return (
    <footer className={styles.footer}>
      <img className={styles.footer__logo} src={logo} alt="logo" />

      <ul className={styles.footer__list}>
        {links.map(link => (
          <li key={link.title} className={styles.footer__item}>
            <Link className={styles.footer__link} to={link.path}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.footer__container}>
        <p>Back to top</p>
        <RoundButton onClick={scrollToTop}>
          <SvgIcon type="arrow" />
        </RoundButton>
      </div>
    </footer>
  );
};
