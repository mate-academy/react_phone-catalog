import React from 'react';
import './Button.scss';
import cn from 'classnames/bind';

type PropsButton = {
  name: string;
  className: string;
  disabled: boolean;
  handleOnClick: (name: string) => void;
};
const Button: React.FC<PropsButton> = ({
  name, className, disabled, handleOnClick,
}) => {
  return (
    <button
      type="button"
      className={cn('small-btn', `${className}`, { [`disabled__${className}`]: disabled })}
      name={name}
      aria-label="Mute volume"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;

        handleOnClick(target.name);
      }}

    />
  );
};

export default Button;
