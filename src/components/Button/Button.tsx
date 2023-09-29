/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';
import './Button.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'arrow';
  arrowDirection?: 'top' | 'left';
};

export const Button: React.FC<Props> = ({
  className = '',
  variant: content,
  arrowDirection,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'Button',
        { [className]: className },
        { [`Button--${content}`]: content },
        { [`Button--arrow-${arrowDirection}`]: arrowDirection },
      )}
      {...props}
    />
  );
};
