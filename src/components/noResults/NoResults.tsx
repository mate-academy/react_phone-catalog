import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NoResults.module.scss';

import { ReactComponent as Home } from '../../icons/Home.svg';
import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';

import { ReactComponent as ArrowLeft }
  from '../../icons/Chevron (Arrow Left).svg';

type Props = {
  title: string;
};

const NoResults: React.FC<Props> = ({ title }) => {
  const noSearchResults = 'There are no matching results';

  return (
    <section className={styles.noResults}>
      {title === 'Phone'
        ? (
          <>
            <div className={styles.nav}>
              <ArrowLeft className={styles.icon} />

              <Link className={styles.phones} to="/phones">
                <span className={styles.page}>Phones</span>
              </Link>
            </div>

            <h2 className="title">
              {`${title} was not found`}
            </h2>
          </>
        ) : (
          <>
            <div className={styles.nav}>
              <Link to="/">
                <Home className={styles.icon} />
              </Link>

              <ArrowRight className={styles.icon} />

              <span className={styles.page}>{`${title}`}</span>
            </div>

            <h2 className="title">
              {title === 'Phones'
                ? noSearchResults
                : `${title} not found`}
            </h2>
          </>
        )}
    </section>
  );
};

export default NoResults;
