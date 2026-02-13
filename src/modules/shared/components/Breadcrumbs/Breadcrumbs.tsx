import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { FiHome } from 'react-icons/fi';

const Breadcrumbs: React.FC<{ currentProduct?: string }> = ({
  currentProduct = '',
}) => {
  const { pathname } = useLocation();
  const [firstPath, secondPath] = pathname.slice(1).split('/');

  return (
    <div className={styles.links}>
      <Link to="/" className={styles.links__home}>
        <FiHome />
      </Link>
      {secondPath ? (
        <>
          <div className={styles.links__icon}>
            <IoIosArrowBack />
          </div>

          <Link to={`../${firstPath}`} className={styles.links__link}>
            {firstPath[0].toUpperCase() + firstPath.slice(1)}
          </Link>
          {currentProduct && (
            <>
              <div className={styles.links__icon}>
                <IoIosArrowBack />
              </div>
              <div className={styles.links__current}>{currentProduct}</div>
            </>
          )}
        </>
      ) : (
        <>
          <div className={styles.links__icon}>
            <IoIosArrowBack />
          </div>
          <div className="">
            {firstPath[0].toUpperCase() + firstPath.slice(1)}
          </div>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
