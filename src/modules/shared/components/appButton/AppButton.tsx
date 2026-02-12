import React from 'react';
import styles from './AppButton.module.scss';

type AppButtonProps = {
  buttonName: string;
};

type Props = AppButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AppButton: React.FC<Props> = ({
  buttonName,
  className = '',
  children,
  ...args
}) => {
  const combinedClassName = `${styles.button} ${className}`.trim();

  return (
    <button className={combinedClassName} {...args}>
      {children ? children : <span>{buttonName}</span>}
    </button>
  );
};
