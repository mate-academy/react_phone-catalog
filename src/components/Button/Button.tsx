import { CSSProperties } from 'react';

import styles from './Button.module.scss';
const { button, button__img, button__disabled } = styles;

type Props = {
  action: () => void;
  disabled: boolean;
  additionalStyles?: CSSProperties;
  bgImg?: string;
  pageNumber?: number | string;
};

export const Button = ({
  bgImg,
  action,
  disabled,
  additionalStyles,
  pageNumber,
}: Props) => {
  return (
    <button
      className={`${button} ${disabled && button__disabled}`}
      onClick={action}
      style={additionalStyles}
      disabled={disabled}
    >
      {bgImg && <img src={bgImg} alt="button icon" className={button__img} />}
      {pageNumber && <span className={button__img}>{pageNumber}</span>}
    </button>
  );
};
