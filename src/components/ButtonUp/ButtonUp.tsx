import React from 'react';
import './ButtonUp.scss';

type Props = {};

export const ButtonUp: React.FC<Props> = () => {
  const goUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button type="button" className="button-up" onClick={goUp}>
      <span className="button-up__text">Back to top</span>
      <div className="button-up__box" />
    </button>
  );
};
