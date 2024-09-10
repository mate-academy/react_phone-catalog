import React from 'react';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import styles from './NotFoundPage.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const NotFoundPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const { previousCurrentPage } = useAppContext();

  return (
    <div>
      <PreviousPage category={category} />
      <div className={styles.cartPage}>
        <div className={styles.topContainer}>
          <div className={styles.topLeft}>
            <button className={styles.goBackButton}>
              <img
                src={chevronIcon}
                alt="home"
                className={styles.chevronIcon}
              />
              <div className={styles.goBackText}>
                <Link to={`/${previousCurrentPage[0]}`}>
                  <div className={styles.label}>Back</div>
                </Link>
              </div>
            </button>
          </div>

          <h1 className={styles.title}>Page not found</h1>
        </div>

        <div className={styles.emptyContainer}>
          <img
            src="img/page-not-found.png"
            className={styles.image}
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};
