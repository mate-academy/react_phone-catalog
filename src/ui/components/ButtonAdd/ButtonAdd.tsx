import React from 'react';
import clsx from 'clsx';
import { Button } from '../../base';

import './ButtonAdd.scss';

type Props = {
  isAdded: boolean;
  onClick: () => void;
  isLoading?: boolean;
};

export const ButtonAdd: React.FC<Props> = ({
  isAdded,
  onClick,
  isLoading = false,
}) => {
  return (
    <Button
      type="primary"
      className={clsx('button-add', isAdded && 'button-add--added')}
      isLoading={isLoading}
      onClickHandler={onClick}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};
