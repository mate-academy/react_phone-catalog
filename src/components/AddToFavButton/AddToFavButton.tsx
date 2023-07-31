import React, { useState } from 'react';
import cn from 'classnames';

import favIcon from '../../images/heart.svg';
import favIconSelected from '../../images/heart-selected.svg';

import './AddToFavButton.scss';

export const AddToFavButton: React.FC = () => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      className={cn('AddToFavButton', {
        selected,
      })}
      onClick={() => setSelected(!selected)}
    >
      <img src={selected ? favIconSelected : favIcon} alt="favIcon" />
    </button>
  );
};
