import React from 'react';
import '../Paginations/Paginations.scss';

type Props = {
  onChange: () => void;
  text: string;
};

export const PaginationsButton: React.FC<Props> = ({ onChange, text }) => {
  return (
    <button
      type="button"
      className="paginations__button"
      onClick={onChange}
    >
      {text}
    </button>
  );
};
