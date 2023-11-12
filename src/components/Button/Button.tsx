/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';
import './Button.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'arrow' | 'cart' | 'favourite' | 'number';
  arrowDirection?: 'top' | 'left';
  card?: 'added';
  favourite?: 'added';
};

export const Button: React.FC<Props> = ({
  className = '',
  variant: content,
  arrowDirection,
  card,
  favourite,
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
        { [`Button--cart-${card}`]: card },
        { [`Button--favourite-${favourite}`]: favourite },
      )}
      {...props}
    />
  );
};
