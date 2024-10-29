import { Link } from 'react-router-dom';
import { SvgIcon } from '../../components/SvgIcon';

import styles from './Footer.module.scss';
import { RoundButton } from '../../components/RoundButton';
import { scrollToTop } from '../../utils/utility';
import { Logo } from '../../components/Logo';

export const Footer = () => {
  const links = [
    { title: 'Github', path: '#' },
    { title: 'Contacts', path: '#' },
    { title: 'Rights', path: '#' },
  ];

  return (
    <footer className={styles.footer}>
      <Logo className={styles.footer__logo} />

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
