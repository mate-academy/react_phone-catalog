import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NoResults.module.scss';
import { HomeIcon } from '../../assets/icons/home-icon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { ArrowLeft } from '../../assets/icons/ArrowLeft';

type Props = {
  title: string;
};

export const NoResults: React.FC<Props> = ({ title }) => {
  const noSearchResults = 'There are no matching results';

  return (
    <section className={styles.noResults}>
      {title === 'Phone'
        ? (
          <>
            <div className={styles.nav}>
              <ArrowLeft />

              <Link className={styles.phones} to="/phones">
                <span className={styles.page}>Phones</span>
              </Link>
            </div>

            <h1 className="title">
              {`${title} was not found`}
            </h1>
          </>
        ) : (
          <>
            <div className={styles.nav}>
              <Link to="/">
                <HomeIcon />
              </Link>

              <ArrowRight />

              <span className={styles.page}>{`${title}`}</span>
            </div>

            <h1 className="title">
              {title === 'Phones'
                ? noSearchResults
                : `${title} not found`}
            </h1>
          </>
        )}
    </section>
  );
};
