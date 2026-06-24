import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import home from '/img/home.svg';
import arrow from '/img/arrow-grey.svg?url';
import React from 'react';
import { prettifyItemId } from '../../utils/utils';

type Props = {
  pathnameParts: string[];
};

export const Breadcrumbs: React.FC<Props> = ({ pathnameParts }) => {
  const breadcrumbs = pathnameParts.map((segment, index) => {
    const routeTo = '/' + pathnameParts.slice(0, index + 1).join('/');

    const isLast = index === pathnameParts.length - 1;

    return (
      <React.Fragment key={routeTo}>
        <img src={arrow} alt="arrow icon" className={styles.arrow}></img>

        {isLast ? (
          <span className={styles.lastSegment}>{prettifyItemId(segment)}</span>
        ) : (
          <Link to={routeTo} className={styles.segment}>
            {prettifyItemId(segment)}
          </Link>
        )}
      </React.Fragment>
    );
  });

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.home_link}>
        <img src={home} alt="home icon" className={styles.home} />
      </Link>

      {breadcrumbs}
    </div>
  );
};
