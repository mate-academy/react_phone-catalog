import React from 'react';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'selected';

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonAddToCart: React.FC<Props> = ({
  children,
  variant = 'primary',
  onClick = () => {},
  ...rest
}) => {
  return (
    <button
      className={classNames('button-add-to-cart', {
        'button-add-to-cart--selected': variant === 'selected',
      })}
      onClick={onClick}
      {...rest}
    >
      <p className="main-text main-text--white">{children}</p>
    </button>
  );
};
