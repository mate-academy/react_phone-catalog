import React from 'react';
import styles from './AppButton.module.scss';

type AppButtonProps = {
  src?: string;
  buttonName: string;
};

type Props = AppButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AppButton: React.FC<Props> = ({
  src,
  buttonName,
  className = '',
  ...args
}) => {
  const combinedClassName = `${styles.button} ${className}`.trim();

  return (
    <button className={combinedClassName} {...args}>
      {src ? (
        <img className={'icons'} src={src} alt={buttonName} />
      ) : (
        <span>{buttonName}</span>
      )}
    </button>
  );
};
