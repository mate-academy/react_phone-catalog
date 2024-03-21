import React, { memo, useMemo } from 'react';

import './SliderBtn.scss';

type Props = {
  direction: 'prev' | 'next';
  section: string;
};

export const SliderBtn: React.FC<Props> = memo(({ direction, section }) => {
  // prettier-ignore
  const [ariaLabel, side] = useMemo(() => direction === 'prev'
    ? ['Prev slide', 'left']
    : ['Next slide', 'right'],
  [direction]);

  return (
    <button
      className={`${section}__button--${direction} SliderBtn SliderBtn--${section}`}
      type="button"
      aria-label={ariaLabel}
    >
      <i className={`fas fa-chevron-${side}`} aria-hidden="true" />
    </button>
  );
});
