import React, { ButtonHTMLAttributes, memo } from 'react';
import textButtonStyles from './TextButton.module.scss';
import classNames from 'classnames';

export const TextButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> =
  memo(({ className, children, disabled, ...rest }) => {
    return (
      <button
        className={classNames(className, textButtonStyles.textButton, {
          [textButtonStyles['textButton--disabled']]: disabled,
        })}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  });

TextButton.displayName = 'TextButton';
