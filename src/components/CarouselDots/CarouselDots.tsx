// import React, { ReactElement } from 'react';
import cn from 'classnames';

import './CarouselDots.scss';

type Props = {
  items: { key: string }[],
  activeDot: number,
  renderItem?: (key: string, isDotActive: boolean) => JSX.Element,
};

export const CarouselDots: React.FC<Props> = ({
  items,
  activeDot,
  renderItem = (key: string, isDotActive: boolean) => {
    return (
      <div
        key={key}
        className={cn('dot', {
          'dot--active': isDotActive,
        })}
      />
    );
  },
}) => {
  console.info('render');// eslint-disable-line no-console

  return (
    <div className="dots">
      {items.map((item, indx) => {
        return renderItem(item.key as string, indx === activeDot);
      })}
    </div>
  );
};
