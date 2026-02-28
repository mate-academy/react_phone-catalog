import styles from './Path.module.scss';
import { Link, NavLink } from 'react-router-dom';
import home from './../../../../../public/img/icons/Home.svg';
import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  pathName: string;
  nameOfProduct?: string;
  cart?: boolean;
};

const isLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.pathLink, { [styles.active]: isActive });
};

export const Path: FC<Props> = ({ pathName, nameOfProduct, cart }) => {
  return (
    <>
      {!cart && (
        <div className={styles.path}>
          <Link to="/" className={styles.home}>
            <img src={home} alt={home} />
          </Link>

          <div className={styles.pathName}>
            <p className={styles.pathArrow}>❯</p>
            <NavLink className={isLinkActive} to={`/${pathName}`}>
              {pathName}
            </NavLink>
          </div>

          {nameOfProduct && (
            <div className={styles.pathName}>
              <p className={styles.pathArrow}>❯</p>
              <NavLink className={styles.link} to={`/${nameOfProduct}`}>
                {nameOfProduct}
              </NavLink>
            </div>
          )}
        </div>
      )}
      {nameOfProduct && (
        <div className={styles.pathName}>
          <p className={styles.pathArrowBack}>❮</p>
          <NavLink className={styles.linkBack} to={`/${pathName}`}>
            Back
          </NavLink>
        </div>
      )}
    </>
  );
};
