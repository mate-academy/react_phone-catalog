import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import styles from './Navigation.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import './../../../i18n';

interface NavigationProp {
  modifier?: string | string[];
}

const getClassName = (modifier: string) =>
  styles[('nav_' + modifier) as keyof typeof styles] || '';

const Navigation: React.FC<NavigationProp> = ({ modifier }) => {
  const { t } = useTranslation();
  let navClasses = styles.nav;

  if (modifier) {
    navClasses +=
      ' ' +
      (Array.isArray(modifier)
        ? modifier.map(iconClass => getClassName(iconClass) || '').join(' ')
        : getClassName(modifier));
  }

  const getLinkClasses = ({ isActive }: NavLinkRenderProps) =>
    cn(styles.item, {
      [styles.item__active]: isActive,
    });

  return (
    <nav className={navClasses}>
      <NavLink className={getLinkClasses} to="/" end>
        {t('nav.home')}
      </NavLink>
      <NavLink className={getLinkClasses} to="/phones">
        {t('nav.phones')}
      </NavLink>
      <NavLink className={getLinkClasses} to="/tablets">
        {t('nav.tablets')}
      </NavLink>
      <NavLink className={getLinkClasses} to="/accessories">
        {t('nav.accessories')}
      </NavLink>
    </nav>
  );
};

export default Navigation;
