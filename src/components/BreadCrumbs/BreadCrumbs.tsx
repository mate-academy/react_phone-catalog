/* eslint-disable max-len */
import { Link, useLocation } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';
import home from '../../assets/images/header/Home.png';

const BreadCrumbs = () => {
  const location = useLocation();
  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      const upperCrumb = crumb
        .split('-')
        .map(el => el[0].toUpperCase() + el.slice(1))
        .join(' ');

      return (
        <div className={styles.crumb} key={crumb}>
          <Link to={currentLink} className={styles.crumbLink}>
            {upperCrumb}
          </Link>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.arrow}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
            ></path>
          </svg>
        </div>
      );
    });

  return (
    <div className={styles.crumbs}>
      <div className={styles.crumb}>
        <Link to="/" className={styles.crumbLink}>
          <img src={home} alt="" className={styles.home} />
        </Link>
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.arrow}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
          ></path>
        </svg>
      </div>
      {crumbs}
    </div>
  );
};

export default BreadCrumbs;
