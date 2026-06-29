import React from 'react';
import Lottie from 'lottie-react';
import styles from './Loader.module.scss';
import animationData from '../../../public/api/Cat _loader.json';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.lottieContainer}>
        <Lottie animationData={animationData} loop={true} autoPlay={true} />
      </div>
    </div>
  );
};
