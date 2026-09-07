import styles from './Footer.module.scss';
import Logo from '/public/icons/Logo.svg';
import LogoLight from '/public/icons/Logo_light.svg';
import { Link } from 'react-router-dom';
import { PagesPath } from '../../../types/PagesPath';
import { SliderButton } from '../SliderButton';
import { Arrow } from '../Icons/Arrow/Arrow';
import { useContext } from 'react';
import { ThemeContext } from '../../../store/ThemeProvider';
import classNames from 'classnames';

type NavLink = { title: string; path: string };

const links: NavLink[] = [
  { title: 'Github', path: '/' },
  { title: 'Contacts', path: '/' },
  { title: 'Rights', path: '/' },
];

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <footer
      className={classNames(styles.Footer, {
        [styles.Footer_darkTheme]: isThemeDark,
      })}
    >
      <div className={styles.Footer__content}>
        <Link to={PagesPath.Home} className={styles.Footer__logo}>
          <img src={isThemeDark ? LogoLight : Logo} alt="Logo" />
        </Link>

        <nav className={styles.Footer__nav}>
          <ul className={styles.Footer__list}>
            {links.map(link => (
              <li key={link.title} className={styles.Footer__item}>
                <a
                  href={link.path}
                  target="_blank"
                  className={styles.Footer__link}
                  rel="noreferrer"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.Footer__backTop}>
          <span>Back to top</span>

          <SliderButton onClick={scrollToTop}>
            <Arrow orientation="top" />
          </SliderButton>
        </div>
      </div>
    </footer>
  );
};
