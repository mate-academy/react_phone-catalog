/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';
//#endregion

//#region STYLES
const {
  notFoundPage,
  title,
  subtitle,
  linkButton,
} = styles;
//#endregion

export const NotFoundPage = () => {
  //#region RENDER
  return (
    <div className={notFoundPage}>
      <h1 className={title}>Page not found</h1>
      <p className={subtitle}>
        Looks like you&apos;ve got lost. The page you are looking for does not
        exist.
      </p>

      <Link to="/" className={linkButton}>
        Go to Home
      </Link>
    </div>
  );
  //#endregion
};
