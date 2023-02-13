import React from 'react';
import './Error.scss';

type Props = {
  text: string,
};

export const Error: React.FC<Props> = ({ text }) => {
  return (
    <div className="error">
      <p className="text__body text__body--primary">
        {text}
      </p>
    </div>
  );
};
