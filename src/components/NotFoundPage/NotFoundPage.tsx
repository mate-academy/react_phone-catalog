import React from "react";
import PageNotFound from '../../../public/img/page-not-found.png';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.not_found_page}>
      <img src={PageNotFound} alt="Page not found" />
      <h1>{"Page not found :("}</h1>
    </div>
  )
}
