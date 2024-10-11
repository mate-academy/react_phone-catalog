import React from 'react';
import styles from './QuantityButton.module.scss';
import classNames from 'classnames';

type Props = {
  type: 'plus' | 'minus';
  disabled?: boolean;
  onClick?: () => void;
};

export const QuantityButton: React.FC<Props> = ({
  type,
  disabled,
  onClick = () => {},
}) => {
  const buttonClass = classNames(
    styles.quantityButton,
    styles[`quantityButton--${type}`],
    {
      [styles['quantityButton--disabled']]: disabled,
    },
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    ></button>
  );
};
