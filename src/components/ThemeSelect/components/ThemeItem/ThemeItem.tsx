import React from 'react';
import classNames from 'classnames';
import styles from './ThemeItem.module.scss';

interface ThemeItemProps {
  variant: 'light' | 'dark';
  color: 'orange' | 'black' | 'blue' | 'purple' | 'dark';
}

const ThemeItem: React.FC<ThemeItemProps> = ({ variant, color }) => {
  return (
    <div
      className={classNames(
        styles['theme-item'],
        styles[`theme-item--${variant}`],
      )}
    >
      <div
        className={classNames(
          styles['theme-button'],
          styles[`theme-button--${color}`],
        )}
      />
      <div
        className={classNames(
          styles['theme-heart'],
          styles[`theme-heart--${color}`],
        )}
      />
    </div>
  );
};

export default ThemeItem;
