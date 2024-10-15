import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import { SvgIcon } from '../../components/SvgIcon';

import styles from './Footer.module.scss';
import { RoundButton } from '../../components/RoundButton';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  interface ILink {
    title: string;
    path: string;
  }

  const links: ILink[] = [
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
