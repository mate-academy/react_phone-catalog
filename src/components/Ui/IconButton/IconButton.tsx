import React from 'react';

import styles from './IconButton.module.scss';
import classNames from 'classnames/bind';

interface Props {
  src: string;
  onClick: () => void;
  toggled?: boolean;
  toggledSrc?: string;
  label?: string;
}

export const IconButton: React.FC<Props> = ({
  src,
  onClick,
  toggled = false,
  toggledSrc,
  label,
}) => {
  const cx = classNames.bind(styles);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cx('icon-button')}
    >
      <img
        src={toggled && toggledSrc ? toggledSrc : src}
        alt=""
        className={cx('icon-button__icon')}
      />
    </button>
  );
};
