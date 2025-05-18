import React, { ButtonHTMLAttributes, memo } from 'react';
import textButtonStyles from './TextButton.module.scss';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'light' | 'dark';
};

export const TextButton: React.FC<Props> = memo(
  ({ theme = 'dark', className, children, disabled, ...rest }) => {
    return (
      <button
        className={classNames(className, textButtonStyles.textButton, {
          [textButtonStyles['textButton--dark']]: theme === 'dark',
          [textButtonStyles['textButton--light']]: theme === 'light',
          [textButtonStyles['textButton--disabled']]: disabled,
        })}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

TextButton.displayName = 'TextButton';
