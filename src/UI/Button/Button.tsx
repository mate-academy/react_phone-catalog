/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import classNames from 'classnames';
import './Button.scss';
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
  const btnClass = classNames('btn', `btn__${type}`, {
    [`btn__${type}--${state}`]: state,
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
        <img src={ArrowLeft} className="arrowLeft" alt="Arrow Left" />
      )}
      {children}
    </button>
  );
};

export default Button;
