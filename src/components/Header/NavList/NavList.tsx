import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import style from './NavList.module.scss';

export const NavList = () => {
  const { t } = useContext(LanguageContext);

  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {['Home', 'Phones', 'Tablets', 'Accessories'].map(item => (
          <li className={style.nav__item} key={item}>
            <a href="#" className={style.nav__link}>
              {t(`${item.toLowerCase()}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
