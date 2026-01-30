import React from 'react';
import cn from 'classnames';
import { capitalizePhase } from '@mocks/Functions/functions';

interface Props {
  rawTitle: string;
  amountOfitems?: number;
  additionalClass?: string;
}

export const ComponentTitle: React.FC<Props> = ({
  rawTitle,
  amountOfitems = '',
  additionalClass = '',
}) => {
  const title =
    rawTitle === 'phones' ? 'Mobile phones' : capitalizePhase(rawTitle);

  return (
    <div className={cn('top', additionalClass)}>
      <h1 className="top__title">{title}</h1>
      {amountOfitems !== '' && (
        <h4 className="top__amount">{amountOfitems} items</h4>
      )}
    </div>
  );
};
