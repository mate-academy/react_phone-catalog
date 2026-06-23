import React from 'react';
import style from './OutlineBottom.module.scss';
import cn from 'classnames';

type Props = { modifier?: string };

export const OutlineBottom: React.FC<Props> = ({ modifier }) => (
  <p
    className={cn(style.outline, {
      [style[`outline--${modifier}`]]: modifier,
    })}
  ></p>
);
