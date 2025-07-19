import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './BackToTopButton.module.scss';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 639);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button
      className={classNames(styles.button, {
        [styles.isVisible]: isVisible || isMobile,
        [styles.isMobile]: isMobile,
      })}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <span className={styles.text}>Back to top</span>
      <span className={styles.iconWrapper}>
        <span className={styles.icon}>^</span>
      </span>
    </button>
  );
};
