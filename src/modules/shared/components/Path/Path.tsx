import styles from './Path.module.scss';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import home from './../../../../../public/img/icons/Home.svg';
import { FC } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import arrowLeftWhite from './../../../../../public/img/icons/arrowLeftWhite.svg';

type Props = {
  pathName: string;
  nameOfProduct?: string;
  cart?: boolean;
};

const isLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames(styles.pathLink, { [styles.active]: isActive });
};

export const Path: FC<Props> = ({ pathName, nameOfProduct, cart }) => {
  const navigate = useNavigate();

  return (
    <>
      {!cart && (
        <div className={styles.path}>
          <Link to="/" className={styles.home}>
            <img src={home} alt={home} />
          </Link>

          <div className={styles.pathName}>
            <p className={styles.pathArrow}>
              <img src={arrowLeftWhite} alt="arrowLeftWhite" />
            </p>
            <NavLink
              className={isLinkActive}
              to={pathName === 'Home' ? '/' : `/${pathName}`}
            >
              {pathName}
            </NavLink>
          </div>

          {nameOfProduct && (
            <div className={styles.pathName}>
              <p className={styles.pathArrow}></p>
              <NavLink className={styles.link} to={`/${nameOfProduct}`}>
                {nameOfProduct}
              </NavLink>
            </div>
          )}
        </div>
      )}
      {nameOfProduct && (
        <div className={styles.pathName}>
          <p className={styles.pathArrowBack}>
            <img src={arrowLeftWhite} alt="arrowLeftWhite" />
          </p>
          <button className={styles.linkBack} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      )}
    </>
  );
};
