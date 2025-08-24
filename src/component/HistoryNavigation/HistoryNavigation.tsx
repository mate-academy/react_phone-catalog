import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import styles from './HistoryNavigation.module.scss';

export const HistoryNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const canGoBack = window.history.state?.idx > 0;
  const canGoForward =
    window.history.length > (window.history.state?.idx || 0) + 1;

  return (
    <div className={styles.navigationContainer}>
      <button
        type="button"
        onClick={handleGoBack}
        className={classNames(styles.navArrow, {
          [styles.disabled]: !canGoBack,
        })}
        disabled={!canGoBack}
        aria-label="Повернутися назад"
      >
        <img src={ArrowLeftIcon} alt="Go back" />
      </button>

      <span className={styles.navText}> Move </span>

      <button
        type="button"
        onClick={handleGoForward}
        className={classNames(styles.navArrow, {
          [styles.disabled]: !canGoForward,
        })}
        disabled={!canGoForward}
        aria-label="Перейти вперед"
      >
        <img src={ArrowRightIcon} alt="Go forward" />
      </button>
    </div>
  );
};
