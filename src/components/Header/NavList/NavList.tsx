import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import style from './NavList.module.scss';
import data from '../../../utils/NavList.json';
import { Link } from 'react-router-dom';
export const NavList = () => {
  const { t } = useContext(LanguageContext);

  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {data.map(item => (
          <li className={style.nav__item} key={item}>
            <Link to={item.toLocaleLowerCase()} className={style.nav__link}>
              {t(`${item.toLowerCase()}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
