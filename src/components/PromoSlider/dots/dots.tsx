
import React from 'react';

import './dots.scss';

export const Dots = ({count, active}:{count:number; active:number}) => {
  let dots = new Array(count).fill(0);
  return (
    <div>
      {dots.map((_, index) => (
        <span
        className = {(active === index + 1)
          ? "dots__dot dots__dot--active"
          : "dots__dot"}
        >

        </span>
      ))}
    </div>
  )
}
