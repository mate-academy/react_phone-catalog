import React from 'react';

import './ButtonAdd.scss';
import clsx from 'clsx';

type Props = {
  isAdded: boolean;
  onClick: () => void;
};

export const ButtonAdd: React.FC<Props> = ({ isAdded, onClick }) => {
  return (
    <button
      type="button"
      className={clsx('button-add', isAdded && 'button-add--added')}
      onClick={onClick}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
