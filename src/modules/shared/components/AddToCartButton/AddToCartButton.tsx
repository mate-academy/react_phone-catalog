import { ComponentPropsWithoutRef, FC } from 'react';
import classNames from 'classnames';
import styles from './AddToCartButton.module.scss';

type Props = ComponentPropsWithoutRef<'button'> & {
  isSelected?: boolean;
};

export const AddToCartButton: FC<Props> = ({
  className,
  children = 'Add to cart',
  isSelected = false,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        {
          [styles.buttonSelected]: isSelected,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
