import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './BackToTop.module.scss';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={classNames(styles.backToTop, {
        [styles.backToTop_visible]: isVisible,
      })}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <span className={styles.backToTop__text}>Back to top</span>
      <div className={styles.backToTop__arrow}>
        <img
          src="/img/icons/icon-up.png"
          alt="Up arrow"
          className={styles.backToTop__arrowIcon}
        />
      </div>
    </button>
  );
};
