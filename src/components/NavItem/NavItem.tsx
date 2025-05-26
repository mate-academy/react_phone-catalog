import classNames from 'classnames';
import styles from './NavItem.module.scss';
import { RoutesLink } from '../../types/routes';
import { TransitionNavLink } from '../TransitionNavLink';

interface Props {
  name: string;
  path: RoutesLink;
  onClick?: () => void;
}

export const styledActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.navLink, {
    [styles.active]: isActive,
  });
};

export const NavItem: React.FC<Props> = ({ name, path, onClick }) => {
  return (
    <li onClick={onClick}>
      <TransitionNavLink to={path} className={styledActive}>
        {name}
      </TransitionNavLink>
    </li>
  );
};
