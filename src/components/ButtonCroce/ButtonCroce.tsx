import React from 'react';
import './ButtonCroce.scss';

type Props = {
  handleClick: (id: string) => void;
  id: string;
};

export const ButtonCroce: React.FC<Props> = ({ handleClick, id }) => {
  return (
    // eslint-disable-next-line
    <button
      type="button"
      className="button-croce"
      onClick={() => handleClick(id)}
      data-cy="cartDeleteButton"
    />
  );
};
