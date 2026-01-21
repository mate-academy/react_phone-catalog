import styles from './Path.module.scss';
import { Link, NavLink } from 'react-router-dom';
import home from './../../../../../public/img/icons/Home.svg';
import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  pathName: string;
};

const isLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.pathLink, { [styles.active]: isActive });
};

export const Path: FC<Props> = ({ pathName }) => {
  return (
    <div className={styles.path}>
      <Link to="/home" className={styles.home}>
        <img src={home} alt={home} />
      </Link>
      <div className={styles.pathName}>
        <p className={styles.pathArrow}>❯</p>
        <NavLink className={isLinkActive} to="/phones">
          {pathName}
        </NavLink>
      </div>
    </div>
  );
};
