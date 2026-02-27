import { NavLink, NavLinkRenderProps, useSearchParams } from 'react-router-dom';
import styles from './Navigation.module.scss';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import './../../../i18n';
import { getClassNames } from '../../../utils/classNames';

export type NavigationModifiers = 'mobileMenu';

interface NavigationProp {
  modifier?: NavigationModifiers;
}

const Navigation: React.FC<NavigationProp> = ({ modifier }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const navClasses = styles.nav + ' ' + getClassNames('nav_', modifier, styles);
  const getLinkClasses = ({ isActive }: NavLinkRenderProps) =>
    cn(styles.item, {
      [styles.item__active]: isActive,
    });

  return (
    <nav className={navClasses}>
      <NavLink className={getLinkClasses} to="/" end>
        {t('nav.home')}
      </NavLink>
      <NavLink
        className={getLinkClasses}
        to={{ pathname: '/phones', search: searchParams.toString() }}
      >
        {t('nav.phones')}
      </NavLink>
      <NavLink
        className={getLinkClasses}
        to={{ pathname: '/tablets', search: searchParams.toString() }}
      >
        {t('nav.tablets')}
      </NavLink>
      <NavLink
        className={getLinkClasses}
        to={{ pathname: '/accessories', search: searchParams.toString() }}
      >
        {t('nav.accessories')}
      </NavLink>
    </nav>
  );
};

export default Navigation;
