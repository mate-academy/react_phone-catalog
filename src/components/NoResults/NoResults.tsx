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
    <>
      {(title === 'Accessories' || title === 'Tablets') ? (
        <section className={styles.noResults}>
          <div className={styles.nav}>
            <Link to="/">
              <HomeIcon />
            </Link>

            <ArrowRight />

            <span className={styles.page}>{`${title}`}</span>
          </div>

          <div className={styles.notablets}>
            <div className={styles.notablets__text}>
              {`${title} are out of stock :(`}
            </div>
            <Link
              to="/"
              className={styles.nnotablets__link}
            >
              <button
                type="button"
                className={styles.notablets__button}
              >
                Go shoping
              </button>
            </Link>
          </div>
        </section>
      ) : (
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
                  {title === 'phones'
                    ? noSearchResults
                    : `${title} not found`}
                </h1>
              </>
            )}
        </section>
      )}
    </>
  );
};
