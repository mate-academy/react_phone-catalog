import style from './Footer.module.scss';
import logo from '../../assets/img/logos/mainlogo.svg';

const navigation = [
  {
    href: 'https://github.com/Nazarin565/react_phone-catalog/',
    name: 'Github',
  },
  {
    href: '#',
    name: 'Contacts',
  },
  {
    href: '#',
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
            <a href={href} className={style.nav__link}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <a href="#" className={style.backToTop}>
      <p className={style.backToTop__text}>Back to top</p>
      <div className={style.backToTop__button} />
    </a>
  </footer>
);
