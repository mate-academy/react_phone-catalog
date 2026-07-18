import React, { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import buttonStyles from './IconButton.module.scss';
import { IconSvg } from '../IconSvg';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconDataPath: string[];
  iconClassName?: string;
};

export const IconButton = memo(
  forwardRef<HTMLButtonElement, Props>(
    ({ iconDataPath, className, iconClassName, disabled, ...rest }, ref) => {
      return (
        <button
          ref={ref}
          className={classNames(className, buttonStyles.button, {
            [buttonStyles['button--disabled']]: disabled,
          })}
          aria-disabled={disabled}
          {...rest}
        >
          <IconSvg
            dataPath={iconDataPath}
            className={
              iconClassName ||
              classNames(buttonStyles.button__icon, {
                [buttonStyles['button__icon--disabled']]: disabled,
              })
            }
          />
        </button>
      );
    },
  ),
);

IconButton.displayName = 'IconButton';
