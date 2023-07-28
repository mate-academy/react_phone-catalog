import React from 'react';
import './modelsCounter.scss';

export type Props = {
  number: number;
};

export const ModelsCounter:React.FC<Props> = ({ number = 0 }) => {
  return (
    <p className="models">
      {`${number} models`}
    </p>
  );
};
