import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/mainNavigation.module.scss';
import classNames from 'classnames';
import { UINavLinkType } from '@widgets/header/model';

type Props = {
  link: UINavLinkType;
};

// I have used regular Link here due to troubles with use of "isActive" in aria-current prop
export const UINavLink = ({ link }: Props) => {
  const { path, ariaLabel } = link;
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <li className={`${styles['nav-item']}`}>
      <Link
        className={classNames(styles['nav-item__link'], {
          [styles['nav-item__link--active']]: active,
        })}
        to={path}
        aria-label={ariaLabel}
        {...(active && { 'aria-current': 'page' })}
      >
        {link.title}
      </Link>
    </li>
  );
};
