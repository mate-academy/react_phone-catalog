/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { makeColorDarker } from '../../utils/makeColorDarker';
import ArrowLeft from '../../assets/icons/ArrowLeftBold.svg';

type ButtonProps = {
  type: 'number' | 'arrow' | 'radio' | 'icon' | 'back' | 'primary';
  state?: 'selected' | 'disabled';
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  state,
  color,
  onClick,
  children,
}) => {
  const btnClass = classNames(styles.btn, styles[`btn__${type}`], {
    [styles[`btn__${type}--${state}`]]: state,
  });

  const darkerColor = color ? makeColorDarker(color, 15) : undefined;
  const style =
    type === 'radio' && color
      ? ({
          '--radio-color': color,
          '--radio-hover-color': darkerColor,
        } as React.CSSProperties)
      : {};

  return (
    <button className={btnClass} onClick={onClick} style={style}>
      {type === 'back' && (
        <img src={ArrowLeft} className={styles.arrowLeft} alt="Arrow Left" />
      )}
      {children}
    </button>
  );
};

export default Button;
