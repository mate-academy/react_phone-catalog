import { Link } from "react-router-dom";

import styles from './CartHeader.module.scss';

export const CartHeader = () => {
  return (
    <div className={styles.header}>
      <Link to={`/`} className={styles.headerBackLink}>
        <img className={styles.headerLinkImage} src="src/assets/icons/arrow-left.svg"/>
        <span className={styles.headerLinkText}>Back</span>
      </Link>
      <h1 className={styles.headerTitle}>
        Cart
      </h1>
    </div>
  );
};