import React from 'react';
import clsx from 'clsx';
import Icons from '../../../assets/svg/sprite.svg';
import { IconsId } from '../../../types/IconsId';

import './Icons.scss';

type Props = {
  id: IconsId;
  width: number;
  height: number;
  className: string;
  counter?: number;
};

export const Icon: React.FC<Props> = ({
  id,
  className,
  width,
  height,
  counter,
}) => {
  return (
    <div className={clsx('icon', className)}>
      <svg width={width} height={height}>
        <use href={`${Icons}#icon-${id}`} />
      </svg>
      {counter && counter > 0 ? (
        <div className="icon-counter">{counter}</div>
      ) : null}
    </div>
  );
};
