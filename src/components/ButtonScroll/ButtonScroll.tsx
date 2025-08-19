import React from 'react';
import './ButtonScroll.scss';

type Props = {
  buttonText: string;
  clickFunc: () => void;
};

export const ButtonScroll: React.FC<Props> = ({ buttonText, clickFunc }) => {
  return (
    <button className="arrow__button" onClick={clickFunc}>
      <img className="arrow__image" src={buttonText} alt="button" />
    </button>
  );
};
