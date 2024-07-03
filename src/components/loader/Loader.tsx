import React, { useEffect, useState } from 'react';
import styles from './spiner.module.scss';
import video from './video/load.mp4';

const Loader: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      ),
    );
  }, []);

  return (
    <div className={styles['loader-container']}>
      <video autoPlay={!isMobile} muted loop className={styles['loader-video']}>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loader;
