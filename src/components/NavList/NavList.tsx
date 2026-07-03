//#region imports
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  categories,
  categoriesLinks,
} from '../../modules/shared/constants/categories';
import styles from './NavList.module.scss';
//#endregion

export const NavList = () => {
  const { t } = useTranslation('header');
  const { t: tCategories } = useTranslation('categories');

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, {
      [styles.active]: isActive,
    });

  return (
    <ul className={styles.navList}>
      <li key="home">
        <NavLink to="/" className={getLinkClass}>
          {t('home')}
        </NavLink>
      </li>

      {categories.map(category => (
        <li key={category}>
          <NavLink to={categoriesLinks[category]} className={getLinkClass}>
            {tCategories(`categories.${category}`)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
