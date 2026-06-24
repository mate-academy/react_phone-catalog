import { forwardRef, ReactNode } from 'react';
import secondaryButtonStyles from './SecondaryButton.module.scss';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
};

export const SecondaryButton = forwardRef<HTMLButtonElement, Props>(
  (
    { children, isDisabled = false, isSelected = false, onClick = () => {} },
    ref,
  ) => (
    <button
      ref={ref}
      className={classNames(
        'font-buttons',
        secondaryButtonStyles.secondaryButton,
        {
          [secondaryButtonStyles.secondaryButtonSelected]: isSelected,
        },
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  ),
);

SecondaryButton.displayName = 'SecondaryButton';
