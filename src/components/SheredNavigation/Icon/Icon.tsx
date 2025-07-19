import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Icon.module.scss';

type Props = {
  to: string;
  icon: string;
  iconActive?: string;
  alt: string;
  count?: number;
  isMobile?: boolean;
  isCard?: boolean;
  active?: boolean;
  containerClassName?: string;
  countClassName?: string;
  onClick?: () => void;
};

export const Icon: React.FC<Props> = ({
  to,
  icon,
  iconActive,
  alt,
  count = 0,
  isMobile = false,
  isCard = false,
  active,
  containerClassName = '',
  countClassName = '',
  onClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCurrentPage = location.pathname === to;
  const iconToShow =
    (isCard && active && iconActive) || (isCurrentPage && iconActive)
      ? iconActive
      : icon;
  const containerClass = classNames(
    styles.icon,
    {
      [styles.mobile]: isMobile,
      [styles.active]: isCurrentPage,
      [styles.card]: isCard,
    },
    containerClassName,
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isCard) {
      e.preventDefault();
      if (onClick) {
        onClick();
      }

      return;
    }

    e.preventDefault();
    if (onClick) {
      onClick();
    }

    setTimeout(() => {
      navigate(to);
    }, 300);
  };

  return (
    <Link
      to={to}
      className={containerClass}
      aria-label={alt}
      onClick={handleClick}
    >
      <img src={iconToShow} alt={alt} />

      {!isMobile && count > 0 && (
        <span
          className={classNames(
            styles.count,
            countClassName && styles[countClassName],
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
};
