import { NavLink } from 'react-router-dom';
import styles from './nav-link.module.scss';
import classNames from 'classnames';
import { NavLinkProps } from '@shared/types';

type Props = {
  data: NavLinkProps;
};

export const NavigationLink: React.FC<Props> = ({ data }) => {
  const { title, path, ariaLabel } = data;

  const getClassName = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['nav-item__link'], {
      [styles['nav-item__link--active']]: isActive,
    });

  return (
    <li className={`${styles['nav-item']}`}>
      <NavLink className={getClassName} to={path} aria-label={ariaLabel}>
        {title}
      </NavLink>
    </li>
  );
};
