import styles from './PageNotFound.module.scss';
import { NavLink } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <h3>404</h3>
        <p>Oops! The page you are looking for could not be found</p>
        <NavLink className={styles.link} to="/">
          <p>Go back to Home</p>
        </NavLink>
      </div>
    </div>
  );
};
