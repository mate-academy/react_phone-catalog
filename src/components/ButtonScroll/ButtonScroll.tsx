import React from 'react';
import style from './ButtonScroll.module.scss';

type Props = {
  buttonText: string;
  clickFunc: () => void;
  disabled?: boolean;
};

export const ButtonScroll: React.FC<Props> = ({
  buttonText,
  clickFunc,
  disabled,
}) => {
  return (
    <button className={style.arrowBtn} onClick={clickFunc} disabled={disabled}>
      <img className={style.arrowImg} src={buttonText} alt="button" />
    </button>
  );
};
