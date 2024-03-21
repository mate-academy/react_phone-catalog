import React, { memo } from 'react';

import './Specification.scss';

type Props = {
  specification: [string, string | number];
};

export const Specification: React.FC<Props> = memo(({ specification }) => {
  const [key, value] = specification;

  return (
    <div className="Specification">
      <p className="Specification__name">{key}</p>

      <p className="Specification__value">{value}</p>
    </div>
  );
});
