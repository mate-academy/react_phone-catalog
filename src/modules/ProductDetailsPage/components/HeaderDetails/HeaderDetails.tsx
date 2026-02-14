import React from "react";
import { Link, useParams } from "react-router-dom";

import styles from './HeaderDetails.module.scss';

type Props = {
  title: string;
};

export const HeaderDetails: React.FC<Props> = ({title}) => {
  const { categoryName } = useParams();

  return (
    <div className={styles.header}>
      <Link to={`/${categoryName}`} className={styles.headerBackLink}>
        <img className={styles.headerLinkImage} src="src/assets/icons/arrow-left.svg"/>
        <span className={styles.headerLinkText}>Back</span>
      </Link>
      <h2 className={styles.headerTitle}>
        {title}
      </h2>
    </div>
  );
};
