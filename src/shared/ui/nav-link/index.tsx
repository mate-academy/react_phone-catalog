import { NavLink } from 'react-router-dom';
import { NavigationItem } from '@shared/types/NavLinkProps';
import styles from './nav-link.module.scss';
import classNames from 'classnames';

type Props = {
  data: NavigationItem;
};

export const NavigationLink: React.FC<Props> = ({ data }) => {
  const { name, path, labelProp } = data;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['nav-item__link'], {
      [styles['nav-item__link--active']]: isActive,
    });

  return (
    <li className={`${styles['nav-item']}`}>
      <NavLink
        className={getLinkClass}
        to={path}
        aria-label={`Go to ${labelProp}`}
      >
        {name}
      </NavLink>
    </li>
  );
};
