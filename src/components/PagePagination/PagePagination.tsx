/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import './PagePagination.scss';

export type Props = { pages: number[] };

export const PagePagination: React.FC<Props> = ({ pages }) => {
  return (
    <div className="page-pagination">
      <button
        type="button"
        className="
          page-pagination__button
          page-pagination__arrow-button
          page-pagination__arrow-button--prew
        "
      />

      <div className="page-pagination__page-buttons">
        {pages.map(page => (
          <span
            key={page}
            className={cn(
              'page-pagination__button',
              'page-pagination__page-button',
              {
                'page-pagination__page-button--current': page === 2,
              },
            )}
          >
            {page}
          </span>

        ))}
      </div>

      <button
        type="button"
        className="
          page-pagination__button
          page-pagination__arrow-button
          page-pagination__arrow-button--next
        "
      />
    </div>
  );
};
