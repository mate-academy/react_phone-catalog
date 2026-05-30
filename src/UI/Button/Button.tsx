/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { makeColorDarker } from '../../utils/makeColorDarker';
import ArrowLeft from '../../assets/icons/ArrowLeftBold.svg';

type Size = {
  width?: number;
  height: number;
};

interface CustomCSSProperties extends React.CSSProperties {
  '--btn-width': string;
  '--btn-height': string;
  '--radio-color'?: string;
  '--radio-hover-color'?: string;
}

type ButtonProps = {
  type: 'number' | 'radio' | 'icon' | 'back' | 'primary';
  size: Size;
  state?: 'selected' | 'disabled';
  color?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  state,
  size,
  color,
  onClick,
  children,
}) => {
  const btnClass = classNames(styles.btn, styles[`btn__${type}`], {
    [styles[`btn__${type}--${state}`]]: state,
  });

  const darkerColor = color ? makeColorDarker(color, 15) : undefined;
  const style: CustomCSSProperties = {
    '--btn-width': `${size.width}px`,
    '--btn-height': `${size.height}px`,
    ...(type === 'radio' && color
      ? {
          '--radio-color': color,
          '--radio-hover-color': darkerColor,
        }
      : {}),
  };

  return (
    <button className={btnClass} onClick={onClick} style={style}>
      {type === 'back' && (
        <img src={ArrowLeft} className={styles.arrowLeft} alt="Arrow Left" />
      )}
      {children}
    </button>
  );
};
