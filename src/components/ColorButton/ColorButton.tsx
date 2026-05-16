import React from 'react';
import styles from './ColorButton.module.scss';
import '../../styles/App.scss';
import classNames from 'classnames';

type ColorButtonProps = {
  color: string;
  currentColor: string;
};

const ColorButton: React.FC<ColorButtonProps> = ({ color, currentColor }) => {
  return (
    <div
      className={classNames(styles['color-button'], {
        [styles['color-button--selected']]: color === currentColor,
      })}
    >
      <div
        className={classNames(
          styles['color-button__color'],
          styles[`color-button__color--${color}`],
        )}
      ></div>
    </div>
  );
};

export default ColorButton;
