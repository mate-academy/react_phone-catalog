import React from 'react';

import styles from './IconButton.module.scss';
import classNames from 'classnames/bind';

interface Props {
  src: string;
  onClick: () => void;
  toggledSrc?: string;
  label?: string;
}

export const IconButton: React.FC<Props> = ({
  src,
  onClick,
  toggledSrc,
  label,
}) => {
  const cx = classNames.bind(styles);

  const [toggled, setToggled] = React.useState(false);

  const handleClick = () => {
    onClick?.();

    if (toggledSrc) {
      setToggled(prev => !prev);
    }
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={handleClick}
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
