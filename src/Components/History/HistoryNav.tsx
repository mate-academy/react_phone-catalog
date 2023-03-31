import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  pages: string[],
};

export const History: FC<Props> = ({
  pages,
}) => (
  <div
    className="history history--current"
    data-cy="breadCrumbs"
  >
    <Link className="history__home" to="/" replace />
    {pages.map((pageName, index) => {
      const isLastPage = pages.length - 1 === index;

      return (
        <>
          <span className="history__arrow history__arrow--next" />
          <p
            className={classNames(
              'history__page',
              { 'history__page--last': isLastPage },
            )}
          >
            {pageName}
          </p>
        </>
      );
    })}
  </div>
);
