import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IconsSrcObj {
  default: string;
  hover: string;
  disabled?: string;
  active?: string;
}

type Buttonprops = {
  rotation?: number;
  iconsSrc: IconsSrcObj;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const Button = ({
  rotation = 0,
  iconsSrc,
  onClick,
  disabled = false,
  isActive = false,
}: Buttonprops) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  let imgSrc;

  switch (true) {
    case disabled:
      imgSrc = iconsSrc.disabled;
      break;
    case isHover:
      imgSrc = iconsSrc.hover;
      break;
    case isActive:
      imgSrc = iconsSrc.active;
      break;
    default:
      imgSrc = iconsSrc.default;
      break;
  }

  return (
    <button
      className={classNames(styles.button, {
        [styles.disabled]: disabled,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt="scroll to top"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </button>
  );
};
