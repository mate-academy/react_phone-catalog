import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import styles from './GoBackButton.module.scss';
import arrowLeftLight from '../../images/icon-left-light-theme.svg';
import arrowLeftDark from '../../images/icon-left-dark-theme.svg';

interface Props {
  title: string;
  link?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

export const GoBackButton: React.FC<Props> = ({
  title,
  link,
  onClick,
  className,
  iconClassName,
}) => {
  const { theme } = useAppSelector(state => state.theme);

  const combinedClassName = `${styles.back} ${className || ''}`;
  const iconClass = `${styles.backIcon} ${iconClassName || ''}`;

  if (link) {
    return (
      <div className={combinedClassName} onClick={onClick}>
        <img
          src={theme === 'light' ? arrowLeftLight : arrowLeftDark}
          alt="Arrow Back"
          className={iconClass}
        />
        <Link to={link} className={`${styles.link} ${className || ''}`}>
          {title}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={combinedClassName}
      onClick={onClick}
      role="button"
      aria-label="Go Back"
    >
      <img
        src={theme === 'light' ? arrowLeftLight : arrowLeftDark}
        alt="Arrow Back"
        className={iconClass}
      />
      <span className={`${styles.link} ${className || ''}`}>{title}</span>
    </div>
  );
};
