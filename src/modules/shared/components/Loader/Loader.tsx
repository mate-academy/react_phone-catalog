/* eslint-disable prettier/prettier */

import styles from './Loader.module.scss';

const { loaderContainer, spinner } = styles;

export const Loader = () => {
  return (
    <div className={loaderContainer}>
      <div className={spinner} />
    </div>
  );
};
