import React from 'react';
import cn from 'classnames';
import styles from './Badge.module.scss';

interface BadgeProps {
  badgeContent?: number | string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  variant?: 'standard' | 'dot';
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  badgeContent,
  color = 'error',
  variant = 'standard',
  max = 99,
  showZero = false,
  invisible = false,
  children,
  className,
}) => {
  const shouldShowBadge =
    !invisible &&
    badgeContent !== undefined &&
    ((typeof badgeContent === 'number' && (badgeContent > 0 || showZero)) ||
      (typeof badgeContent === 'string' &&
        ((badgeContent !== '' && badgeContent !== '0') || showZero)));

  const displayContent = React.useMemo(() => {
    if (variant === 'dot') {
      return '';
    }

    if (typeof badgeContent === 'number' && max && badgeContent > max) {
      return `${max}+`;
    }

    return badgeContent;
  }, [badgeContent, max, variant]);

  const badgeClasses = cn(
    styles.badge,
    styles[`badge--${color}`],
    styles[`badge--${variant}`],
    className,
  );

  return (
    <span className={styles.badgeRoot}>
      {children}
      {shouldShowBadge && (
        <span className={badgeClasses}>{displayContent}</span>
      )}
    </span>
  );
};
