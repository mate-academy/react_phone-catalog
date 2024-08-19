import style from './Footer.module.scss';
import logo from '../../assets/img/logos/mainlogo.svg';
import { NavLink } from 'react-router-dom';

const navigation = [
  {
    href: 'https://github.com/Nazarin565/react_phone-catalog/',
    name: 'Github',
  },
  {
    href: '/contacts',
    name: 'Contacts',
  },
  {
    href: '/rights',
    name: 'Rights',
  },
];

export const Footer = () => (
  <footer className={style.footer}>
    <a href="#" className={style.logo__link}>
      <img src={logo} className={style.logo} />
    </a>
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {navigation.map(({ href, name }) => (
          <li key={name} className={style.nav__item}>
            <NavLink to={href} className={style.nav__link}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <button
      className={style.backToTop}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <p className={style.backToTop__text}>Back to top</p>
      <div className={style.backToTop__button} />
    </button>
  </footer>
);
