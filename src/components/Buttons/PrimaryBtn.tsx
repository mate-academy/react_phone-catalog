import React from 'react';
import cn from 'classnames';

export const PrimaryBtn = ({ title, styleSize }: PrimaryBtnProps) => {
  return (
    <button
      className={cn('button', styleSize)}
      type="button"
    >
      {title}
    </button>
  );
};
