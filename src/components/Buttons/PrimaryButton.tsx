import React from 'react';
import './Buttons.scss';

interface Props {
  text: string;
}

export const PrimaryButton: React.FC<Props> = ({ text }) => (
  <button type="button" className="Button Button__Primary">
    {text}
  </button>
);
