import React from 'react';
import './TextSmall.scss';

type TextSmallProps = {
  text: string;
};

export const TextSmall: React.FC<TextSmallProps> = ({ text }) => {
  return (
    <div className="text-small">
      <p>{text}</p>
    </div>
  );
};
