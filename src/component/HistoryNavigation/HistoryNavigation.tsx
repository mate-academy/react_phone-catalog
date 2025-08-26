import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import styles from './HistoryNavigation.module.scss';

export const HistoryNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <div className={styles.navigationContainer}>
      <button
        type="button"
        onClick={handleGoBack}
        className={classNames(styles.navArrow, {
          [styles.disabled]: !canGoBack,
        })}
        disabled={!canGoBack}
        aria-label="Go back"
      >
        <img src={ArrowLeftIcon} alt="Go back" />
      </button>

      <span className={styles.navText}>Move</span>

      <button
        type="button"
        onClick={handleGoForward}
        className={styles.navArrow}
        aria-label="Go forward"
      >
        <img src={ArrowRightIcon} alt="Go forward" />
      </button>
    </div>
  );
};
