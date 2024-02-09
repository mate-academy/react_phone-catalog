import React, { memo } from 'react';
import { OptionsTogglerItemProps } from '../../OptionsToggler/OptionsToggler';

import './RectangleTextItem.scss';

type Props = OptionsTogglerItemProps;

export const RectangleTextItem: React.FC<Props> = memo(({ option, isSelected }) => {
  return (
    <div
      className={[
        'rectangle-text-item',
        isSelected ? 'rectangle-text-item--selected' : '',
      ].join(' ')}
    >
      {option}
    </div>
  );
});
