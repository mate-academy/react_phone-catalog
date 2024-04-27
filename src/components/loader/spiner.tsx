import React from 'react';
import styles from './spiner.module.scss';
import video from './video/load.mp4';

const Loader: React.FC = () => (
  <div className={styles['loader-container']}>
    <video autoPlay muted loop className={styles['loader-video']}>
      <source src={video} type="video/mp4" />
    </video>
  </div>
);

export default Loader;
