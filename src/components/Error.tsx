import React from 'react';
import '../styles/components/Error.scss';

type Props = {
  text: string,
};

export const Error: React.FC<Props> = ({ text }) => {
  return (
    <div className="error">
      <p className="error__text">
        {text}
      </p>
    </div>
  );
};
