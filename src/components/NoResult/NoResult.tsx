import React from 'react';
import './NoResult.scss';

type Props = {
  message: string,
};

export const NoResult: React.FC<Props> = ({ message }) => (
  <div className="no-result">
    <p className="no-result__message">
      {message}
    </p>
  </div>
);
