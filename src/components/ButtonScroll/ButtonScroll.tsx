import React from 'react';
import './ButtonScroll.scss';

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
    <button className="arrow__button" onClick={clickFunc} disabled={disabled}>
      <img className="arrow__image" src={buttonText} alt="button" />
    </button>
  );
};
