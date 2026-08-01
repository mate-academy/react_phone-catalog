import React from 'react';
import styles from './PrimaryButton.module.scss';
import classNames from 'classnames';

type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  cardPage?: boolean;
};

export const PrimaryButton = ({
  text,
  cardPage = false,
  disabled,
  ...rest
}: PrimaryButtonProps) => {
  return (
    <button
      className={classNames(styles.primaryButton, {
        [styles['primaryButton--selected']]: disabled,
        [styles['primaryButton--cardPage']]: cardPage,
      })}
      {...rest}
    >
      {text}
    </button>
  );
};
