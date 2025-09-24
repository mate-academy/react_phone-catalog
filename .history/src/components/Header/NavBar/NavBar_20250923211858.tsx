import styles from './NavBar.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.link, { [styles.active]: isActive });

  return (
    <div className="">

    </div>
    
  );
};
