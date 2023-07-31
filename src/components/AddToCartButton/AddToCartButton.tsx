import React, { useState } from 'react';
import cn from 'classnames';

import './AddToCartButton.scss';

export const AddToCartButton: React.FC = () => {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
        added,
      })}
      onClick={() => {
        setAdded(!added);
      }}
    >
      {added ? 'Selected' : 'Add to cart'}
    </button>
  );
};
