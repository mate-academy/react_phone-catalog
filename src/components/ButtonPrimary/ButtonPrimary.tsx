import { CSSProperties } from 'react';

import styles from './ButtonPrimary.module.scss';
const { button, button__text } = styles;

type Props = {
  buttonText: string;
  action: () => void;
  disabled: boolean;
  additionalStyles?: CSSProperties;
};

export const ButtonPrimary = ({
  buttonText,
  action,
  disabled,
  additionalStyles,
}: Props) => {
  return (
    <button
      className={button}
      onClick={action}
      style={additionalStyles}
      disabled={disabled}
    >
      <span className={button__text} style={additionalStyles}>
        {buttonText}
      </span>
    </button>
  );
};
