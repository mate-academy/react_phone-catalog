import React from 'react';
import style from './Specs.module.scss';
import cn from 'classnames';

type Props = {
  specs: {
    name: string;
    value: string;
  };
  modifier?: string;
};

export const Specs: React.FC<Props> = ({ specs, modifier }) => (
  <div className={style.specs}>
    <p
      className={cn(style.specs__name, {
        [style[`specs__name--${modifier}`]]: modifier,
      })}
    >
      {specs.name}
    </p>
    <p
      className={cn(style.specs__value, {
        [style[`specs__value--${modifier}`]]: modifier,
      })}
    >
      {specs.value}
    </p>
  </div>
);
