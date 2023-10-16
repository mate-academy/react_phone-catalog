import React from 'react';

import './ProductChar.scss';

type Props = {
  name: string,
  value: string,
};

export const ProductChar: React.FC<Props> = ({ name, value }) => {
  return (
    <div className="info info--margin">
      <span className="info__name">{name}</span>
      <span className="info__value">{value}</span>
    </div>
  );
};
