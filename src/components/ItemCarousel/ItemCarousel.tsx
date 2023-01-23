import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Phone } from '../../types/Phone';
import { Item } from '../Item/Item';

import './ItemCarousel.scss';

type Props = {
  title: string,
  items: Phone[],
};

export const ItemCarousel: React.FC<Props> = ({
  title,
  items,
}) => {
  const [currPage, setCurrPage] = useState(0);
  const step = 272 * 4 + 17 * 4;

  const pageAmount = useMemo(() => (items
    ? Math.ceil(items.length / 4)
    : 0),
  [items]);

  const actionHandler = (mode: string) => {
    if (mode === 'next' && currPage < pageAmount - 1) {
      setCurrPage(curr => curr + 1);
    } else if (mode === 'prev' && currPage > 0) {
      setCurrPage(curr => curr - 1);
    }
  };

  return (
    <div className="itemCarousel">
      <div className="itemCarousel__header">
        <h2 className="itemCarousel__title">
          {title}
        </h2>

        <div className="itemCarousel__buttons">
          <button
            disabled={currPage === 0}
            aria-label="prev"
            className={classNames(
              'itemCarousel__button',
              'itemCarousel__button--reversed',
              { 'itemCarousel__button--disabled': currPage === 0 },
            )}
            type="button"
            onClick={() => actionHandler('prev')}
          />

          <button
            disabled={currPage === pageAmount - 1}
            aria-label="next"
            className={classNames(
              'itemCarousel__button',
              { 'itemCarousel__button--disabled': currPage === pageAmount - 1 },
            )}
            type="button"
            onClick={() => actionHandler('next')}
          />

        </div>
      </div>

      <div className="itemCarousel__body">
        <div
          className="itemCarousel__wrapper"
          style={{ transform: `translateX(${-currPage * step}px)` }}
        >
          {items?.map(phone => (
            <Item
              item={phone}
              key={phone.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
