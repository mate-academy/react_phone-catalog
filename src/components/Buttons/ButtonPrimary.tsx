import React from 'react';
import './Buttons.scss';

type Props = {
  text: string;
};

export const ButtonPrimary: React.FC<Props> = ({ text }) => (
  <button type="button" className="Button Button__Primary">
    {text}
  </button>
);
