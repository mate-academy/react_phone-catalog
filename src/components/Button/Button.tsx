import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { imgSrcArrow } from '../../utils/imgSrcArrow';

type Buttonprops = {
  rotation?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const Button = ({
  rotation = 0,
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
      imgSrc = imgSrcArrow.disabled;
      break;
    case isHover:
      imgSrc = imgSrcArrow.hover;
      break;
    case isActive:
      imgSrc = imgSrcArrow.active;
      break;
    default:
      imgSrc = imgSrcArrow.default;
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
        className={styles.button__img}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </button>
  );
};
