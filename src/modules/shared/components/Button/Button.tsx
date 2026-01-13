import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'outline' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface BaseProps {
  to?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  children?: ReactNode;
  squareBtn?: boolean;
}

interface AsButtonProps extends BaseProps, ComponentPropsWithoutRef<'button'> {
  to?: never;
  isSelected?: boolean;
  isDisabled?: boolean;
}

interface AsLinkProps extends BaseProps, LinkProps {
  to: string;
  isSelected?: never;
  isDisabled?: never;
}

type Props = AsButtonProps | AsLinkProps;

export const Button: FC<Props> = ({
  className,
  variant = 'primary',
  size = 'small',
  children,
  startIcon,
  squareBtn = false,
  ...props
}) => {
  const isOnlyIcon = !!startIcon && !children;

  const buttonStyles = classNames(
    styles.button,
    {
      [styles[size as ButtonSize]]: size,
      [styles.primary]: variant === 'primary',
      [styles.outline]: variant === 'outline',
      [styles.danger]: variant === 'danger',
      [styles.text]: variant === 'text',
      [styles.squareBtn]: squareBtn,
      [styles.onlyIcon]: isOnlyIcon,
    },
    className,
  );

  const content = (
    <>
      {startIcon}
      {children}
    </>
  );

  if ('to' in props) {
    return (
      <Link className={buttonStyles} {...(props as AsLinkProps)}>
        {content}
      </Link>
    );
  }

  const { isSelected, isDisabled, ...rest } = props as AsButtonProps;

  return (
    <button
      disabled={isDisabled}
      className={classNames(buttonStyles, {
        [styles.selected]: isSelected,
      })}
      {...rest}
    >
      {content}
    </button>
  );
};
