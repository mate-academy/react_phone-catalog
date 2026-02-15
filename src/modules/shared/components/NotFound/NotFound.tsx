import React from 'react';
import '@/styles/main.scss';
import styles from './NotFound.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  imageUrl: string;
  message: string;
}

export const NotFound: React.FC<Props> = ({ imageUrl, message }) => {
  return (
    <div className={styles.not_found}>
      <img
        className={styles['not_found--image']}
        src={imageUrl.slice(1)}
        alt="404"
      />
      <p className={classNames(styles['not_found--text'], 'text__body')}>
        {message}
      </p>
      <Link
        className={classNames(styles['not_found--link'], 'text__body')}
        to="/"
      >
        Back to home
      </Link>
    </div>
  );
};
