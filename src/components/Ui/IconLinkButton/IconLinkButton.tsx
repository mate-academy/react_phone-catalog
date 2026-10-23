import React from 'react';

import styles from './IconLinkButton.module.scss';
import classNames from 'classnames/bind';

interface Props {
  src: string;
  onClick: () => void;
  toggled?: boolean;
  toggledSrc?: string;
  label?: string;
}
const cx = classNames.bind(styles);

export const IconLinkButton: React.FC<Props> = ({
  src,
  onClick,
  toggled = false,
  toggledSrc,
  label,
}) => {
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
