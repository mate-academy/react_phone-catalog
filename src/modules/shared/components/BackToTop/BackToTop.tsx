import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './BackToTop.module.scss';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={classNames(styles.backToTop, {
        [styles.backToTop_visible]: isVisible,
      })}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
    >
      <img
        src="img/icons/icon-up.png"
        alt="Up arrow"
        className={styles.backToTop__arrowIcon}
      />
    </button>
  );
};
