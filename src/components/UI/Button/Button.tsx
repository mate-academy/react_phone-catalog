import React from 'react';
import { ButtonImageName } from '../../../types/ButtonImageName';
import './button.scss';

type Props = {
  handleClick: () => void;
  style?: { [key: string]: string };
  disabled: boolean;
  imgName: ButtonImageName;
};

export const Button: React.FC<Props> = React.memo(({
  handleClick,
  style,
  disabled,
  imgName,
}) => {
  return (
    <button
      style={style}
      onClick={handleClick}
      type="button"
      className="button"
      disabled={disabled}
    >
      <img
        className="button__image"
        src={`./img/icons/${imgName}.svg`}
        alt={imgName}
      />
    </button>
  );
});
