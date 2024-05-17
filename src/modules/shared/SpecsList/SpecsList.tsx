import React from 'react';

type Props = {
  prop: [string, string | string[]];
};

export const SpecsList: React.FC<Props> = React.memo(({ prop }) => {
  if (prop[0] === 'screen' && typeof prop[1] === 'string') {
    return (
      <div className="spec-item">
        <span>{prop[0]}</span>
        <span>{prop[1].replace(`'`, `”`)}</span>
      </div>
    );
  }

  if (prop[0] === 'cell' && Array.isArray(prop[1])) {
    return (
      <div className="spec-item">
        <span>{prop[0]}</span>
        <span>{prop[1].join(', ')}</span>
      </div>
    );
  }

  if (prop[0] === 'ram') {
    return (
      <div className="spec-item">
        <span style={{ textTransform: 'uppercase' }}>{prop[0]}</span>
        <span>{prop[1]}</span>
      </div>
    );
  }

  return (
    <div className="spec-item">
      <span>{prop[0]}</span>
      <span>{prop[1]}</span>
    </div>
  );
});
